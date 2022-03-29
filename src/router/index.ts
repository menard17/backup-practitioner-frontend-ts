import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import { auth } from "@/plugins/firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (auth.currentUser) {
      next();
    } else {
      next({
        path: "/sign-in",
        query: {
          redirect: to.path,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
