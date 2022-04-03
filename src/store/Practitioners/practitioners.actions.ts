import { auth } from "@/plugins/firebase";
import { getAll, getById } from "@/utils/apiHelpers";

export const getPractitioners = async ({ commit }: any) => {
  commit("setIsLoading", { action: "getPractitioners", value: true });
  commit("setPractitioners", []);
  if (!auth.currentUser) {
    return;
  }

  const practitioners: any = await getAll(`practitioners`);
  commit("setPractitioners", practitioners.data.entry);
  commit("setIsLoading", { action: "getPractitioners", value: false });
};

export async function getPractitionerById(
  { commit }: any,
  practitionerId: string
) {
  commit("setIsLoading", { action: "getPractitionerById", value: true });
  commit("setPractitioner", undefined);
  const practitioner: any = await getById({
    resource: "practitioners",
    resourceId: practitionerId,
  });
  commit("setPractitioner", practitioner);
  commit("setIsLoading", { action: "getPractitionerById", value: false });
}

export async function getPractitionerRoleByPractitionerId(
  { commit }: any,
  practitionerId: string
) {
  commit("setIsLoading", {
    action: "getPractitionerRoleByPractitionerId",
    value: true,
  });
  commit("setPractitionerRole", undefined);
  const practitionerRoles: any = await getAll(
    `practitioner_roles?practitioner_id=${practitionerId}`
  );

  const practitionerRole = practitionerRoles[0];
  commit("setPractitionerRole", practitionerRole);
  commit("setIsLoading", {
    action: "getPractitionerRoleByPractitionerId",
    value: false,
  });
}

export async function getPractitionerRoleById(
  { commit }: any,
  practitionerRoleId: string
) {
  commit("setIsLoading", { action: "getPractitionerRoleById", value: true });
  commit("setPractitionerRole", undefined);
  const practitionerRole: any = await getById({
    resource: "practitioner_roles",
    resourceId: practitionerRoleId,
  });
  console.log("ROLE: ", practitionerRole);
  commit("setPractitionerRole", practitionerRole);
  commit("setIsLoading", { action: "getPractitionerRoleById", value: false });
}

export async function getPracitionerAppointments(
  context: any,
  practitionerId: string
) {
  context.commit("setIsLoading", {
    action: "getPracitionerAppointments",
    value: true,
  });
  context.commit("setAppointments", []);
  const appointments = await context.dispatch(
    "$_appointments/getAppointments",
    { actorId: practitionerId },
    { root: true }
  );
  context.commit("setAppointments", appointments.data);
  context.commit("setIsLoading", {
    action: "getPracitionerAppointments",
    value: false,
  });
}
