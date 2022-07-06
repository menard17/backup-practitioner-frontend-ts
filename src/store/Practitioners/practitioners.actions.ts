import { auth } from "@/plugins/firebase";
import { getAll, getById } from "@/utils/apiHelpers";
import { Context } from "../types";

export const getPractitioners = async (context: Context) => {
  context.commit("setIsLoading", { action: "getPractitioners", value: true });
  context.commit("setPractitioners", []);
  if (!auth.currentUser) {
    return;
  }

  const practitioners: any = await getAll(`practitioners`);
  context.commit("setPractitioners", practitioners.data);
  context.commit("setIsLoading", { action: "getPractitioners", value: false });
};

export async function getPractitionerById(
  context: Context,
  practitionerId: string
) {
  context.commit("setIsLoading", {
    action: "getPractitionerById",
    value: true,
  });
  context.commit("setPractitioner", undefined);
  const practitioner: any = await getById({
    resource: "practitioners",
    resourceId: practitionerId,
  });
  context.commit("setPractitioner", practitioner);
  context.commit("setIsLoading", {
    action: "getPractitionerById",
    value: false,
  });
}

export async function getPractitionerRoleByPractitionerId(
  context: Context,
  practitionerId: string
) {
  context.commit("setIsLoading", {
    action: "getPractitionerRoleByPractitionerId",
    value: true,
  });
  context.commit("setPractitionerRole", undefined);
  const practitionerRoles: any = await getAll(
    `practitioner_roles?practitioner_id=${practitionerId}`
  );

  const practitionerRole = practitionerRoles[0];
  context.commit("setPractitionerRole", practitionerRole);
  context.commit("setIsLoading", {
    action: "getPractitionerRoleByPractitionerId",
    value: false,
  });
}

export async function getPractitionerRoleById(
  context: Context,
  practitionerRoleId: string
) {
  context.commit("setIsLoading", {
    action: "getPractitionerRoleById",
    value: true,
  });
  context.commit("setPractitionerRole", undefined);
  const practitionerRole: any = await getById({
    resource: "practitioner_roles",
    resourceId: practitionerRoleId,
  });
  context.commit("setPractitionerRole", practitionerRole);
  context.commit("setIsLoading", {
    action: "getPractitionerRoleById",
    value: false,
  });
}

export async function getPracitionerAppointments(
  context: Context,
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
