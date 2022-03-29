import { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentsPage from "@/views/Appointment/AppointmentsPage.vue";
import AppointmentDetailPage from "@/views/Appointment/AppointmentDetailPage.vue";
import PatientDetailPage from "@/views/Patient/PatientDetailPage.vue";
import AuthPage from "@/modules/Auth/views/AuthPage.vue";
import PatientsPage from "@/views/Patient/PatientsPage.vue";

export const routes: Array<RouteConfig> = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: AuthPage,
  },

  {
    path: "/",
    name: "dashboard",
    component: HomeView,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/appointments",
    name: "appointments",
    component: AppointmentsPage,
    meta: {
      authRequired: true,
    },
  },

  {
    path: "/appointments/:id",
    name: "appointment-detail",
    component: AppointmentDetailPage,
    meta: {
      authRequired: true,
    },
  },

  {
    path: "/patients",
    name: "patients",
    component: PatientsPage,
    meta: {
      authRequired: true,
    },
  },

  {
    path: "/patients/:id",
    name: "patient-detail",
    component: PatientDetailPage,
    meta: {
      authRequired: true,
    },
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      authRequired: true,
    },
  },
];
