<template>
  <div class="flex text-black">
    <div class="flex-1 p-6 space-y-6">
      <h1 class="text-2xl font-bold mb-12">Booking Aid</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <DatePicker
            v-model="selectedDate"
            :inline="true"
            width="100%"
            
            class="rounded-lg shadow border w-full"
          />
          <div class="mt-4 text-sm text-gray-600">
            <p class="font-semibold">DATE PICKED</p>
            <p class="text-blue-700">{{ formattedDate }}</p>
          </div>

          <div class="mt-6 space-y-2">
            <p class="font-semibold text-sm">SLOTS AVAILABLE</p>
            <div class="flex items-center justify-between text-xs">
              <span>APAPA</span>
              <span class="text-green-500">{{ slots.apapa }}</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="bg-green-500 h-2 rounded" :style="{ width: `${slots.apapa * 5}%` }"></div>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span>TINCAN</span>
              <span class="text-red-500">{{ slots.tincan }}</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="bg-red-500 h-2 rounded" :style="{ width: `${slots.tincan * 5}%` }"></div>
            </div>
          </div>
        </div>

        <div class="col-span-1 md:col-span-1">
          <input
            v-model="blNumber"
            placeholder="Enter BL Number"
            class="w-full p-2 border rounded mb-4"
          />

          <div class="border rounded p-4 h-[350px] overflow-y-auto">
            <div v-if="!blNumber" class="text-center text-gray-400">No BL Number Added</div>
            <div v-else>
              <div class="flex items-center mb-2">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                <label class="ml-2 text-sm font-medium">Select All</label>
              </div>
              <div v-for="(container, i) in containers" :key="i" class="flex items-center mb-2">
                <input
                  type="checkbox"
                  v-model="selectedContainers"
                  :value="container"
                  class="mr-2"
                />
                <span class="text-sm">{{ container }}</span>
              </div>
            </div>
          </div>

          <div class="mt-2 flex gap-4 justify-center items-center text-lg">
            <button class="text-gray-400 text-lg py-1 px-3 border rounded-full">&larr;</button>
            <span>1/19</span>
            <button class="text-gray-400 text-lg py-1 px-3 border rounded-full">&rarr;</button>
          </div>
        </div>

        <div class="space-y-4">
          <select v-model="selectedCommand" class="w-full p-2 border rounded">
            <option value="">Select Command</option>
            <option value="Apapa">Apapa</option>
            <option value="Tincan">Tincan</option>
          </select>

          <input type="text" v-model="form.name" placeholder="Name" class="w-full p-2 border rounded" />
          <input type="text" v-model="form.phone" placeholder="Phone Number" class="w-full p-2 border rounded" />
          <input type="email" v-model="form.email" placeholder="Email Address" class="w-full p-2 border rounded" />
          <div class="flex gap-2">
            <input
              type="text"
              v-model="form.receipt"
              placeholder="Receipt Number"
              class="flex-1 p-2 border rounded"
            />
            <button class="p-2 border rounded bg-gray-100">📎</button>
            <button class="p-2 border rounded bg-gray-100">👁️</button>
          </div>

          <button
            @click="submitBooking"
            class="w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Request For Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DatePicker from '@vuepic/vue-datepicker'
import { ref, computed } from 'vue'

const selectedDate = ref(new Date())
const formattedDate = computed(() =>
  selectedDate.value.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const blNumber = ref('')
const containers = ref(['CONT0123456', 'CONT0123456', 'CONT0123456', 'CONT0123456', 'CONT0123456'])
const selectedContainers = ref([])
const selectAll = ref(false)

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedContainers.value = [...containers.value]
  } else {
    selectedContainers.value = []
  }
}

const selectedCommand = ref('')
const form = ref({
  name: 'Funke Durojaiye',
  phone: '+234 701 851 0980',
  email: 'email@yandex.com',
  receipt: ''
})

const slots = ref({
  apapa: 15,
  tincan: 3
})

const submitBooking = () => {
  alert('Booking submitted!')
}
</script>

<style scoped>

</style>
