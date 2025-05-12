<template>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-800">BOOKING CALENDAR</h1>
      </div>
      <BookingCalender />
    </div>
  </template>
  
  <script>
  import BookingCalender from '../components/BookingCalender.vue';
  
  export default {
    name: 'BookingCalendarPage',
    components: {
      BookingCalender
    }
  }
  </script>