import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/plugins/firebase";

Vue.config.productionTip = false;

onAuthStateChanged(auth, (user) => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
