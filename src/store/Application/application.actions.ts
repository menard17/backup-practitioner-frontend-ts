import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { Context } from "../types";
import { EmailObject, SheetObject, Template } from "@/store/Application/types";
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

export const insertSheet = async (context: Context, payload: SheetObject) => {
  context.commit("setIsLoading", { action: "callLogicApp", value: true });
  context.commit("setSheet", false);
  try {
    await callLogicApp(payload, process.env.VUE_APP_logic_app_url_sheet);
    context.commit("setSheet", true);
    context.commit("setIsLoading", { action: "callLogicApp", value: false });
  } catch {
    context.commit("setIsLoading", { action: "callLogicApp", value: false });
    context.commit("setSheet", false);
  }
};
