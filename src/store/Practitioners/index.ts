import * as actions from "./practitioners.actions";
import * as mutations from "./practitioners.mutations";
import * as getters from "./practitioners.getters";
import state from "./practitioners.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const practitioners = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default practitioners;
