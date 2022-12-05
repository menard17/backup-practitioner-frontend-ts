import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;

onAuthStateChanged(auth, () => {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
  }).$mount("#app");
});
