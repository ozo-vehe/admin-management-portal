<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-md w-[500px] p-6">
      <h3 class="font-semibold text-gray-800 mb-2">Reason for Cancelling</h3>
      <textarea
        v-model="localReason"
        placeholder="Write Message (Excess container number)"
        class="w-full h-32 border border-gray-300 rounded-lg p-2 resize-none text-black"
      ></textarea>
      <div class="flex justify-start mt-4 space-x-2">
        <button
          @click="onSubmit"
          class="bg-[#2C3E50] text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
        <button
          @click="onCancel"
          class="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  visible: boolean
  reason: string
}>()

const emit = defineEmits(['update:visible', 'submit', 'cancel'])

const localReason = ref(props.reason)

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      localReason.value = props.reason
    }
  }
)

function onSubmit() {
  emit('submit', localReason.value)
  emit('update:visible', false)
}

function onCancel() {
  emit('cancel')
  emit('update:visible', false)
}
</script>
