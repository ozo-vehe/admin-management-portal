<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        February 2025
      </h1>
      <div class="flex space-x-2">
        <button class="p-2 rounded-full bg-red-400 hover:bg-gray-200">
          <ChevronLeft class="h-5 w-5" />
        </button>
        <button class="p-2 rounded-full bg-red-400 hover:bg-gray-200">
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7 text-center text-lg">
      <div v-for="day in days" :key="day.date" class="border border-gray-600 p-2 relative">
        <div class="font-medium text-black">{{ day.date }}</div>
        <div
          v-if="day.entries"
          :class="[
            'mt-2 px-2 py-1 rounded text-white text-xs cursor-pointer',
            day.entriesColor,
          ]"
          @click="goToDate(day.fullDate)"
        >
          {{ day.entries }} entries
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const router = useRouter()

const goToDate = (date: string) => {
  router.push({ name: 'BookingTable', params: { date } })
}

const days = [
  { date: '21', fullDate: '2025-02-21', entries: 9, entriesColor: 'bg-green-600' },
  { date: '24', fullDate: '2025-02-24', entries: 9, entriesColor: 'bg-orange-500' },
  { date: '28', fullDate: '2025-02-28', entries: 9, entriesColor: 'bg-orange-500' },
]
</script>
