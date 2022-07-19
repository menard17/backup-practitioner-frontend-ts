import * as actions from "./application.actions";
import * as mutations from "./application.mutations";
import * as getters from "./application.getters";
import state from "./application.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const application = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default application;
