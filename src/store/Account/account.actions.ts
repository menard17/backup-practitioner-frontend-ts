import { auth } from "@/plugins/firebase";
import {
  createResource,
  getAll,
  getById,
  patchResource,
  updateResource,
} from "@/utils/apiHelpers";
import { getIdTokenResult, User } from "firebase/auth";

export const getCurrentUser = async (context: any) => {
  context.commit("setIsLoading", { action: "getCurrentUser", value: true });
  context.commit("setPractitioner", undefined);
  context.commit("setPractitionerRole", undefined);
  context.commit("setUser", undefined);

  const practitionerId = await getCurrentUserRole(context);
  const practitioner: any = await getById({
    resource: "practitioners",
    resourceId: practitionerId,
  });

  const practitionerRoles: any = await getAll(
    `practitioner_roles?practitioner_id=${practitionerId}`
  );

  const practitionerRole = practitionerRoles[0];
  context.commit("setPractitioner", practitioner);
  context.commit("setPractitionerRole", practitionerRole);
  context.commit("setIsLoading", { action: "getCurrentUser", value: false });
};

export async function getCurrentUserRole({ commit }: any) {
  commit("setIsLoading", { action: "getCurrentUserRole", value: true });
  commit("setUser", undefined);

  if (!auth.currentUser) {
    commit("setIsPractitioner", false);
    return;
  }

  const user: User = auth.currentUser;
  const tokenResult: any = await getIdTokenResult(user);

  commit("setUser", user);

  if (!tokenResult.claims.roles) {
    commit("setIsLoading", { action: "getCurrentUserRole", value: false });
    commit("setIsPractitioner", false);
    return;
  }
  if (!tokenResult.claims.roles.Practitioner) {
    commit("setIsLoading", { action: "getCurrentUserRole", value: false });
    commit("setIsPractitioner", false);
    return;
  }

  commit("setIsPractitioner", true);
  commit("setIsLoading", { action: "getCurrentUserRole", value: false });

  return tokenResult.claims.roles.Practitioner.id;
}

export async function updateMyPractitionerRole(
  context: any,
  { changeFields }: any
) {
  context.commit("setIsLoading", {
    action: "updateMyPractitionerRole",
    value: true,
  });
  const practitionerRoleId = context.state.practitionerRole.id;
  const url = `practitioner_roles/${practitionerRoleId}`;
  const payload = {
    ...changeFields,
  };

  try {
    const practitionerRole: any = await updateResource({ url, payload });

    const practitionerRoleData = practitionerRole.data.entry.find(
      (item: any) => item.resource.resourceType === "PractitionerRole"
    );

    if (practitionerRoleData) {
      context.commit("setPractitionerRole", practitionerRoleData.resource);
    }

    const practitionerData = practitionerRole.data.entry.find(
      (item: any) => item.resource.resourceType === "Practitioner"
    );

    if (practitionerData) {
      context.commit("setPractitioner", practitionerData.resource);
    }
  } catch (e) {
    console.error(e);
  }

  context.commit("setIsLoading", {
    action: "updateMyPractitionerRole",
    value: false,
  });
}

export async function createMyPractitionerWithPractitionerRole(
  context: any,
  { changeFields }: any
) {
  context.commit("setIsLoading", {
    action: "createMyPractitionerWithPractitionerRole",
    value: true,
  });

  const resource = `practitioner_roles`;
  let payload;
  if (changeFields.role_type === "doctor") {
    payload = {
      ...changeFields,
      available_time: [{}],
      zoom_id: "zoom id placeholder",
      zoom_password: "zoom passcode placeholder",
    };
  } else {
    payload = {
      ...changeFields,
    };
  }

  try {
    const practitionerRole: any = await createResource({ resource, payload });
    context.commit(
      "setPractitionerRole",
      practitionerRole.data.entry.find(
        (item: any) => item.resource.resourceType === "PractitionerRole"
      )
    );

    context.commit(
      "setPractitioner",
      practitionerRole.data.entry.find(
        (item: any) => item.resource.resourceType === "Practitioner"
      )
    );
  } catch (e) {
    console.error(e);
    context.commit("setIsLoading", {
      action: "createMyPractitionerWithPractitionerRole",
      value: false,
    });
  }
  context.commit("setIsLoading", {
    action: "createMyPractitionerWithPractitionerRole",
    value: false,
  });
}
