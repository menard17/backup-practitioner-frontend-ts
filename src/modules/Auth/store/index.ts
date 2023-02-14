import * as actions from "./auth.actions";
import * as mutations from "./auth.mutations";
import * as getters from "./auth.getters";
import state from "./auth.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const auth = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default auth;
