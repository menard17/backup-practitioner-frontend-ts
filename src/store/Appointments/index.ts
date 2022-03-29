import * as actions from "./appointments.actions";
import * as mutations from "./appointments.mutations";
import * as getters from "./appointments.getters";
import state from "./appointments.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const appointments = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default appointments;
