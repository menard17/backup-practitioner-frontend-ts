import { auth } from "@/plugins/firebase";
import axios from "./axiosHelpers";

export const createResource = async ({ resource, payload }: any) => {
  if (!auth.currentUser) {
    return;
  }
  const email = auth.currentUser.email;
  const payloadWithEmail = {
    ...payload,
    email,
  };

  const response = await axios.post(`/${resource}`, payloadWithEmail);
  return response;
};

export const patchResource = async ({ url, payload }: any) => {
  const [baseResource, params] = url.split("?");
  if (!auth.currentUser) {
    return;
  }
  const response = await axios.patch(`/${baseResource}`, payload, {
    params: new URLSearchParams(params),
  });
  return response;
};

export const updateResource = async ({ url, payload }: any) => {
  if (!auth.currentUser) {
    return;
  }
  const response = await axios.put(`/${url}`, payload);
  return response;
};

export const getAll = async (resource: string) => {
  if (!auth.currentUser) {
    return;
  }
  return new Promise((resolve, reject) => {
    const [baseResource, params] = resource.split("?");

    axios
      .get(`/${baseResource}`, {
        params: new URLSearchParams(params),
      })
      .then((response) => {
        const results = response.data;
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getById = async ({ resource, resourceId }: any) => {
  if (!auth.currentUser) {
    return;
  }
  return new Promise((resolve, reject) => {
    if (!resourceId) {
      reject(new Error("Reject given resource id is empty"));
    }
    axios
      .get(`/${resource}/${resourceId}`)
      .then((response) => {
        const result = response.data;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getEmail = async () => {
  if (!auth.currentUser) {
    return;
  }
  return await auth.currentUser.email;
};

export const callLogicApp = async (
  payload: any,
  logicAppEndpoint: string | undefined
) => {
  if (logicAppEndpoint == null) {
    return;
  }
  const response = await axios.post(logicAppEndpoint, payload);
  return response;
};
