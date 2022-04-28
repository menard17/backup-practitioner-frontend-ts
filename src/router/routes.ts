import { RouteConfig } from "vue-router";
import HomeView from "../views/Account/MyAccountPage.vue";
import AppointmentsPage from "@/views/Appointment/AppointmentsPage.vue";
import AppointmentDetailPage from "@/views/Appointment/AppointmentDetailPage.vue";
import PatientPersonalTab from "@/views/Patient/Tabs/PatientPersonalTab.vue";
import PatientAppointmentsTab from "@/views/Patient/Tabs/PatientAppointmentsTab.vue";
import PatientBillingTab from "@/views/Patient/Tabs/PatientBillingTab.vue";
import PatientDetailWrapperPage from "@/views/Patient/PatientDetailWrapperPage.vue";
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
    component: PatientDetailWrapperPage,
    redirect: { name: "patient-personal" },
    children: [
      {
        name: "patient-personal",
        path: "personal",
        component: PatientPersonalTab,
      },
      {
        name: "patient-appointments",
        path: "appointments",
        component: PatientAppointmentsTab,
      },
      {
        name: "patient-billing",
        path: "billing",
        component: PatientBillingTab,
      },
    ],
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
