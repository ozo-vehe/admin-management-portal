<template>
  <main class="flex min-h-screen">
    <Sidebar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { onBeforeMount } from 'vue';
import { useSupportStore } from '@/stores/support';

const support_store = useSupportStore();
const {getSupport} = support_store;

onBeforeMount(async() => {
  await getSupport();
})
</script>

<style scoped></style>
