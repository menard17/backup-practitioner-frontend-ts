import Vue from "vue";
import Vuex from "vuex";
import $_auth from "@/modules/Auth/store";
import $_appointments from "./Appointments";
import $_patients from "./Patients";
import $_practitioners from "./Practitioners";
import $_payments from "./Payments";
import $_account from "./Account";
import $_application from "./Application";
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
    $_practitioners,
    $_payments,
    $_application,
  },
});
