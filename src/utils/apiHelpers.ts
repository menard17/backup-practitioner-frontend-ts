import { auth } from "@/plugins/firebase";
import axios from "axios";

export const createResource = async ({ resource, payload }: any) => {
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);
  const email = auth.currentUser.email;
  const payloadWithEmail = {
    ...payload,
    email,
  };

  const response = await axios.post(
    `${process.env.VUE_APP_baseUrl}/${resource}`,
    payloadWithEmail,
    {
      headers: {
        Authorization: `Bearer ${idToken.token}`,
      },
      withCredentials: false,
    }
  );
  return response;
};

export const patchResource = async ({ url, payload }: any) => {
  const [baseResource, params] = url.split("?");
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);
  const response = await axios.patch(
    `${process.env.VUE_APP_baseUrl}/${baseResource}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${idToken.token}`,
      },
      params: new URLSearchParams(params),
      withCredentials: false,
    }
  );
  return response;
};

export const updateResource = async ({ url, payload }: any) => {
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);
  const response = await axios.put(
    `${process.env.VUE_APP_baseUrl}/${url}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${idToken.token}`,
      },
      withCredentials: false,
    }
  );
  return response;
};

export const getAll = async (resource: string) => {
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);
  return new Promise((resolve, reject) => {
    const [baseResource, params] = resource.split("?");

    axios
      .get(`${process.env.VUE_APP_baseUrl}/${baseResource}`, {
        headers: {
          Authorization: `Bearer ${idToken.token}`,
        },
        params: new URLSearchParams(params),
        withCredentials: false,
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
  const idToken = await auth.currentUser.getIdTokenResult(true);
  return new Promise((resolve, reject) => {
    if (!resourceId) {
      reject(new Error("Reject given resource id is empty"));
    }
    axios
      .get(`${process.env.VUE_APP_baseUrl}/${resource}/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${idToken.token}`,
        },
        withCredentials: false,
      })
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
  const response = await axios.post(logicAppEndpoint, payload, {
    withCredentials: false,
  });
  return response;
};
