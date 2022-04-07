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

export async function populatePatient(context: any, patientId: string) {
  context.commit("setIsLoading", { action: "populatePatient", value: true });
  await getPatientById(context, patientId);
  await getAppointments(context, patientId);
  await getDocumentReferences(context, patientId);

  console.log(context.state.patient);

  if (!context.state.patient.extension) {
    context.commit("setIsLoading", { action: "populatePatient", value: false });
    return;
  }

  const customerId = context.state.patient.extension.find(
    (ext: any) => ext.url === "stripe-customer-id"
  ).valueString;

  await getPaymentMethods(context, customerId);
  await getPaymentIntents(context, customerId);

  context.commit("setIsLoading", { action: "populatePatient", value: false });
}

export async function getDocumentReferences(context: any, patientId: string) {
  context.commit("setIsLoading", {
    action: "getDocumentReferences",
    value: true,
  });
  const documentReferences: any = await getAll(
    `document_references?subject=Patient/${patientId}`
  );

  context.commit("setDocumentReferences", documentReferences.data);
  context.commit("setIsLoading", {
    action: "getDocumentReferences",
    value: false,
  });
}

export async function getAppointments(context: any, patientId: string) {
  context.commit("setIsLoading", { action: "getAppointments", value: true });
  context.commit("setAppointments", []);
  const appointments = await context.dispatch(
    "$_appointments/getAppointments",
    { actorId: patientId },
    { root: true }
  );
  context.commit("setAppointments", appointments);
  context.commit("setIsLoading", { action: "getAppointments", value: false });
}

export async function getPaymentMethods(context: any, customerId: string) {
  console.log(context.state);
  context.commit("setIsLoading", { action: "getPaymentMethods", value: true });
  context.commit("setPaymentMethods", []);

  const paymentMethods = await context.dispatch(
    "$_payments/getPaymentMethods",
    { customerId },
    { root: true }
  );

  context.commit("setPaymentMethods", paymentMethods);
  context.commit("setIsLoading", { action: "getPaymentMethods", value: false });
}

export async function getPaymentIntents(context: any, customerId: string) {
  console.log(context.state);
  context.commit("setIsLoading", { action: "getPaymentIntents", value: true });
  context.commit("setPaymentIntents", []);

  const paymentIntents = await context.dispatch(
    "$_payments/getPaymentIntents",
    { customerId },
    { root: true }
  );

  console.log("PMI:", paymentIntents);
  context.commit("setPaymentIntents", paymentIntents);
  context.commit("setIsLoading", { action: "getPaymentIntents", value: false });
}
