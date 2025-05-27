<template>
  <div
    v-if="props.visible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-md w-[500px] p-6">
      <h3 class="font-semibold text-gray-800 mb-2">Do you want to approve this booking request?</h3>
      <div class="flex justify-start mt-4 space-x-2">
        <button
          @click="onSubmit"
          class="bg-[#2C3E50] text-white px-4 py-2 rounded-lg min-w-[100px] text-center flex items-center justify-center"
        >
          <span v-if="loading" class="block w-4 h-4 border-x border-white rounded-full animate-spin"></span>
          <span v-else>Yes</span>
        </button>
        <button
          @click="onCancel"
          class="border border-red-500 text-red-500 px-4 py-2 rounded-lg min-w-[100px] text-center"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingData } from '@/interface/booking';
import { useBookingStore } from '@/stores/booking';
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';
import SuccessComponent from './modal/SuccessComponent.vue';
import ErrorComponent from './modal/ErrorComponent.vue';

const loading:Ref<boolean> = ref(false);
const booking_store = useBookingStore();
const { confirmBooking } = booking_store;
const toast = useToast();

// import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean,
  booking: BookingData
}>()

const emit = defineEmits(['update:visible', 'cancel'])

const onSubmit = async() => {
  console.log(props.booking)
  if(props.booking.id) {
    try {
      loading.value = true
      console.log("Confirming");
      const response = await confirmBooking(props.booking.id)
      console.log(response);
      if(response.code >= 200 && response.code < 300) {
        toast.success({
          component: SuccessComponent,
          props: {
            content: response.message
          }
        })
      } else {
        toast.error({
          component: ErrorComponent,
          props: {
            content: response.message
          }
        })
      }
      loading.value = false;
      emit('update:visible', false)
    } catch (error) {
      console.log(error);
    }
  }
}

function onCancel() {
  emit('cancel')
  emit('update:visible', false)
}
</script>
