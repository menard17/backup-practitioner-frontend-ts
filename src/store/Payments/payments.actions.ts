/* eslint-disable no-unused-vars */
import { auth } from "@/plugins/firebase";
import axios from "axios";

async function configSetup({ method, url, data }: any) {
  if (!auth.currentUser) {
    return;
  }
  const idToken = await auth.currentUser.getIdTokenResult(true);
  if (method === "post") {
    return {
      method,
      url: `${process.env.VUE_APP_baseUrl}/${url}`,
      headers: {
        Authorization: `Bearer ${idToken.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: false,
      data,
    };
  }
  return {
    method,
    url: `${process.env.VUE_APP_baseUrl}/${url}`,
    headers: {
      Authorization: `Bearer ${idToken.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: false,
  };
}

export async function getPaymentMethod(
  { commit }: any,
  { paymentMethodId }: any
) {
  const config: any = await configSetup({
    method: "get",
    url: `payments/payment-methods/${paymentMethodId}`,
  });
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const paymentMethod = response;
        resolve(paymentMethod.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function getPaymentMethods({ commit }: any, { customerId }: any) {
  const config: any = await configSetup({
    method: "get",
    url: `payments/${customerId}/payment-methods`,
  });
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const paymentMethods = response;
        resolve(paymentMethods.data.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function postPaymentIntent(
  { commit }: any,
  { customerId, paymentMethodId, amount }: any
) {
  const data = { customerId, paymentMethodId, amount };
  const config: any = await configSetup({
    method: "post",
    url: "payments/payment-intent",
    data,
  });
  console.log(config);
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const payment = response.data;
        resolve(payment);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function getPaymentIntents({ commit }: any, { customerId }: any) {
  const config: any = await configSetup({
    method: "get",
    url: `payments/${customerId}/payment-intents`,
  });
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const paymentIntents = response;
        resolve(paymentIntents.data.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
