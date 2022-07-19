import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { Context } from "../types";
import { Template } from "@/store/Application/types";

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
