import { Context } from "@/store/types";
import { getAll } from "@/utils/apiHelpers";
import { Appointment } from "@/store/AppointmentHistory/types";

export async function getAppointmentsByPatientId(
  context: Context,
  { patientId }: any
) {
  context.commit("setIsLoading", {
    action: "getAppointmentsByPatientId",
    value: true,
  });
  context.commit("setAppointments", []);

  const appointments = await context.dispatch(
    "$_appointments/getAppointments",
    { actorId: patientId },
    { root: true }
  );

  appointments.sort((a: Appointment, z: Appointment) => {
    return new Date(a.start).valueOf() - new Date(z.start).valueOf();
  });

  context.commit("setAppointments", appointments);

  context.commit("setIsLoading", {
    action: "getAppointmentsByPatientId",
    value: false,
  });
}

export async function getEncountersByPatientId(
  context: Context,
  { patientId }: any
) {
  context.commit("setIsLoading", {
    action: "getEncountersByPatientId",
    value: true,
  });
  context.commit("setEncounters", []);

  const encounters: any = await getAll(`patients/${patientId}/encounters`);

  context.commit("setEncounters", encounters.data);
  context.commit("setIsLoading", {
    action: "getEncountersByPatientId",
    value: false,
  });
}

export async function getMedicationsByPatientId(
  context: Context,
  { patientId }: any
) {
  context.commit("setIsLoading", {
    action: "getMedicationsByPatientId",
    value: true,
  });
  if (!patientId) {
    context.commit("setIsLoading", {
      action: "getMedicationsByPatientId",
      value: false,
    });
    context.commit("setMedications", []);
    return;
  }

  try {
    const medications: any = await getAll(
      `medication_requests?patient_id=${patientId}`
    );

    context.commit("setMedications", medications.data);
  } catch (error) {
    console.error(error);
    context.commit("setMedications", []);
  }

  context.commit("setIsLoading", {
    action: "getMedicationsByPatientId",
    value: false,
  });
}

export async function getTestsByPatientId(
  context: Context,
  { patientId }: any
) {
  context.commit("setIsLoading", {
    action: "getTestsByPatientId",
    value: true,
  });

  if (!patientId) {
    context.commit("setIsLoading", {
      action: "getTestsByPatientId",
      value: false,
    });
    context.commit("setTests", []);
    return;
  }

  try {
    const service_requests: any = await getAll(
      `service_requests?patient_id=${patientId}`
    );

    context.commit("setTests", service_requests.data);
  } catch (error) {
    console.error(error);
    context.commit("setTests", []);
  }

  context.commit("setIsLoading", {
    action: "getTestsByPatientId",
    value: false,
  });
}
