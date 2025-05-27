<template>
  <main class="p-4 mb-4 rounded-lg bg-black" role="alert">
    <div class="modal_header text-sm font-normal text-green-700 dark:text-green-200 flex items-center gap-2">
      <h3 class="uppercase text-[16px] font-[600]">success</h3>
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-900/60 p-1 rounded-full dark:bg-green-800 dark:text-green-200">
        <img src="https://img.icons8.com/ios-filled/016630/50/checkmark--v1.png" alt="checkmark--v1" />
      </div>
    </div>
    <div class="modal_content">
      <p class="text-white text-[16px] mt-2">{{ content }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
defineEmits(['close'])
defineProps({
  content: {
    type: String,
    default: 'Success'
  }
})
</script>
