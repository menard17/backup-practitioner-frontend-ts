import { auth } from "@/plugins/firebase";
import axios from "axios";
import { convertParams } from "@/utils/urlHelpers";

export const createResource = async ({ resource, payload }: any) => {
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);

  const response = await axios.post(
    `${process.env.VUE_APP_baseUrl}/${resource}`,
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
      params: convertParams(params),
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
  console.log("ID TOKEN: ", idToken);
  return new Promise((resolve, reject) => {
    const [baseResource, params] = resource.split("?");
    axios
      .get(`${process.env.VUE_APP_baseUrl}/${baseResource}`, {
        headers: {
          Authorization: `Bearer ${idToken.token}`,
        },
        params: convertParams(params),
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
