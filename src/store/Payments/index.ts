import * as actions from "./payments.actions";
import * as mutations from "./payments.mutations";
import * as getters from "./payments.getters";
import state from "./payments.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const payments = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default payments;
