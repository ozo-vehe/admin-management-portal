// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your page components
import BookingCalenderPage from '../pages/BookingCalenderPage.vue'
import RequestsPage from '../pages/RequestsPage.vue'
import DownloadsPage from '../pages/DownloadsPage.vue'
import BookingTablePage from '../pages/BookingTablePage.vue'
import BookingAidPage from '../pages/BookingAidPage.vue'
// import DownloadsPage from '../pages/DownloadsPage.vue'
// import Website from '../pages/Website.vue'
// import Logout from '../pages/Logout.vue'

const routes = [
  { path: '/', component: BookingCalenderPage },
  { path: '/requests', component: RequestsPage },
  { path: '/downloads', component: DownloadsPage },
  { path: '/booking-aid', component: BookingAidPage },
  {
    path: '/bookings/:date',
    name: 'BookingTable',
    component: BookingTablePage,
    props: true,
  },
  
  // { path: '/website', component: Website },
  // { path: '/logout', component: Logout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
