import {
  getAll,
  getById,
  createResource,
  patchResource,
  updateResource,
  callLogicApp,
} from "@/utils/apiHelpers";
import { stringToBase64, base64ToString } from "@/utils/fileProcess";
import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";
import { Context } from "../types";

export async function getAppointmentsByPractitionerId(
  context: Context,
  { practitionerId, dateFrom, dateTo }: any
) {
  context.commit("setIsLoading", {
    action: "getAppointmentsByPractitionerId",
    value: true,
  });
  context.commit("setAppointments", []);
  let actorId = "";
  if (!practitionerId) {
    await context.dispatch("$_account/getCurrentUser", null, { root: true });
    actorId = context.rootState.$_account.practitionerRole.id;
  } else {
    actorId = practitionerId;
  }

  const appointments: any = await getAppointments(context, {
    actorId,
    dateFrom,
    dateTo,
  });
  context.commit("setAppointments", appointments);

  context.commit("setIsLoading", {
    action: "getAppointmentsByPractitionerId",
    value: false,
  });
}

export const getAppointments = async (
  context: Context,
  { actorId, dateFrom, dateTo }: any
) => {
  context.commit("setIsLoading", { action: "getAppointments", value: true });

  const searchParams = [
    "include_patient=true",
    "include_practitioner=true",
    `actor_id=${actorId}`,
    "count=900", // Hardcode one, assuming it should be enough
  ];

  if (dateFrom !== undefined) {
    searchParams.push(`start_date=${dateFrom}`);
  } else {
    // default to some hardcoded date
    const date = new Date();
    date.setDate(date.getDate() - 30);
    searchParams.push(`start_date=${date.toISOString()}`);
  }

  if (dateTo !== undefined) {
    searchParams.push(`end_date=${dateTo}`);
  }

  const appointmentsList: any = await getAll(
    `appointments?${searchParams.join("&")}`
  );

  const appointments = appointmentsList.data.filter(
    (appt: any) => appt.resourceType === "Appointment"
  );

  const patients = appointmentsList.data.filter(
    (appt: any) => appt.resourceType === "Patient"
  );

  const practitionerRoles = appointmentsList.data.filter(
    (appt: any) => appt.resourceType === "PractitionerRole"
  );

  const practitioners = appointmentsList.data.filter(
    (appt: any) => appt.resourceType === "Practitioner"
  );

  appointments.map((appt: any) => {
    const practitionerRoleId = appt.participant
      .find((item: any) => item.actor.reference.includes("PractitionerRole"))
      .actor.reference.split("/")[1];

    const practitionerId = practitionerRoles
      .find((role: any) => role.id === practitionerRoleId)
      .practitioner.reference.split("/")[1];

    const patientId = appt.participant
      .find((item: any) => item.actor.reference.includes("Patient"))
      .actor.reference.split("/")[1];

    appt.practitioner = practitioners.find(
      (practitioner: any) => practitioner.id === practitionerId
    );

    appt.patient = patients.find((patient: any) => patient.id === patientId);
  });

  context.commit("setIsLoading", {
    action: "getAppointments",
    value: false,
  });
  return appointments;
};

export async function getAppointmentById(
  context: Context,
  appointmentId: string
) {
  context.commit("setIsLoading", { action: "getAppointmentById", value: true });
  context.commit("setAppointment", undefined);
  const appointment: any = await getById({
    resource: "appointments",
    resourceId: appointmentId,
  });
  context.commit("setAppointment", appointment.data);
  context.commit("setIsLoading", {
    action: "getAppointmentById",
    value: false,
  });
}

export async function populateAppointment(
  context: Context,
  appointmentId: string
) {
  context.commit("setIsLoading", {
    action: "populateAppointment",
    value: true,
  });
  await getAppointmentById(context, appointmentId);
  const appointment = context.state.appointment;
  const patientId = appointment.participant
    .find((item: any) => item.actor.reference.includes("Patient"))
    .actor.reference.split("/")[1];
  const practitionerRoleId = appointment.participant
    .find((item: any) => item.actor.reference.includes("PractitionerRole"))
    .actor.reference.split("/")[1];

  await context.dispatch("$_patients/populatePatient", patientId, {
    root: true,
  });

  await context.dispatch(
    "$_practitioners/getPractitionerRoleById",
    practitionerRoleId,
    {
      root: true,
    }
  );

  const practitionerId =
    context.rootState.$_practitioners.practitionerRole.practitioner.reference.split(
      "/"
    )[1];
  await context.dispatch(
    "$_practitioners/getPractitionerById",
    practitionerId,
    {
      root: true,
    }
  );

  await getEncounter(context, appointment);

  context.commit("setIsLoading", {
    action: "populateAppointment",
    value: false,
  });
}

export async function createAppointment(context: Context, payload: any) {
  context.commit("setIsLoading", {
    action: "createAppointment",
    value: true,
  });

  const resource = `appointments`;

  try {
    const appointment: any = await createResource({ resource, payload });
    context.commit("setIsLoading", {
      action: "createAppointment",
      value: false,
    });
    return appointment.data;
  } catch (e) {
    context.commit("setIsLoading", {
      action: "createAppointment",
      value: false,
    });
    console.error(e);
  }
}

export async function updateAppointment(
  context: Context,
  { appointmentId, status }: any
) {
  context.commit("setIsLoading", {
    action: "updateAppointment",
    value: true,
  });
  context.commit("setAppointment", undefined);

  const resource = `appointments/${appointmentId}/status`;
  const payload = {
    status,
  };

  try {
    const appointment: any = await updateResource({ url: resource, payload });
    context.commit("setAppointment", appointment.data);
  } catch (e) {
    console.error(e);
    context.commit("setAppointment", undefined);
  }
  context.commit("setIsLoading", {
    action: "updateAppointment",
    value: false,
  });
}

export async function createEncounter(context: Context, appointment: any) {
  context.commit("setIsLoading", {
    action: "createEncounter",
    value: true,
  });
  context.commit("setEncounter", undefined);
  const payload = {
    appointment_id: appointment.id,
    patient_id: appointment.patient,
    role_id: appointment.practitionerRole,
  };
  const resource = `patients/${appointment.patient}/encounters`;
  try {
    const encounter: any = await createResource({ resource, payload });
    context.commit(
      "setEncounter",
      encounter.data.data.find((item: any) => item.resourceType === "Encounter")
    );
    context.commit("setAppointmentStatus", "fulfilled");
  } catch (e) {
    console.error(e);
    context.commit("setEncounter", undefined);
  }
  context.commit("setIsLoading", {
    action: "createEncounter",
    value: false,
  });
}

export async function getEncounter(context: Context, appointment: any) {
  context.commit("setIsLoading", {
    action: "getEncounter",
    value: true,
  });
  context.commit("setEncounter", undefined);
  const patientId = appointment.participant
    .find((item: any) => item.actor.reference.includes("Patient"))
    .actor.reference.split("/")[1];

  const encounterList: any = await getAll(
    `patients/${patientId}/encounters?appointment_id=${appointment.id}`
  );

  const encounter = encounterList.data.filter(
    (item: any) => item.resourceType === "Encounter"
  )[0];
  const diagnosticReports = encounterList.data.filter(
    (item: any) => item.resourceType === "DiagnosticReport"
  );

  await getClinicalNote(context, { appointment, encounter });

  context.commit("setEncounter", encounter);
  context.commit("setDiagnosticReports", diagnosticReports);

  context.commit("setIsLoading", {
    action: "getEncounter",
    value: false,
  });
}

export async function updateEncounter(
  context: Context,
  { appointment, encounter, status, payload }: any
) {
  context.commit("setIsLoading", {
    action: "updateEncounter",
    value: true,
  });
  context.commit("setEncounter", undefined);

  const resource = `patients/${appointment.patient}/encounters/${encounter.id}?status=${status}`;

  try {
    const encounter: any = await patchResource({ url: resource });
    context.commit("setEncounter", encounter.data);

    if (status === "finished") {
      await callLogicApp(payload, process.env.VUE_APP_logic_app_url_sheet);
    }
  } catch (e) {
    console.error(e);
    context.commit("setEncounter", undefined);
  }
  context.commit("setIsLoading", {
    action: "updateEncounter",
    value: false,
  });
}

export async function createDiagnosticReport(
  context: Context,
  { appointment, encounter, note }: any
) {
  context.commit("setIsLoading", {
    action: "createDiagnosticReport",
    value: true,
  });
  context.commit("setDiagnosticReports", undefined);
  const payload = {
    patient_id: appointment.patient,
    role_id: appointment.practitionerRole,
    encounter_id: encounter.id,
    conclusion: note,
  };
  const resource = `diagnostic_reports`;
  try {
    const diagnosticReport: any = await createResource({ resource, payload });
    context.commit("setDiagnosticReports", [diagnosticReport.data]);
  } catch (e) {
    console.error(e);
    context.commit("setDiagnosticReports", undefined);
  }
  context.commit("setIsLoading", {
    action: "createDiagnosticReport",
    value: false,
  });
}

export async function createClinicalNote(
  context: Context,
  { appointment, encounter, note }: any
) {
  context.commit("setIsLoading", {
    action: "createClinicalNote",
    value: true,
  });

  const convertedNote = await stringToBase64(note);
  const payload = {
    subject: `Patient/${appointment.patient}`,
    document_type: "clinical_note",
    encounter_id: encounter.id,
    pages: [
      {
        data: convertedNote,
        title: "page1",
      },
    ],
  };
  const resource = `document_references`;
  try {
    const documentReference: any = await createResource({ resource, payload });

    const clinicalNote = {
      note: base64ToString(documentReference.data.content[0].attachment.data),

      createdOn: formatDateString(
        documentReference.data.date,
        TimeConstants.monthDayYearTime
      ),
    };

    context.commit("setClinicalNote", clinicalNote);
  } catch (e) {
    console.error(e);
    context.commit("setClinicalNote", undefined);
  }

  context.commit("setIsLoading", {
    action: "createClinicalNote",
    value: false,
  });
}

export async function getClinicalNote(
  context: Context,
  { appointment, encounter }: any
) {
  context.commit("setIsLoading", {
    action: "getClinicalNote",
    value: true,
  });

  let documentReferences = context.rootState.$_patients.documentReferences;

  if (!documentReferences.length) {
    await context.dispatch("$_patients/getDocumentReferences", null, {
      root: true,
    });
    documentReferences = context.rootState.$_patients.documentReferences;
  }

  if (!encounter) {
    context.commit("setIsLoading", {
      action: "getClinicalNote",
      value: false,
    });
    context.commit("setClinicalNote", undefined);
    return;
  }

  const appointmentClinicalNote = documentReferences.find((document: any) => {
    if (document.context) {
      if (
        document.context.encounter[0].reference.split("/")[1] ===
          encounter.id &&
        document.category[0].coding[0].code === "clinical-note"
      ) {
        return document;
      }
    }
  });

  if (!appointmentClinicalNote) {
    context.commit("setIsLoading", {
      action: "getClinicalNote",
      value: false,
    });
    context.commit("setClinicalNote", undefined);
    return;
  }

  const clinicalNote = {
    note: base64ToString(appointmentClinicalNote.content[0].attachment.data),

    createdOn: formatDateString(
      appointmentClinicalNote.date,
      TimeConstants.monthDayYearTime
    ),
  };

  context.commit("setClinicalNote", clinicalNote);

  context.commit("setIsLoading", {
    action: "getClinicalNote",
    value: false,
  });
}

export async function getSlotsByPractitionerRoleId(
  context: Context,
  { start, end, practitionerId }: any
) {
  context.commit("setIsLoading", {
    action: "getSlotsByPractitionerRoleId",
    value: true,
  });

  context.commit("setSlots", []);
  let actorId = "";
  if (!practitionerId) {
    await context.dispatch("$_account/getCurrentUser", null, { root: true });
    actorId = context.rootState.$_account.practitionerRole.id;
  } else {
    actorId = practitionerId;
  }

  try {
    const responseSlots: any = await getAll(
      `practitioner_roles/${actorId}/slots?not_status=free&start=${start}&end=${end}`
    );
    context.commit("setSlots", responseSlots.data);
  } catch (error) {
    console.error(error);
    context.commit("setSlots", []);
  }

  context.commit("setIsLoading", {
    action: "getSlotsByPractitionerRoleId",
    value: false,
  });
}

export async function createSlot(
  context: Context,
  { practitionerId, start, end }: any
) {
  context.commit("setIsLoading", {
    action: "createSlot",
    value: true,
  });
  const slot = {
    start,
    end,
    status: "busy-unavailable",
    comment: "Blocked",
  };

  let actorId = "";
  if (!practitionerId) {
    await context.dispatch("$_account/getCurrentUser", null, { root: true });
    actorId = context.rootState.$_account.practitionerRole.id;
  } else {
    actorId = practitionerId;
  }

  const respSlot = await createResource({
    resource: `practitioner_roles/${actorId}/slots`,
    payload: slot,
  });

  context.commit("setIsLoading", {
    action: "createSlot",
    value: false,
  });

  return respSlot;
}

export async function freeSlot(context: Context, { slotId }: any) {
  context.commit("setIsLoading", {
    action: "freeSlot",
    value: true,
  });
  const resp = await updateResource({
    url: `slots/${slotId}/free`,
    payload: {},
  });

  context.commit("setIsLoading", {
    action: "freeSlot",
    value: false,
  });
  return resp;
}
