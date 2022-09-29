import * as actions from "./appointmentHistory.actions";
import * as mutations from "./appointmentHistory.mutations";
import * as getters from "./appointmentHistory.getters";
import state from "./appointmentHistory.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const appointmentHistory = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default appointmentHistory;
