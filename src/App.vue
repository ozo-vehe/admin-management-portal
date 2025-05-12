<template>
  <div class="flex w-full h-screen overflow-hidden bg-white">
    <Sidebar />

    <main class="flex-1 overflow-y-auto h-full">
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  }
});
</script>
