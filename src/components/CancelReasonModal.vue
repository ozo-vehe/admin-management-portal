<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-md w-[500px] p-6">
      <h3 class="font-semibold text-gray-800 mb-2">Reason for Cancelling</h3>
      <textarea v-model="reason" placeholder="Write Message (Excess container number)"
        class="w-full h-32 border border-gray-300 rounded-lg p-2 resize-none text-black"></textarea>
      <div class="flex justify-start mt-4 space-x-2">
        <button @click="onSubmit" class="bg-[#2C3E50] text-white px-4 py-2 rounded-lg flex items-center justify-center min-w-[80px]"
        >
          <span v-if="loading" class="block w-4 h-4 border-x border-white rounded-full animate-spin"></span>
          <span v-else>Yes</span>
        </button>
        <button @click="onCancel" class="border border-red-500 text-red-500 px-4 py-2 rounded-lg min-w-[80px]">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useBookingStore } from '@/stores/booking';
import SuccessComponent from './modal/SuccessComponent.vue';
import ErrorComponent from './modal/ErrorComponent.vue';
import { useToast } from 'vue-toastification';
import type { BookingData } from '@/interface/booking';

const booking_store = useBookingStore()
const { cancelBooking } = booking_store;
const toast = useToast();
const reason: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

const props = defineProps<{
  visible: boolean
  booking: BookingData
}>()

const emit = defineEmits(['update:visible', 'cancel'])

const onSubmit = async () => {
  // Handle the submission logic here
  if (!reason) {
    toast.error({
      component: ErrorComponent,
      props: {
        content: 'Please provide a reason for cancellation'
      }
    })
    return;
  }
  try {
    loading.value = true;
    const response = await cancelBooking(props.booking.id, reason.value);
    if (response.code >= 200 && response.code < 300) {
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
  } catch (error) {
    toast.error({
      component: ErrorComponent,
      props: {
        content: 'Error cancelling booking'
      }
    })
  }
  // emit('update:visible', false)
}

function onCancel() {
  emit('cancel')
  emit('update:visible', false)
}
</script>
