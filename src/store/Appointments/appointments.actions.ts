import { getAll, getById, getEmail } from "@/utils/apiHelpers";

export async function getAppointmentsByPractitionerId(context: any) {
  context.commit("setAppointments", []);
  await context.dispatch("$_account/getCurrentUser", null, { root: true });
  console.log(context.rootState.$_account.practitionerRole);
  const actorId = context.rootState.$_account.practitionerRole.id;
  const appointments: any = await getAppointments(context, { actorId });
  context.commit("setAppointments", appointments.data);
}

export const getAppointments = async (context: any, { actorId }: any) => {
  context.commit("setIsLoading", { action: "getAppointments", value: true });

  // TODO: Fixed list of appointments dynamically. Hard-coding to get appointment from Feb-1
  const appointments: any = await getAll(
    `appointments?date=2022-02-01&actor_id=${actorId}`
  );
  console.log(appointments);

  context.commit("setIsLoading", { action: "getAppointments", value: false });
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

  await context.dispatch("$_patients/getPatientById", patientId, {
    root: true,
  });

  context.commit("setIsLoading", {
    action: "populateAppointment",
    value: false,
  });
}
