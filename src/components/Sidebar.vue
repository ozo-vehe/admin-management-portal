<template>
  <div class="w-72 bg-white h-screen flex flex-col shadow-md">
    <div class="p-4 border-b">
      <img src="/images/logomark.png" alt="EFL Logo" class="h-8" />
    </div>

    <nav class="flex-1 py-4">
      <router-link
        to="/"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        active-class="bg-blue-50 text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span> -->
        Booking Calendar
      </router-link>
      <router-link
        to="/booking-aid"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        active-class="bg-blue-50 text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span> -->
        Booking Aid
      </router-link>

      <router-link
        to="/requests"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        active-class="bg-blue-50 text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </span> -->
        Requests
      </router-link>

      <router-link
        to="/downloads"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        active-class="bg-blue-50 text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </span> -->
        Downloads
      </router-link>

      <router-link
        to="/logout"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </span> -->
        Log Out
      </router-link>
    </nav>

    <div class="mt-auto border-t">
      <router-link
        to="/website"
        class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      >
        <!-- <span class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </span> -->
        Back to Website
      </router-link>

      <div class="px-6 py-4 text-sm text-gray-600">
        <div>Welcome back</div>
        <div class="font-semibold">Johnathan</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Sidebar",
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>
