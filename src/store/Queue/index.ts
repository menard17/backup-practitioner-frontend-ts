import * as actions from "./queue.actions";
import * as mutations from "./queue.mutations";
import getters from "./queue.getters";
import state from "./queue.state";

// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const queues = {
  namespaced,
  getters,
  mutations,
  actions,
  state,
};

export default queues;
