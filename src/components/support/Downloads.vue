<template>
  <main class="downloads py-5 lg:px-10 md:px-5 px-4 w-full">
    <div class="mb-12 flex items-center justify-between">
      <h1 class="text-[22px] font-[700] uppercase">booking downloads</h1>
    </div>

    <h2 class="text-base font-semibold">01/ New Download</h2>
    <hr class="my-2 border-gray-300" />

    <div class="flex flex-wrap lg:flex-row gap-8 justify-center items-start mt-6">
      <div class="flex flex-col items-center w-[300px] h-[400px]">
        <label class="text-base font-semibold mb-2">Select Date</label>
        <vue-cal class="calendar border border-gray-200" view="month" :views-bar="false" :today-button="false"
          date-picker />
      </div>

      <div class="flex flex-col gap-4">
        <label class="text-base font-[700]">Select Filter</label>
        <div class="flex flex-col border border-gray-200 rounded-[8px] overflow-hidden w-48">
          <button v-for="option in filterOptions" :key="option" @click="selectedFilter = option" :class="[
            'py-2 px-4 text-left text-base border border-gray-200 hover:bg-gray-100 cursor-pointer focus:outline-none',
            selectedFilter === option ? 'bg-[#F1F1F3] font-medium' : '',
          ]">
            {{ option }}
          </button>
        </div>

        <button @click="downloadData"
          class="bg-[#3F528B] hover:bg-[#324270] cursor-pointer text-white py-2 px-4 rounded-full text-base mt-2 transition">
          Download Data
        </button>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="text-base font-semibold">02/ Download History</h2>
      <hr class="my-2 border-gray-300" />

      <div class="mt-6">
        <table class="w-full text-sm text-left">
          <thead>
            <tr>
              <th class="px-4 py-6 border-b">ID</th>
              <th class="px-4 py-6 border-b">Name</th>
              <th class="px-4 py-6 border-b">Date</th>
              <th class="px-4 py-6 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedDownloads.length === 0">
              <td colspan="4" class="px-4 py-4 text-center text-gray-500">
                No download history for selected date and filter.
              </td>
            </tr>
            <tr v-for="record in paginatedDownloads" :key="record.id" class="text-[#1E1E1E]">
              <td class="px-4 py-6 border-t border-b">{{ record.id }}</td>
              <td class="px-4 py-6 border-t border-b">{{ record.name }}</td>
              <td class="px-4 py-6 border-t border-b">{{ record.date }}</td>
              <td class="px-4 py-6 border-t border-b">{{ record.status }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center mt-6 space-x-4">
          <button class="px-4 py-2 bg-gray-200 rounded-full text-base hover:bg-gray-300" @click="prevPage"
            :disabled="currentPage === 1">
            &larr;
          </button>
          <span class="font-semibold">{{ currentPage }} / {{ totalPages }}</span>
          <button class="px-4 py-2 bg-gray-200 rounded-full text-base hover:bg-gray-300" @click="nextPage"
            :disabled="currentPage === totalPages">
            &rarr;
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { VueCal } from 'vue-cal';
import 'vue-cal/style';

const selectedDate = ref(new Date());
const selectedFilter = ref("All");
const filterOptions = ["Pending", "Approved", "Cancelled", "All"];

const downloads = ref([
  { id: 1, name: "Report A", date: "2025-05-12", status: "Approved" },
  { id: 2, name: "Report B", date: "2025-05-11", status: "Pending" },
  { id: 3, name: "Report C", date: "2025-05-12", status: "Cancelled" },
  { id: 4, name: "Report D", date: "2025-05-12", status: "Approved" },
  { id: 5, name: "Report E", date: "2025-05-12", status: "Approved" },
  { id: 6, name: "Report F", date: "2025-05-12", status: "Approved" },
  { id: 7, name: "Report G", date: "2025-05-12", status: "Pending" },
  { id: 8, name: "Report H", date: "2025-05-12", status: "Pending" },
]);

const formattedSelectedDate = computed(
  () => selectedDate.value.toISOString().split("T")[0]
);

const currentPage = ref(1);
const itemsPerPage = 6;

const filteredDownloads = computed(() => {
  return downloads.value.filter((item) => {
    const matchesDate = item.date === formattedSelectedDate.value;
    const matchesFilter =
      selectedFilter.value === "All" || item.status === selectedFilter.value;
    return matchesDate && matchesFilter;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredDownloads.value.length / itemsPerPage) || 1;
});

const paginatedDownloads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredDownloads.value.slice(start, end);
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function downloadData() {
  console.log(
    "Downloading data for:",
    selectedDate.value,
    "with filter:",
    selectedFilter.value
  );
  alert(
    "Data download started for " +
    formattedSelectedDate.value +
    " with filter: " +
    selectedFilter.value
  );
}
</script>

<style scoped>
.calendar {
  width: 100%;
  height: 100%;
}
</style>
