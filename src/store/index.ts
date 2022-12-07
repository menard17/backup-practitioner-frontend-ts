import Vue from "vue";
import Vuex from "vuex";
import $_account from "./Account";
import $_application from "./Application";
import $_appointmentHistory from "./AppointmentHistory";
import $_appointments from "./Appointments";
import $_auth from "@/modules/Auth/store";
import $_orders from "./Orders";
import $_patients from "./Patients";
import $_payments from "./Payments";
import $_porters from "./Porters";
import $_practitioners from "./Practitioners";
import $_commons from "./Commons";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    $_account,
    $_application,
    $_appointmentHistory,
    $_appointments,
    $_auth,
    $_orders,
    $_patients,
    $_payments,
    $_porters,
    $_practitioners,
    $_commons,
  },
});
