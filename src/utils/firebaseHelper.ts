import { firestore } from "@/plugins/firebase";
import { OrderHistory } from "@/store/Orders/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default class FirebaseHelper {
  private static readonly encounterHistoryCollection = "encounter_history";

  public static getOrderHistory = async (orderId: string) => {
    const encounterHistoryQuery = query(
      collection(firestore, this.encounterHistoryCollection),
      where("encounterId", "==", orderId),
      orderBy("timeStamp", "desc")
    );

    return await getDocs(encounterHistoryQuery).then(async (snapShot) => {
      const histories: OrderHistory[] = [];
      snapShot.forEach((doc) => {
        const history = doc.data();
        history.documentId = doc.id;
        histories.push(history as OrderHistory);
      });

      return histories;
    });
  };
}
