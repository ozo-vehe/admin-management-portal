<template>
  <main class="bookings lg:px-10 md:px-5 px-4 py-5 w-full">
    <h1 class="text-[22px] font-[700] uppercase">
      Booking calendar
    </h1>

    <div class="mt-4 mx-auto">

      <div v-if="loading" class="loading"> Loading bookings, please wait...</div>

      <!-- Bookings -->
      <div v-else class="calendar_container w-full lg:h-[80vh] md:h-[80vh] h-fit flex items-center justify-center">
        <vue-cal ref="vuecal" class="calendar" xs view="month" :views="['']" :today-button="false" :views-bar="false"
          :title-bar="false" :time="false" :events="events" events-on-month-view @cell-click="handleEventClick">
          <!-- Custom Month Header -->
          <template #header="{ view }">
            <div
              class="custom-header flex items-center justify-between bg-white text-black py-4 border-b border-gray-300">
              <h2 class="font-[600]">{{ view.title }}</h2>
              <div class="view_buttons flex items-center gap-4">
                <!-- Previous button -->
                <button @click="handlePrevious" class="left_arrow border w-8 h-8 rounded-full p-2" type="button"
                  aria-label="left arrow button">
                  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/long-arrow-left.png"
                    alt="long-arrow-left" />
                </button>

                <!-- Next button -->
                <button @click="handleNext" class="right_arrow border w-8 h-8 rounded-full p-2" type="button"
                  aria-label="right arrow button">
                  <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/long-arrow-right.png"
                    alt="long-arrow-right" />
                </button>
              </div>
            </div>
          </template>

          <!-- Custom Weekday Heading -->
          <template #weekday-heading="{ label, id }">
            <p class="my-2 uppercase">{{ id }}</p>
          </template>

          <!-- Custom Cell -->
          <template #cell="{ cell }">
            <div class="custom-cell">
              <div class="date">{{ formatDate(cell.start) }}</div>
              <p :class="formatEvent(cell.events) === 0 ? 'hidden' : 'bg-green-500'"
                class="lg:w-[120px] flex flex-wrap gap-2 min-w-[35px] lg:text-left text-center text-white py-1 px-2 mt-2 rounded-md cursor-pointer">
                {{ formatEvent(cell.events) === 0 ? ''
                  : formatEvent(cell.events) }} <span class="lg:block md:block hidden">entries</span></p>
            </div>
          </template>
        </vue-cal>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTemplateRef, type Ref, ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking';
import { formatDate } from '@/utils/formatDate';
import { VueCal } from 'vue-cal';
import "vue-cal/style"


// Refs/Variables
const vuecal = useTemplateRef('vuecal');
const events: Ref<any[]> = ref([]);
const booking_store = useBookingStore();
const loading: Ref<boolean> = ref(false);

const router = useRouter();

const { bookings } = storeToRefs(booking_store);

// Functions
const formatEvent = (events: any[]) => {
  // @ts-ignore
  return events.value.length > 0 ? `${events.value.length}` : 0;
}

const getRandomColor = () => {
  const colors = ['bg-[#b6c1ca]', 'bg-[#00a81c]', 'bg-[#db6e00]'];
  return colors[Math.floor(Math.random() * colors.length)];
};


const handlePrevious = () => {
  // @ts-ignore
  vuecal.value?.view.previous()
};

const handleNext = () => {
  // @ts-ignore
  vuecal.value?.view.next()
};

const handleEventClick = (event: any) => {
  const cell_date = event.cell.start;

  const parsedDate = new Date(cell_date);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();
  const date = `${year}-${month}-${day}`;

  router.push({ name: 'support-calendar-request', params: { date } });
}

onBeforeMount(async () => {
  loading.value = true;
  await booking_store.fetchAllBookings();
  bookings.value.forEach((booking: any) => {
    events.value.push({
      start: `${booking.day} 12:00`,
      end: `${booking.day} 12:00`,
      title: booking.id,
      content: booking.blNumber
    })
  })
  loading.value = false;
})
</script>

<style scoped>
.calendar {
  width: 100% !important;
  height: 100% !important;
}

.vuecal__event {
  color: #fff;
  border: 1px solid;
}
</style>
