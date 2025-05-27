<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useBookingStore } from './stores/booking';
import { onMounted } from 'vue';

const booking_store = useBookingStore();
const { fetchAllBookings } = booking_store;

onMounted(async () => {
  console.log('Fetching bookings...');
  await fetchAllBookings();
  console.log('Bookings fetched');
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
