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
  const appointment = await getById({
    resource: "appointments",
    resourceId: appointmentId,
  });
  commit("setAppointment", appointment);
  commit("setIsLoading", { action: "getAppointmentById", value: false });
}
