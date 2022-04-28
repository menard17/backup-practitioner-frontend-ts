import {
  getAll,
  getById,
  createResource,
  patchResource,
  updateResource,
} from "@/utils/apiHelpers";

export async function getAppointmentsByPractitionerId(
  context: any,
  { practitionerId }: any
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

  const appointments: any = await getAppointments(context, { actorId });
  context.commit("setAppointments", appointments);

  context.commit("setIsLoading", {
    action: "getAppointmentsByPractitionerId",
    value: false,
  });
}

export const getAppointments = async (context: any, { actorId }: any) => {
  context.commit("setIsLoading", { action: "getAppointments", value: true });

  // TODO: Fixed list of appointments dynamically. Hard-coding to get appointment from Feb-1
  const appointmentsList: any = await getAll(
    `appointments?include_patient=true&include_practitioner=true&date=2022-02-01&actor_id=${actorId}`
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
  { commit }: any,
  appointmentId: string
) {
  commit("setIsLoading", { action: "getAppointmentById", value: true });
  commit("setAppointment", undefined);
  const appointment: any = await getById({
    resource: "appointments",
    resourceId: appointmentId,
  });
  commit("setAppointment", appointment.data);
  commit("setIsLoading", { action: "getAppointmentById", value: false });
}

export async function populateAppointment(context: any, appointmentId: string) {
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

export async function createAppointment(context: any, payload: any) {
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

export async function createEncounter(context: any, appointment: any) {
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
  } catch (e) {
    console.error(e);
    context.commit("setEncounter", undefined);
  }
  context.commit("setIsLoading", {
    action: "createEncounter",
    value: false,
  });
}

export async function getEncounter(context: any, appointment: any) {
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

  context.commit("setEncounter", encounter);
  context.commit("setDiagnosticReports", diagnosticReports);

  context.commit("setIsLoading", {
    action: "getEncounter",
    value: false,
  });
}

export async function updateEncounter(
  context: any,
  { appointment, encounter, status }: any
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
  context: any,
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

export async function getSlotsByPractitionerRoleId(
  context: any,
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
  context: any,
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

export async function freeSlot({ commit }: any, { slotId }: any) {
  commit("setIsLoading", {
    action: "freeSlot",
    value: true,
  });
  const resp = await updateResource({
    url: `slots/${slotId}/free`,
    payload: {},
  });

  commit("setIsLoading", {
    action: "freeSlot",
    value: false,
  });
  return resp;
}
