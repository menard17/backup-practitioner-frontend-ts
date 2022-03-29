import * as actions from "./patients.actions";
import * as mutations from "./patients.mutations";
import * as getters from "./patients.getters";
import state from "./patients.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const patients = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default patients;
