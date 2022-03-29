import { auth } from "@/plugins/firebase";
import { getAll, getById } from "@/utils/apiHelpers";
import { getIdTokenResult, User } from "firebase/auth";

export const getCurrentUser = async ({ commit }: any) => {
  commit("setIsLoading", { action: "getCurrentUser", value: true });
  commit("setPractitioner", undefined);
  commit("setPractitionerRole", undefined);

  if (!auth.currentUser) {
    return;
  }

  const user: User = auth.currentUser;
  const tokenResult: any = await getIdTokenResult(user);
  if (!tokenResult.claims.roles) {
    return;
  }
  if (!tokenResult.claims.roles.Practitioner) {
    return;
  }

  const practitionerId = tokenResult.claims.roles.Practitioner.id;
  const practitioner: any = await getById({
    resource: "practitioners",
    resourceId: practitionerId,
  });

  const practitionerRoles: any = await getAll(
    `practitioner_roles?practitioner_id=${practitionerId}`
  );

  const practitionerRole = practitionerRoles[0];
  commit("setPractitioner", practitioner);
  commit("setPractitionerRole", practitionerRole);
  commit("setIsLoading", { action: "getCurrentUser", value: false });
};
