import * as actions from "./orders.actions";
import * as mutations from "./orders.mutations";
import * as getters from "./orders.getters";
import state from "./orders.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const orders = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default orders;
