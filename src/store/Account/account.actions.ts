import { auth } from "@/plugins/firebase";
import {
  createResource,
  getAll,
  getById,
  updateResource,
} from "@/utils/apiHelpers";
import { getIdTokenResult, User } from "firebase/auth";
import { Context } from "../types";

export const getCurrentUser = async (context: Context) => {
  context.commit("setIsLoading", { action: "getCurrentUser", value: true });
  context.commit("setPractitioner", undefined);
  context.commit("setPractitionerRole", undefined);
  context.commit("setUser", undefined);

  const practitionerId = await getCurrentUserRole(context);

  if (!practitionerId) {
    context.commit("setIsLoading", { action: "getCurrentUser", value: false });
    return;
  }

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

export const getCurrentUserRole = async (context: Context) => {
  context.commit("setIsLoading", { action: "getCurrentUserRole", value: true });
  context.commit("setUser", undefined);

  if (!auth.currentUser) {
    context.commit("setFirebaseRole", "");
    return;
  }

  const user: User = auth.currentUser;
  const tokenResult: any = await getIdTokenResult(user);

  context.commit("setUser", user);

  if (!tokenResult.claims.roles) {
    context.commit("setIsLoading", {
      action: "getCurrentUserRole",
      value: false,
    });
    context.commit("setFirebaseRole", "");
    return;
  }
  if (
    !tokenResult.claims.roles.Practitioner &&
    !tokenResult.claims.roles.Staff
  ) {
    context.commit("setIsLoading", {
      action: "getCurrentUserRole",
      value: false,
    });
    context.commit("setFirebaseRole", "");
    return;
  } else if (tokenResult.claims.roles.Practitioner) {
    context.commit("setIsLoading", {
      action: "getCurrentUserRole",
      value: false,
    });
    context.commit("setFirebaseRole", "Practitioner");
    return tokenResult.claims.roles.Practitioner.id;
  } else if (tokenResult.claims.roles.Staff) {
    context.commit("setFirebaseRole", "Staff");
    return tokenResult.claims.roles.Staff.id;
  }
  return;
};

export async function updateMyPractitionerStatus(
  context: Context,
  { practitionerStatus, practitionerRoleId }: any
) {
  context.commit("setIsLoading", {
    action: "updateMyPractitionerStatus",
    value: true,
  });

  try {
    const _ = await context.dispatch(
      "$_practitioners/updatePractitionerStatus",
      { practitionerStatus, practitionerRoleId },
      { root: true }
    );

    await getCurrentUser(context);
  } catch (e) {
    console.error(e);
  } finally {
    context.commit("setIsLoading", {
      action: "updateMyPractitionerStatus",
      value: false,
    });
  }
}

export async function updateMyPractitionerRole(
  context: Context,
  { changeFields }: any
) {
  context.commit("setIsLoading", {
    action: "updateMyPractitionerRole",
    value: true,
  });
  const practitionerRoleId = context.state.practitionerRole.id;
  const payload = {
    ...changeFields,
  };

  try {
    await context.dispatch(
      "$_practitioners/updatePractitioner",
      { payload, practitionerRoleId },
      { root: true }
    );
  } catch (e) {
    console.error(e);
  }

  context.commit("setIsLoading", {
    action: "updateMyPractitionerRole",
    value: false,
  });
}

export async function createMyPractitionerWithPractitionerRole(
  context: Context,
  { changeFields }: any
) {
  context.commit("setIsLoading", {
    action: "createMyPractitionerWithPractitionerRole",
    value: true,
  });

  const resource = `practitioner_roles`;
  let payload;
  if (changeFields.role_type === "doctor") {
    context.commit("setFirebaseRole", "Practitioner");
    payload = {
      ...changeFields,
      available_time: [{}],
      zoom_id: "zoom id placeholder",
      zoom_password: "zoom passcode placeholder",
    };
  } else {
    context.commit("setFirebaseRole", "Staff");
    payload = {
      ...changeFields,
    };
  }

  try {
    const practitionerRole: any = await createResource({ resource, payload });

    // fetch practitioner data
    const practitionerId =
      practitionerRole.data.practitioner.reference.split("/")[1];
    const practitioner: any = await getById({
      resource: "practitioners",
      resourceId: practitionerId,
    });

    context.commit("setPractitionerRole", practitionerRole.data);
    context.commit("setPractitioner", practitioner);
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
