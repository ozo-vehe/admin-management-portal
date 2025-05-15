<template>
  <div class="p-6">
    <div class="max-w-5xl w-full bg-white rounded-lg shadow">
      <v-calendar
        expanded
        title-position="left"
        :attributes="calendarAttributes"
        :min-date="minDate"
        :max-date="maxDate"
        :from-page.sync="page"
        @dayclick="handleDayClick"
        class="w-full my-calendar"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'

const router = useRouter()
const page = ref({ month: 1, year: 2025 })
const minDate = new Date(2025, 1, 1)
const maxDate = new Date(2025, 1, 29)

const entries = [
  { date: '2025-02-08', count: 9, color: '#D1D5DB' }, 
  { date: '2025-02-11', count: 9, color: '#D1D5DB' },
  { date: '2025-02-21', count: 9, color: '#22C55E' }, 
  { date: '2025-02-24', count: 9, color: '#F97316' }, 
  { date: '2025-02-28', count: 9, color: '#F97316' },
]

const calendarAttributes = computed(() =>
  entries.map(entry => ({
    key: entry.date,
    dates: new Date(entry.date),
    customData: { date: entry.date, count: entry.count },
    popover: {
      label: `${entry.count} entries`,
    },
    content: {
      style: {
        backgroundColor: entry.color,
        color: 'white',
        padding: '4px 6px',
        borderRadius: '6px',
        fontSize: '12px',
        textAlign: 'center',
        width: '100%',
        marginTop: '4px',
      },
      content: `${entry.count} entries`,
    },
  }))
)

function handleDayClick({ date }: { date: Date }) {
  const clicked = entries.find(e => e.date === format(date, 'yyyy-MM-dd'))
  if (clicked) {
    router.push({ name: 'BookingTable', params: { date: clicked.date } })
  }
}
</script>

<style scoped>
.my-calendar .vc-pane {
  border: 1px solid #e5e7eb; 
}

.my-calendar .vc-day {
  border: 1px solid #e5e7eb;
  height: 100px;
  position: relative;
}

.my-calendar .vc-day-content {
  justify-content: flex-start;
  padding: 6px;
  font-weight: 500;
}

.my-calendar .vc-day-content.vc-focus {
  border: 2px solid #2563eb !important;
  border-radius: 6px;
}

.my-calendar .vc-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.my-calendar .vc-weekday {
  font-weight: 500;
  color: #6b7280; 
  font-size: 14px;
}

.my-calendar .vc-arrows button {
  background-color: #0755f1;
  border-radius: 50%;
  padding: 6px;
  transition: background 0.2s ease;
}

.my-calendar .vc-arrows button:hover {
  background-color: #e5e7eb; 
}
</style>
