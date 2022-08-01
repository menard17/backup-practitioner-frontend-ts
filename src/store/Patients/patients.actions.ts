import { auth } from "@/plugins/firebase";
import { getAll, getById, updateResource } from "@/utils/apiHelpers";
import { Context } from "../types";

export const getPatients = async (context: Context, fhirLink: string) => {
  context.commit("setIsLoading", { action: "getPatients", value: true });
  context.commit("setPatients", []);
  if (!auth.currentUser) {
    return;
  }

  let params = `count=${context.state.pagination.pageSize}`;
  if (fhirLink !== undefined) {
    params += `&next_link=${encodeURIComponent(fhirLink)}`;
  }
  const patients: any = await getAll(`patients?${params}`);

  // setting up pagination
  const links = patients.data.link;
  const nextLink = links.find((link: { relation: string }) => {
    return link.relation === "next";
  });
  context.state.pagination.nextLinkUrl =
    nextLink !== undefined ? nextLink.url : undefined;

  // set the disable of the button
  context.state.pagination.isNextDisabled =
    context.state.pagination.nextLinkUrl === undefined;
  context.state.pagination.isPrevDisabled =
    context.state.pagination.urlStack.length == 0;

  context.commit("setPagination", context.state.pagination);
  context.commit("setPatients", patients.data.entry);
  context.commit("setIsLoading", { action: "getPatients", value: false });
};

export async function getPatientById(context: Context, patientId: string) {
  context.commit("setIsLoading", { action: "getPatientById", value: true });
  context.commit("setPatient", undefined);
  const patient: any = await getById({
    resource: "patients",
    resourceId: patientId,
  });
  context.commit("setPatient", patient.data);
  context.commit("setIsLoading", { action: "getPatientById", value: false });
}

export async function populatePatient(context: Context, patientId: string) {
  context.commit("setIsLoading", { action: "populatePatient", value: true });
  await getPatientById(context, patientId);
  await getAppointments(context, patientId);
  await getDocumentReferences(context, patientId);

  if (!context.state.patient.extension) {
    context.commit("setIsLoading", { action: "populatePatient", value: false });
    return;
  }

  const customer = context.state.patient.extension.find(
    (ext: any) => ext.url === "stripe-customer-id"
  );
  if (customer) {
    const customerId = customer.valueString;
    await getPaymentMethods(context, customerId);
    await getPaymentIntents(context, customerId);
  }

  context.commit("setIsLoading", { action: "populatePatient", value: false });
}

export async function getDocumentReferences(
  context: Context,
  patientId: string
) {
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

export async function getAppointments(context: Context, patientId: string) {
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

export async function getPaymentMethods(context: Context, customerId: string) {
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

export async function getPaymentIntents(context: Context, customerId: string) {
  context.commit("setIsLoading", { action: "getPaymentIntents", value: true });
  context.commit("setPaymentIntents", []);

  const paymentIntents = await context.dispatch(
    "$_payments/getPaymentIntents",
    { customerId },
    { root: true }
  );

  context.commit("setPaymentIntents", paymentIntents);
  context.commit("setIsLoading", { action: "getPaymentIntents", value: false });
}

export async function updatePatient(
  context: Context,
  { patientId, payload }: any
) {
  context.commit("setIsLoading", { action: "updatePatient", value: true });
  context.commit("setPatient", undefined);
  const resource = `patients/${patientId}`;

  try {
    const patient: any = await updateResource({
      url: resource,
      payload: payload,
    });
    context.commit("setPatient", patient.data.data);
  } catch (e) {
    console.error(e);
    context.commit("setPatient", undefined);
  }

  context.commit("setIsLoading", { action: "updatePatient", value: false });
}

export async function moveToNext(context: Context) {
  const pagination = context.state.pagination;

  pagination.urlStack.push(pagination.currentLinkUrl);
  pagination.currentLinkUrl = pagination.nextLinkUrl;
  context.commit("setPagination", pagination);

  await getPatients(context, pagination.nextLinkUrl);
}

export async function moveToPrev(context: Context) {
  const pagination = context.state.pagination;
  const prevUrl = pagination.urlStack.pop();
  pagination.nextLinkUrl = pagination.currentLinkUrl;
  pagination.currentLinkUrl = prevUrl;
  context.commit("setPagination", pagination);

  await getPatients(context, prevUrl);
}
