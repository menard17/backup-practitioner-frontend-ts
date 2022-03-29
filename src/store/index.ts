import Vue from "vue";
import Vuex from "vuex";
import $_auth from "@/modules/Auth/store";
import $_appointments from "./Appointments";
import $_patients from "./Patients";
import $_account from "./Account";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    $_auth,
    $_appointments,
    $_patients,
    $_account,
  },
});
