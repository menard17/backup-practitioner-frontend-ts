import * as actions from "./common.actions";
import * as mutations from "./common.mutations";
import getters from "./common.getters";
import state from "./common.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const commons = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default commons;
