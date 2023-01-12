import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "@/plugins/firebase";
import { Context } from "../types";
import {
  EmailObject,
  FileUploadObject,
  MedicalTerm,
  SheetObject,
  Template,
} from "@/store/Application/types";
import { callLogicApp } from "@/utils/apiHelpers";

export async function getTemplates(context: Context, { type }: Template) {
  const hasTemplateType = context.state.templates.filter(
    (template: Template) => template.type === type
  ).length;

  if (hasTemplateType) {
    return;
  }

  context.commit("setIsLoading", { action: "getTemplates", value: true });

  const q = query(
    collection(firestore, "templates"),
    where("type", "==", type)
  );

  const querySnapshot = await getDocs(q);
  const templates: Template[] = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const template = {} as Template;
    template.title = doc.data().title;
    template.type = doc.data().type;
    template.text = doc.data().text;
    template.displayOrder = doc.data().displayOrder;
    template.createdOn = doc.data().createdOn;
    template.language = doc.data().language;
    templates.push(template);
  });

  const sortedTemplates = templates.sort(
    (a: Template, b: Template) => a.displayOrder - b.displayOrder
  );
  context.commit("setTemplates", sortedTemplates);
  context.commit("setIsLoading", { action: "getTemplates", value: false });
}

export async function getMedicalTerms(context: Context, { type }: MedicalTerm) {
  context.commit("setIsLoading", { action: "getMedicalTerms", value: true });

  const q = query(
    collection(firestore, "medical_terms"),
    where("type", "==", type)
  );

  const querySnapshot = await getDocs(q);
  const medicalTerms: MedicalTerm[] = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const medicalTerm = {} as MedicalTerm;
    medicalTerm.type = doc.data().type;
    medicalTerm.language = doc.data().language;
    medicalTerm.array = doc.data().array;

    medicalTerms.push(medicalTerm);
  });

  context.commit("setMedicalTerms", { type, medicalTerms });
  context.commit("setIsLoading", { action: "getMedicalTerms", value: false });
}

export const sendEmail = async (context: Context, payload: EmailObject) => {
  context.commit("setIsLoading", { action: "callLogicApp", value: true });
  context.commit("setEmailSent", false);
  try {
    await callLogicApp(payload, process.env.VUE_APP_logic_app_url);
    context.commit("setEmailSent", true);
    context.commit("setIsLoading", { action: "callLogicApp", value: false });
  } catch {
    context.commit("setIsLoading", { action: "callLogicApp", value: false });
    context.commit("setEmailSent", false);
  }
};

export async function uploadFileToFirebaseStorage(
  context: Context,
  payload: FileUploadObject
) {
  const firebaseStorageUrl = `https://storage.cloud.google.com/${process.env.VUE_APP_storageBucket}/`;
  return new Promise((resolve, reject) => {
    context.commit("setIsLoading", {
      action: "uploadFileToFirebaseStorage",
      value: true,
    });

    const fileName = `${payload.path}/${payload.name}-${Date.now()}`.replaceAll(
      " ",
      ""
    );

    const storageRef = ref(storage, fileName);
    const metadata = {
      contentType: payload.contentType,
    };

    const uploadTask = uploadBytesResumable(storageRef, payload.file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        context.commit("setFileUploadProgress", progress);
      },
      (error) => {
        context.commit(
          "$_application/showNotification",
          {
            text: `There was an error uploading your file ${error.message}`,
            type: "error",
          },
          { root: true }
        );
        context.commit("setIsLoading", {
          action: "uploadFileToFirebaseStorage",
          value: false,
        });
        reject(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
          context.commit("setIsLoading", {
            action: "uploadFileToFirebaseStorage",
            value: false,
          });
          resolve(`${firebaseStorageUrl}${fileName}?authuser=4`);
          //resolve(downloadUrl);
        });
      }
    );
  });
}
