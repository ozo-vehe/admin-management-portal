<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref, type Ref } from 'vue';
import CancelReasonModal from '@/components/CancelReasonModal.vue';
import ApproveBookingModal from '@/components/ApproveBookingModal.vue';
import type { BookingData } from '../..//interface/booking';
import { useBookingStore } from '@/stores/booking';
import { storeToRefs } from 'pinia';


// Store and Route
const booking_store = useBookingStore();
const { confirmBooking } = booking_store;
const { bookings } = storeToRefs(booking_store);
const route = useRoute();
const date_bookings: Ref<BookingData[]> = ref<BookingData[]>([]);

// Date Formatting
// const formattedDate = computed(() => {
//   const date = new Date(route.params.date as string);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// });

// Status Colors
const statusColors: Record<string, string> = {
  pending: 'bg-[#ed5f00] text-white',
  approved: 'bg-[#44ad6c] text-white',
  cancelled: 'bg-[#e32a4c] text-white',
};

// Modal State
const showCancelModal = ref(false);
const showApproveModal: Ref<boolean> = ref(false);
const selectedBookingIndex = ref<number | null>(null);
const cancelReason = ref('');
const isLoading = ref(false);

const active_booking: Ref<BookingData> = ref({
  agency_name: '',
  id: '',
  command: '',
  bl_number: '',
  invoice_number: '',
  container_number: [],
  day: '',
  status: '',
  phone: '',
  session_id: '',
});

// Status Handling
const handleStatusChange = (index: number, newStatus: string, booking: BookingData) => {
  const globalIndex = index + (currentPage.value - 1) * itemsPerPage;
  if (newStatus === 'cancelled') {
    active_booking.value = booking;
    selectedBookingIndex.value = globalIndex;
    showCancelModal.value = true;
  }
  else if (newStatus === 'approved') {
    active_booking.value = booking;
    selectedBookingIndex.value = globalIndex;
    showApproveModal.value = true;
  }
  else {
    date_bookings.value[globalIndex].status = newStatus as BookingData['status'];
  }
};

const handleModalCancel = () => {
  showCancelModal.value = false;
  selectedBookingIndex.value = null;
};

// Pagination
const itemsPerPage = 7;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(date_bookings.value.length / itemsPerPage));
// const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1));

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return date_bookings.value.slice(start, start + itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toLowerCase();
};


onBeforeMount(async () => {
  const date = route.params.date as string;
  if (bookings.value.length < 0) {
    await booking_store.fetchAllBookings();
  }

  date_bookings.value = bookings.value.filter((booking: BookingData) => {
    return booking.day === date;
  })

})

</script>

<template>
  <main class="py-5 lg:px-10 md:px-5 px-4 w-full">
    <h2 class="text-[22px] uppercase font-[700] mb-12 text-gray-900">
      booking calendar / {{ formatDate($route.params.date as string) }}
    </h2>

    <!-- BookingData Details -->
    <div class="bookings_container flex flex-col items-center justify-between min-h-[81vh]">

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-gray-600">Loading bookings...</p>
      </div>

      <!-- Table for Desktop -->
      <div v-else class="overflow-x-auto w-full">
        <table class="min-w-full text-left bg-white shadow-sm rounded-lg">
          <thead class="text-gray-900">
            <tr>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">SN</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Name</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Phone No.</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">BL No.</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Container No.</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Receipt No.</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Date Requested</th>
              <th class="whitespace-nowrap py-4 px-3 sm:px-4 text-base font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in paginatedBookings" :key="entry.id"
              class="border-t hover:bg-gray-50 text-gray-700">
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">{{ entry.agency_name }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">{{ entry.phone }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4 uppercase">{{ entry.bl_number }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">{{ entry.container_number[0] }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">{{ entry.invoice_number }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4 capitalize">{{ formatDate(entry.day) }}</td>
              <td class="whitespace-nowrap py-5 px-3 sm:px-4">
                <div class="relative inline-block w-[130px]">
                  <select :value="entry.status"
                    @change="handleStatusChange(index, ($event.target as HTMLSelectElement).value, entry)"
                    class="appearance-none w-full px-4 py-2 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 capitalize cursor-pointer"
                    :class="statusColors[entry.status]" aria-label="BookingData status">
                    <option value="pending" class="bg-white text-gray-900">Pending</option>
                    <option value="approved" class="bg-white text-gray-900">Approved</option>
                    <option value="cancelled" class="bg-white text-gray-900">Cancelled</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="!isLoading && totalPages > 1" class="flex items-center justify-center gap-4 mt-6">
        <!-- Previous button -->
        <button @click="prevPage" :disabled="currentPage === 1"
          class="left_arrow border w-8 h-8 rounded-full p-2 disabled:opacity-50" type="button"
          aria-label="Previous page">
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/long-arrow-left.png"
            alt="long-arrow-left" />
        </button>
        <!-- Current page -->
        <span class="text-gray-900 font-medium">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <!-- Next button -->
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="right_arrow border w-8 h-8 rounded-full p-2 disabled:opacity-50" type="button" aria-label="Next page">
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/long-arrow-right.png"
            alt="long-arrow-right" />
        </button>
      </div>
    </div>

    <!-- Cancel Reason Modal -->
    <CancelReasonModal :visible="showCancelModal" :booking="active_booking"
      @cancel="handleModalCancel" @update:visible="showCancelModal = $event" />

    <ApproveBookingModal :booking="active_booking" :visible="showApproveModal" @cancel="handleModalCancel"
      @update:visible="showApproveModal = $event" />
  </main>
</template>
