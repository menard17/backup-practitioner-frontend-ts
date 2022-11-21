/* eslint-disable no-unused-vars */
import { auth, firestore } from "@/plugins/firebase";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import axios from "axios";
import { Context } from "../types";
import {
  BulkPaymentFile,
  BulkPaymentObject,
  ProcessBulkPaymentObject,
} from "@/store/Payments/types";
import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";
import { createResource } from "@/utils/apiHelpers";

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
  context: Context,
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

export async function getPaymentMethods(context: Context, { customerId }: any) {
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
  context: Context,
  { customerId, paymentMethodId, amount }: any
) {
  const data = { customerId, paymentMethodId, amount };
  const config: any = await configSetup({
    method: "post",
    url: "payments/payment-intent",
    data,
  });
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

export async function getPaymentIntents(context: Context, { customerId }: any) {
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

export async function uploadBulkPaymentFile(
  context: Context,
  payload: BulkPaymentFile
) {
  context.commit("setIsLoading", {
    action: "uploadBulkPaymentFile",
    value: true,
  });

  try {
    const downloadUrl = await context.dispatch(
      "$_application/uploadFileToFirebaseStorage",
      payload.fileUploadObject,
      { root: true }
    );

    const newDocRef = doc(collection(firestore, payload.fileUploadObject.path));

    await setDoc(newDocRef, {
      id: newDocRef.id,
      status: "uploaded",
      numberOfRows: payload.numberOfRows,
      name: payload.fileUploadObject.name,
      createdOn: serverTimestamp(),
      downloadUrl: downloadUrl,
      contents: payload.contents,
    });

    context.commit(
      "$_application/showNotification",
      {
        text: "Bulk payment file uploaded!",
        type: "success",
      },
      { root: true }
    );
  } catch (e) {
    context.commit(
      "$_application/showNotification",
      {
        text: `There was an error uploading your file ${e}`,
        type: "error",
      },
      { root: true }
    );
  } finally {
    context.commit("setIsLoading", {
      action: "uploadBulkPaymentFile",
      value: false,
    });
  }
}

export async function getBulkPaymentFiles(context: Context) {
  context.commit("setIsLoading", {
    action: "getBulkPaymentFiles",
    value: true,
  });

  const q = query(
    collection(firestore, "bulk_payment_files"),
    orderBy("createdOn", "desc")
  );
  onSnapshot(q, (querySnapshot) => {
    const bulkPaymentFiles = [] as BulkPaymentObject[];
    querySnapshot.forEach((doc) => {
      const bulkPaymentObject = {} as BulkPaymentObject;
      bulkPaymentObject.downloadUrl = doc.data().downloadUrl;
      bulkPaymentObject.createdOn = formatDateString(
        doc.data()?.createdOn?.toDate() ?? new Date(),
        TimeConstants.monthDayYearTime
      );
      bulkPaymentObject.id = doc.data().id;
      bulkPaymentObject.name = doc.data().name;
      bulkPaymentObject.status = doc.data().status;
      bulkPaymentObject.numberOfRows = doc.data().numberOfRows;
      bulkPaymentObject.contents = doc.data().contents
        ? JSON.parse(doc.data().contents)
        : [];
      bulkPaymentObject.processedFileUrl = doc.data().processedURL;

      bulkPaymentFiles.push(bulkPaymentObject);
    });

    context.commit("setBulkPaymentFiles", bulkPaymentFiles);
  });

  context.commit("setIsLoading", {
    action: "getBulkPaymentFiles",
    value: false,
  });
}

export async function processBulkPaymentFile(
  context: Context,
  bulkPaymentObject: ProcessBulkPaymentObject
) {
  context.commit("setIsLoading", {
    action: "processBulkPaymentFile",
    value: true,
  });
  const payload = {
    collection: bulkPaymentObject.collection,
    collectionId: bulkPaymentObject.collectionId,
    contents: bulkPaymentObject.contents,
  };
  console.log("PAYLOAD: ", payload);
  const resource = `payments/bulk`;
  try {
    await createResource({ resource, payload });
    context.commit(
      "$_application/showNotification",
      {
        text: "Started processing bulk payment file",
        type: "success",
      },
      { root: true }
    );
  } catch (e) {
    console.error(e);
    context.commit(
      "$_application/showNotification",
      {
        text: `There was an error processing your file ${e}`,
        type: "error",
      },
      { root: true }
    );
  }
  context.commit("setIsLoading", {
    action: "processBulkPaymentFile",
    value: false,
  });
}
