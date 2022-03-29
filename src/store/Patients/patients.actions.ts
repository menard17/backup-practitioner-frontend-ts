import { auth } from "@/plugins/firebase";
import { getAll, getById } from "@/utils/apiHelpers";

export const getPatients = async ({ commit }: any) => {
  commit("setIsLoading", { action: "getPatients", value: true });
  commit("setPatients", []);
  if (!auth.currentUser) {
    return;
  }

  // TODO: Fixed list of appointments dynamically. Hard-coding to get appointment from Feb-1
  const patients: any = await getAll(`patients`);
  commit("setPatients", patients.data.entry);
  commit("setIsLoading", { action: "getPatients", value: false });
};

export async function getPatientById({ commit }: any, patientId: string) {
  commit("setIsLoading", { action: "getPatientById", value: true });
  commit("setPatient", undefined);
  const patient: any = await getById({
    resource: "patients",
    resourceId: patientId,
  });
  commit("setPatient", patient.data);
  commit("setIsLoading", { action: "getPatientById", value: false });
}

export async function getAppointments(context: any, patientId: string) {
  context.commit("setIsLoading", { action: "getAppointments", value: true });
  context.commit("setAppointments", []);
  const appointments = await context.dispatch(
    "$_appointments/getAppointments",
    { actorId: patientId },
    { root: true }
  );
  context.commit("setAppointments", appointments.data);
  context.commit("setIsLoading", { action: "getAppointments", value: false });
}
