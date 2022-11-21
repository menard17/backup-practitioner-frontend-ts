import { firestore } from "@/plugins/firebase";
import { collection, getDocs, query, updateDoc } from "firebase/firestore";
import { ActionContext } from "vuex";
import { Porter } from "./types";

type Context = ActionContext<unknown, unknown>;

const SetIsLoading = "setIsLoading";
const SetPorters = "setPorters";
const Porters = "porters";
const PorterAction = "porters";
const UpdatePorter = "updatePorter";

export const getPorters = async (context: Context) => {
  context.commit(SetIsLoading, { action: PorterAction, value: true });
  const porters = [] as Porter[];
  const q = query(collection(firestore, Porters));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const porter = doc.data();
    porter.documentId = doc.id;
    porter.ref = doc.ref;
    porters.push(porter as Porter);
  });
  context.commit(SetPorters, porters);
  context.commit(SetIsLoading, { action: PorterAction, value: false });
};

export const updatePorter = async (context: Context, porter: Porter) => {
  context.commit(SetIsLoading, { action: PorterAction, value: true });
  if (porter.ref != null) {
    await updateDoc(porter.ref, {
      active: porter.active,
      name: porter.name,
      area: porter.area,
    });
    context.commit(UpdatePorter, porter);
  }
  context.commit(SetIsLoading, { action: PorterAction, value: false });
};
