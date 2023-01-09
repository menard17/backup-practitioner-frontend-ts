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
import PractitionersPage from "@/views/Practitioner/PractitionersPage.vue";
import PractitionerRolesPage from "@/views/Practitioner/PractitionerRolesPage.vue";
import PractitionerDetailsWrapperPage from "@/views/Practitioner/PractitionerDetailsWrapperPage.vue";
import BulkPaymentsPage from "@/views/Payments/BulkPaymentsPage.vue";

const VideoPage = () => import("../modules/Video/views/VideoPage.vue");
const QueuePage = () => import("@/views/Queue/QueuePage.vue");

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
    path: "/practitioners",
    name: "practitioner",
    component: PractitionersPage,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/practitioners/:id",
    name: "practitioner-detail",
    component: PractitionerDetailsWrapperPage,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/practitioner-roles",
    name: "practitioner-roles",
    component: PractitionerRolesPage,
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
    path: "/bulk-payments",
    name: "bulk-payments",
    component: BulkPaymentsPage,
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
    component: () => import("../views/AboutView.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/porters",
    name: "porters",
    component: () => import("../views/Porters/PortersPage.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/Orders/OrdersPage.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/video",
    name: "video-room",
    component: VideoPage,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/queue",
    name: "queue",
    component: QueuePage,
    meta: {
      authRequired: true,
    },
  },
];
