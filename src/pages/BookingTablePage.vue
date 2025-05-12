<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import CancelReasonModal from '../components/CancelReasonModal.vue'

const route = useRoute()

const formattedDate = computed(() => {
  const date = new Date(route.params.date as string)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const bookings = reactive([
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Pending',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Approved',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Cancelled',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Pending',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Approved',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Cancelled',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Pending',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Approved',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Cancelled',
  },
  {
    name: 'Obansa',
    phone: '09122222225',
    bl: 'HKA2347699',
    container: 'TCLUT7369090',
    receipt: 'RED-3901',
    date: 'February 25, 2025',
    status: 'Pending',
  },
])

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-300 text-yellow-800',
  Approved: 'bg-green-400 text-white',
  Cancelled: 'bg-red-400 text-white',
}

const showCancelModal = ref(false)
const selectedBookingIndex = ref<number | null>(null)
const cancelReason = ref('')

function handleStatusChange(index: number, newStatus: string) {
  console.log(`Status for booking #${index + 1} changed to ${newStatus}`)
  if (newStatus === 'Cancelled') {
    selectedBookingIndex.value = index + (currentPage.value - 1) * itemsPerPage
    showCancelModal.value = true
  }
}

function handleModalSubmit(reason: string) {
  if (selectedBookingIndex.value !== null) {
    cancelReason.value = reason
    const booking = bookings[selectedBookingIndex.value]
    console.log(`Cancelled booking:`, booking)
    console.log(`Reason: ${reason}`)
    selectedBookingIndex.value = null
  }
}

function handleModalCancel() {
  if (selectedBookingIndex.value !== null) {
    bookings[selectedBookingIndex.value].status = 'Pending'
  }
  selectedBookingIndex.value = null
}

const itemsPerPage = 7
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(bookings.length / itemsPerPage))

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return bookings.slice(start, end)
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page: number) {
  currentPage.value = page
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4 text-black">
      Booking Calendar / {{ formattedDate }}
    </h2>
    <table class="min-w-full border text-sm text-left">
      <thead class="bg-gray-100 text-black">
        <tr>
          <th class="py-6 px-4 text-base">SN</th>
          <th class="py-6 px-4 text-base">Name</th>
          <th class="py-6 px-4 text-base">Phone No.</th>
          <th class="py-6 px-4 text-base">BL No.</th>
          <th class="py-6 px-4 text-base">Container No.</th>
          <th class="py-6 px-4 text-base">Receipt No.</th>
          <th class="py-6 px-4 text-base">Date Requested</th>
          <th class="py-6 px-4 text-base">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in paginatedBookings"
          :key="index"
          class="border-t hover:bg-gray-50 text-gray-600"
        >
          <td class="py-6 px-4 text-sm">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.name }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.phone }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.bl }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.container }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.receipt }}</td>
          <td class="py-6 px-4 text-sm">{{ entry.date }}</td>
          <td class="py-6 px-4 text-sm">
            <select
              v-model="entry.status"
              @change="handleStatusChange(index, entry.status)"
              class="text-xs font-semibold px-2 py-1 rounded-full focus:outline-none"
              :class="statusColors[entry.status]"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-center gap-4 mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        &larr;
      </button>

      <div class="">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 rounded cursor-pointer',
            page === currentPage ? 'text-black font-bold' : ' text-gray-700 hover:bg-gray-300',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
       &rarr;
      </button>
    </div>

    <CancelReasonModal
      :visible="showCancelModal"
      :reason="cancelReason"
      @submit="handleModalSubmit"
      @cancel="handleModalCancel"
      @update:visible="(val) => (showCancelModal = val)"
    />
  </div>
</template>
