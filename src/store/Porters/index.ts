import * as actions from "./porters.actions";
import * as mutations from "./porters.mutations";
import * as getters from "./porters.getters";
import state from "./porters.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const porters = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default porters;
