import { auth } from "@/plugins/firebase";
import {
  getAll,
  getById,
  patchResource,
  updateResource,
} from "@/utils/apiHelpers";

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

export async function getPractitionerRoles({ commit }: any, role: string) {
  commit("setIsLoading", { action: "getPractitionerRoles", value: true });
  commit("setPractitionerRoles", []);
  if (!auth.currentUser) {
    return;
  }

  const practitionerRolesData: any = await getAll(
    `practitioner_roles?role_type=${role}&include_practitioner=true`
  );

  const practitionerRoles: any = practitionerRolesData.filter(
    (practitionerRole: any) =>
      practitionerRole.resourceType === "PractitionerRole"
  );

  const practitioners: any = practitionerRolesData.filter(
    (practitioner: any) => practitioner.resourceType === "Practitioner"
  );

  practitionerRoles.map((practitionerRole: any) => {
    const practitioner = practitioners.find(
      (practitioner: any) =>
        practitioner.id ===
        practitionerRole.practitioner.reference.split("/")[1]
    );
    practitionerRole.practitionerObj = practitioner;
  });

  if (role) {
    commit("setPractitionerRoles", practitionerRoles);
  } else {
    console.warn("No Type Selected, Getting all");
    commit("setPractitionerRoles", practitionerRoles);
  }

  commit("setIsLoading", { action: "getPractitionerRoles", value: false });
}

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

export async function getPractitionerAppointments(
  context: Context,
  practitionerId: string
) {
  context.commit("setIsLoading", {
    action: "getPractitionerAppointments",
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
    action: "getPractitionerAppointments",
    value: false,
  });
}

export async function updatePractitioner(
  context: any,
  { payload, practitionerRoleId }: any
) {
  context.commit("setIsLoading", {
    action: "updatePractitioner",
    value: true,
  });

  const url = `practitioner_roles/${practitionerRoleId}`;

  let practitionerRole: any;
  try {
    practitionerRole = await updateResource({ url, payload });

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
    action: "updatePractitioner",
    value: false,
  });
}

type updatePractitionerStatusType = {
  practitionerStatus: string;
  practitionerRoleId: string;
};

export async function updatePractitionerStatus(
  context: Context,
  { practitionerStatus, practitionerRoleId }: updatePractitionerStatusType
) {
  context.commit("setIsLoading", {
    action: "updatePractitionerStatus",
    value: true,
  });

  const url = `practitioner_roles/${practitionerRoleId}?active=${practitionerStatus}`;

  return new Promise((resolve, reject) => {
    patchResource({ url, payload: null })
      .then(() => {
        resolve(practitionerRoleId);
        context.commit("setPractitionerRoleStatus", {
          roleId: practitionerRoleId,
          status: practitionerStatus,
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });

    context.commit("setIsLoading", {
      action: "updatePractitionerStatus",
      value: false,
    });
  });
}
