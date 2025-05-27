import { createRouter, createWebHistory } from "vue-router";
import SignInView from "../views/SignInView.vue";
import CustomerSupportView from "@/views/CustomerSupportView.vue";
import TrackTraceView from "@/views/TrackTraceView.vue";
import FinanceView from "@/views/FinanceView.vue";
import BookingCalendar from "@/components/support/BookingCalendar.vue";
import Requests from "@/components/support/Requests.vue";
import Downloads from "@/components/support/Downloads.vue";
import Request from "@/components/support/Request.vue";
import BookingAid from "@/components/support/BookingAid.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/support",
      name: "support",
      component: CustomerSupportView,
      children: [
        {
          path: "/support",
          name: "support-booking-calendar",
          component: BookingCalendar,
        },
        {
          path: "/support/requests",
          name: "support-requests",
          component: Requests,
        },
        {
          path: "/support/downloads",
          name: "support-downloads",
          component: Downloads,
        },
        {
          path: "/support/booking/:date",
          name: "support-calendar-request",
          component: Request,
        },
        {
          path: "/support/booking-aid",
          name: "support-booking-aid",
          component: BookingAid
        },
      ],
    },
    {
      path: "/track-trace",
      name: "track-trace",
      component: TrackTraceView,
      children: [],
    },
    {
      path: "/finance",
      name: "finance",
      component: FinanceView,
      children: [],
    },
  ],
});

export default router;
