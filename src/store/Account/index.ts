import * as actions from "./account.actions";
import * as mutations from "./account.mutations";
import * as getters from "./account.getters";
import state from "./account.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const account = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default account;
