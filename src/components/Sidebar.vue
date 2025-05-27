<template>
  <main class="min-h-screen bg-white text-gray-500 transition-all duration-300 lg:relative absolute z-[10]"
    :class="isSidebarCollapsed ? 'w-0' : 'lg:w-[380px] w-[280px]'">

    <!-- Sidebar -->
    <div class="absolute flex-col top-0 left-0 bg-white h-full shadow-lg transition-all duration-300 py-6 flex"
      :class="isSidebarCollapsed ? 'w-0' : 'w-full'">
      <div class="sidebar_header flex items-center mb-4">
        <div class="w-[90px] shadow h-[40px] bg-gray-50 rounded-full ml-5">
          <img class="w-[100%] h-[100%] object-contain" :src="logo" alt="EFL logo image">
        </div>

        <button
          class="sidebar_arrow absolute border border-gray-200 bg-white rounded-full w-[35px] h-[35px] p-3 -right-4 top-5 my-auto cursor-pointer transition-all duration-300 lg:block hidden"
          @click="toggleSidebar" :class="{ '-right-8': isSidebarCollapsed }">
          <img v-if="isSidebarCollapsed" width="26" height="26" src="https://img.icons8.com/metro/26/forward.png"
            alt="forward" />
          <img v-else width="26" height="26" src="https://img.icons8.com/metro/26/back.png" alt="back" />
        </button>
      </div>

      <!-- Sidebar Content -->
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col gap-3 px-5 border-b border-gray-200 py-4">
          <li class="flex items-center" v-for="(link, index) in sidebarLinks" :key="index">
            <RouterLink v-if="link.path !== 'logout'" :to="link.path" @click="handleFilter(link.id)"
              class="relative flex items-center w-full rounded-full py-3 focus:outline-none text-gray-500 font-[500] capitalize transition-all duration-300 px-4">
              <img v-if="$route.name === link.id" class="w-5 h-5 mr-2" :src="link.active_icon" :alt="link.name">
              <img v-else class="w-5 h-5 mr-2" :src="link.icon" :alt="link.name">
              <span class="text-sm tracking-wide truncate">{{ link.name }}</span>
            </RouterLink>

            <button v-else @click="handleLogout" :aria-label="`${link.name} button`"
              class="relative flex items-center w-full rounded-full py-3 focus:outline-none text-gray-500 font-[500] capitalize transition-all duration-300 px-4 cursor-pointer">
              <img v-if="$route.name === link.id" class="w-5 h-5 mr-2" :src="link.active_icon" :alt="link.name">
              <img v-else class="w-5 h-5 mr-2" :src="link.icon" :alt="link.name">
              <span class="text-sm tracking-wide truncate">{{ link.name }}</span>
            </button>
          </li>
        </ul>

        <!-- Back to website -->
        <div class="mt-5 px-5">
          <a href="https://www.efl.africa" target="_blank"
            class="flex gap-2 items-center w-full rounded-full py-3 focus:outline-none text-gray-500 font-[500] capitalize transition-all duration-300 px-4">
            <img class="border border-gray-400 w-6 rounded-[8px] p-[5px]"
              src="https://img.icons8.com/android/99a1af/48/undo.png" alt="undo" />
            <span class="text-sm tracking-wide truncate">Back to website</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Hamburger Menu -->
    <button @click="toggleSidebar" type="button" aria-label="Hamburger menu button"
      class="hamburger_menu fixed top-5 right-5 lg:hidden block">
      <img class="w-8" src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="menu--v6" />
    </button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import logo from '@/assets/logo.png';
import { useSupportStore } from '@/stores/support';

// STORES DECLARATIONS
const support_store = useSupportStore()
const { logout } = support_store;

// INTERFACES DECLARATIONS
interface SidebarLink {
  id: string,
  name: string;
  icon: string;
  active_icon: string;
  path: string;
}

const router = useRouter();
const active_link: Ref<string> = ref('calendar');

const sidebarLinks: Ref<SidebarLink[]> = ref([
  {
    id: "support-booking-calendar",
    name: 'booking calendar',
    icon: 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/99a1af/64/external-calendar-interface-kiranshastry-lineal-kiranshastry-2.png',
    active_icon: 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/101d6a/64/external-calendar-interface-kiranshastry-lineal-kiranshastry-2.png',
    path: '/support'
  },
  {
    id: "support-booking-aid",
    name: 'booking aid',
    icon: 'https://img.icons8.com/material-rounded/99a1af/24/dashboard-layout.png',
    active_icon: 'https://img.icons8.com/material-rounded/101d6a/24/dashboard-layout.png',
    path: '/support/booking-aid'
  },
  {
    id: "support-requests",
    name: 'Requests',
    icon: 'https://img.icons8.com/glyph-neue/99a1af/64/time--v1.png',
    active_icon: 'https://img.icons8.com/glyph-neue/101d6a/64/time--v1.png',
    path: '/support/requests'
  },
  {
    id: "support-downloads",
    name: 'Downloads',
    icon: 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/99a1af/64/external-inbox-interface-kiranshastry-lineal-kiranshastry.png',
    active_icon: 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/101d6a/64/external-inbox-interface-kiranshastry-lineal-kiranshastry.png',
    path: '/support/downloads'
  },
  {
    id: 'logout',
    name: 'Log out',
    icon: 'https://img.icons8.com/external-anggara-basic-outline-anggara-putra/99a1af/24/external-logout-social-media-interface-anggara-basic-outline-anggara-putra.png',
    active_icon: 'https://img.icons8.com/external-anggara-basic-outline-anggara-putra/101d6a/24/external-logout-social-media-interface-anggara-basic-outline-anggara-putra.png',
    path: 'logout'
  }
  // <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/dashboard-layout.png" alt="dashboard-layout"/>
]);

// VARIABLES DECLARATIONS
const isSidebarCollapsed: Ref<boolean> = ref(false);

// FUNCTIONS DECLARATIONS
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleFilter = (id: string) => {
  console.log("Handling filer")
  console.log(window.innerWidth)
  active_link.value = id;
  if (window.innerWidth < 1024) {
    isSidebarCollapsed.value = true;
    console.log("Less than 1024")
  }
};

const handleLogout = async () => {
  // window.location.reload();
  await logout();
  router.push('/')
  console.log('Logout clicked');
};

onMounted(() => {
  console.log(isSidebarCollapsed.value);
  window.addEventListener('load', () => {
    if (window.innerWidth < 1024) {
      isSidebarCollapsed.value = true;
      console.log(isSidebarCollapsed.value);
    } else {
      isSidebarCollapsed.value = false;
      console.log(isSidebarCollapsed.value);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      isSidebarCollapsed.value = true;
      console.log(isSidebarCollapsed.value);
    } else {
      isSidebarCollapsed.value = true;
      console.log(isSidebarCollapsed.value);
    }
  });
})
</script>

<style scoped>
.router-link-exact-active {
  color: #101d6a;
  background-color: #eef2ff;
}
</style>
