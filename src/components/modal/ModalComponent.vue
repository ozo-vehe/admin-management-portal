<template>
  <div class="fixed inset-0 bg-none flex items-center justify-center bg-white/90 lg:px-10 md:px-5 px-4 z-50">
    <div class="bg-white rounded-lg shadow-xl lg:w-[500px] md:w-[500px] w-full border border-gray-200">
      <!-- Header -->
      <div class="flex items-center justify-start p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900">Confirm Logout</h3>
      </div>

      <!-- Content -->
      <div class="p-6">
        <p>
          Are you sure you want to logout of the EFL Booking System? Any unsaved changes will be lost.
        </p>
      </div>

      <!-- Footer -->
      <div class="flex justify-start gap-4 p-4 border-t border-gray-200">
        <button type="button" aria-label="Cancel button" @click="$emit('close')"
          class="px-4 py-3 text-white min-w-[111px] border bg-efl-blue-80 rounded-full">
          Cancel
        </button>
        <button type="button" aria-label="Logout button" @click="$emit('logout')"
          class="px-4 py-3 text-efl-blue-80 min-w-[111px] border border-efl-blue-80 rounded-full">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close', 'logout'])
</script>
