<template>
  <!-- Invoice -->
  <main v-show="show_invoice"
    class="flex flex-wrap gap-1 max-w-[1440px] mx-auto items-start w-full min-h-screen lg:px-10 md:px-5 px-4 py-10">
    <button @click="hideInvoice" type="button" aria-label="Back button"
      class="back_arrow border bg-efl-blue-base rounded-full w-[50px] h-[50px] p-3 flex items-center justify-center cursor-pointer">
      <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/ffffff/30/long-arrow-left.png"
        alt="long-arrow-left" />
    </button>

    <div class="invoice_container w-[750px] mx-auto">
      <div
        class="invoice border lg:px-10 md:px-5 px-4 rounded-[24px] border-gray-300 lg:w-[750px] md:w-[600px] w-full mx-auto py-4 bg-white">
        <div class="invoice_header flex items-center justify-between py-5 border-b border-gray-200">
          <h2 class="text-[22px] font-[700]">Invoice</h2>
          <div class="header_button flex gap-2">
            <button type="button" aria-label="Download button"
              class="bg-efl-blue-80 px-5 py-2 rounded-[100px] text-white"
              @click="() => downloadInvoice(invoice.invoice_number)">Download</button>
            <button type="button" aria-label="Print button"
              class="border border-efl-blue-80 px-5 py-2 rounded-[100px] text-efl-blue-base">Print</button>
          </div>
        </div>

        <div class="invoice_content">
          <div class="invoice_identification py-5">
            <h3 class="font-[700]">Invoice Identification</h3>
            <div class="invoice_identification_details mt-4 flex flex-col gap-1 border-b border-dashed pb-5">
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Invoice number</span>
                <span>{{ invoice.invoice_number }}</span>
              </p>

              <p class="flex flex-wrap gap-2 justify-between">
                <span>Receipt number</span>
                <span>{{ invoice.receipt_number }}</span>
              </p>

              <p class="flex flex-wrap gap-2 justify-between">
                <span>BL number</span>
                <span>{{ invoice.bl_number }}</span>
              </p>
            </div>
          </div>

          <div class="customer_information py-5">
            <h3 class="font-[700]">Customer Information</h3>
            <div class="customer_information_details mt-4 flex flex-col gap-1 border-b border-dashed pb-5">
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Customer</span>
                <span>{{ invoice.customer_name }}</span>
              </p>
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Payee name</span>
                <span>{{ invoice.payee_name }}</span>
              </p>
            </div>
          </div>

          <div class="payment_details py-5">
            <h3 class="font-[700]">Payment Details</h3>
            <div class="payment_details_details mt-4 flex flex-col gap-1 border-b border-dashed pb-5">
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Currency</span>
                <span>{{ invoice.currency }}</span>
              </p>
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Invoice value</span>
                <span>{{ invoice.invoice_value }}</span>
              </p>
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Payment date</span>
                <span>{{ invoice.payment_date }}</span>
              </p>
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Reference number</span>
                <span>{{ invoice.reference_number }}</span>
              </p>
            </div>
          </div>

          <div class="status_information py-5">
            <h3 class="font-[700]">Status Information</h3>
            <div class="status_information_details mt-4 flex flex-col gap-1 border-b border-dashed pb-5">
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Validity</span>
                <span>{{ invoice.validity }}</span>
              </p>
            </div>
          </div>

          <div class="issue_details py-5">
            <h3 class="font-[700]">ISSUE DETAILS</h3>
            <div class="issue_details_details mt-4 flex flex-col gap-1 pb-5">
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Date</span>
                <span>{{ invoice.date }}</span>
              </p>
              <p class="flex flex-wrap gap-2 justify-between">
                <span>Time</span>
                <span>{{ invoice.time }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="invoice_footer flex justify-center mt-6 mb-12">
          <img class="w-[70px]" src="../../assets/logo.png" alt="Logo">
        </div>
      </div>
    </div>
  </main>

  <main v-if="!show_invoice" class="w-full min-h-screen lg:px-10 md:px-5 px-4 py-10">
    <h1 class="text-[22px] font-[700] uppercase">
      Booking aid
    </h1>
    <div v-if="!show_invoice"
      class="booking_aid flex flex-wrap gap-y-20 gap-x-10 w-full min-h-screen items-start justify-start py-10">

      <!-- Calendar -->
      <div class="relative vue_cal vuecal--date-picker h-fit lg:w-[300px] md:w-[300px] w-full">
        <h2 class="text-efl-blue-base font-[600] text-[18px] mb-8">Select Booking Date</h2>
        <vue-cal class="calendar border border-gray-200" view="month" :views-bar="false" :today-button="false"
          date-picker @cell-click="handleDayClick" />
        <p class="absolute top-20 w-[55%] left-[50%] -translate-x-[50%] h-[40px] bg-white opacity-0"></p>

        <div class="picked_date_container mt-6 flex flex-col gap-5">
          <!-- Date picked -->
          <div class="picked_date">
            <h3 class="uppercase font-[700] text-sm">date picked</h3>
            <p class="uppercase text-sm font-[400]">{{ displayed_date }}</p>
          </div>

          <!-- Slots available -->
          <div class="slots_available w-full">
            <h3 class="font-[700] text-sm mb-2 flex items-center gap-1">
              <span class="uppercase">slots available</span>
            </h3>

            <!-- Apapa slots -->
            <span v-if="slots_loading"
              class="block border-2 border-dashed border-black w-5 h-5 rounded-full animate-spin"></span>
            <div v-if="!slots_loading" class="apapa_slots mb-1 font-[400] text-sm uppercase flex items-end gap-2">
              <p class="m-0 w-[20%]">Apapa</p>
              <div class="w-[70%] mb-[6px] h-2 bg-gray-200 rounded-full">
                <div class="h-full rounded-full transition-all duration-300" :class="{
                  'bg-green-500': apapa_slots >= 10,
                  'bg-yellow-500': apapa_slots < 10 && apapa_slots > 6,
                  'bg-red-500': apapa_slots <= 6
                }" :style="{ width: 100 - (apapa_slots / 15) * 100 + 2 + '%' }">
                </div>
              </div>
              <p class="text-sm font-[400] m-0 w-[5%] text-center">{{ apapa_slots }}</p>
            </div>

            <!-- Tincan slots -->
            <div v-if="!slots_loading" class="tincan_slots font-[400] my-1 text-sm uppercase flex items-end gap-2">
              <p class="m-0 w-[20%]">Tincan</p>
              <div class="w-[70%] mb-[6px] h-2 bg-gray-200 rounded-full">
                <div class="h-full rounded-full transition-all duration-300" :class="{
                  'bg-green-500': tincan_slots >= 10,
                  'bg-yellow-500': tincan_slots < 10 && tincan_slots > 6,
                  'bg-red-500': tincan_slots <= 6
                }" :style="{ width: 100 - (tincan_slots / 15) * 100 + 2 + '%' }">
                </div>
              </div>
              <p class="text-sm font-[400] m-0 w-[5%] text-center">{{ tincan_slots }}</p>
            </div>

            <!-- Kirikiri slots -->
            <div v-if="!slots_loading" class="tincan_slots font-[400] text-sm uppercase flex items-end gap-2">
              <p class="m-0 w-[20%]">Kiri-Kiri</p>
              <div class="w-[70%] mb-[6px] h-2 bg-gray-200 rounded-full">
                <div class="h-full rounded-full transition-all duration-300" :class="{
                  'bg-green-500': kirikiri_slots >= 10,
                  'bg-yellow-500': kirikiri_slots < 10 && kirikiri_slots > 6,
                  'bg-red-500': kirikiri_slots <= 6
                }" :style="{ width: 100 - (kirikiri_slots / 15) * 100 + 2 + '%' }">
                </div>
              </div>
              <p class="text-sm font-[400] m-0 w-[5%] text-center">{{ kirikiri_slots }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- BL Search -->
      <div class="bl_search lg:w-[350px] md:w-[350px] w-full">
        <h2 class="text-efl-blue-base font-[600] text-[18px] mb-8">Enter BL & Choose Containers</h2>

        <form @submit.prevent="searchForContainers" class="flex items-end gap-3">
          <div class="bl_search_bar w-full">
            <label for="bl_number" class="font-[700] text-sm flex items-center gap-1">
              BL Number
            </label>
            <input type="text" placeholder="BL0123456789"
              class="w-full border border-[#c7c8cc] outline-none rounded-md px-3 h-[45px] mt-2" required
              v-model="bl_number" />
          </div>
          <button type="submit" aria-label="Search button"
            class="bg-[#f1f1f3] flex items-center justify-center text-(--color-efl-blue-base) min-w-[110px] h-[45px] rounded-md p-3 border border-[#e3e4e8] cursor-pointer">
            <span v-if="loader"
              class="animate-spin w-5 h-5 block border-2 border-dashed border-(--color-efl-blue-base) rounded-full"></span>
            <span v-else>Search</span>
          </button>
        </form>

        <!-- BL Search result -->
        <div class="search_results border border-[#e3e4e8] rounded-[4px] mt-5 pb-5">
          <div class="min-h-[350px] flex">
            <p v-if="!containers?.containers || containers.containers.length < 1"
              class="text-[#c7c8cc] self-center text-center w-full">No BL Number Added</p>
            <div v-else class="w-full">

              <div class="container_list p-4">
                <div class="container_header flex items-center justify-between p-1 border-b border-gray-200">
                  <h3 class="text-sm font-[700] mb-2">Select All</h3>
                  <input type="checkbox" class="w-4 h-4 cursor-pointer" :checked="all_containers_selected"
                    @change="selectAllCheckboxes" />
                </div>
                <div v-for="container in paginated_containers" :key="container.id"
                  class="container-item flex justify-between items-center gap-3 px-1 py-5 border-b border-gray-200">
                  <span class="text-sm font-[400]">{{ container.container_no }}</span>
                  <input type="checkbox" :value="container.container_no" class="w-4 h-4 cursor-pointer"
                    :checked="checked_containers.includes(container.container_no)" @change="handleSingleCheckbox" />
                </div>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div class="pagination mt-4 flex items-center justify-center">
            <nav class="pagination-nav flex items-center gap-2" v-if="total_pages > 1">
              <!-- Previous Button -->
              <button @click="current_page = Math.max(1, current_page - 1)" :disabled="current_page === 1"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Previous page">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Page Numbers -->
              <div class="flex gap-1">
                <p class="items-center justify-center text-[18px]">
                  {{ current_page }} / {{ total_pages }}
                </p>
              </div>

              <!-- Next Button -->
              <button @click="current_page = Math.min(total_pages, current_page + 1)"
                :disabled="total_pages < 1 || current_page === total_pages"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Next page">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- BL Search Form -->
      <div class="bl_search_form lg:w-[350px] md:w-[350px] w-full">
        <h2 class="text-efl-blue-base font-[600] text-[18px] mb-8">Select Terminal & Confirm Details</h2>
        <div class="command_container">
          <p class="text-sm font-[700] flex items-center gap-1">
            Select Command
          </p>
          <div class="commands mt-2 flex gap-4 text-(--color-efl-blue-base)">
            <button @click="selectCommand('tincan')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': command === 'tincan' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] w-[110px] h-[45px]" type="button"
              aria-label="Tincan command button">Tincan</button>
            <button @click="selectCommand('apapa')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': command === 'apapa' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] w-[110px] h-[45px]" type="button"
              aria-label="Apapa command button">Apapa</button>
            <button @click="selectCommand('kiri-kiri')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': command === 'kiri-kiri' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] w-[110px] h-[45px]" type="button"
              aria-label="Kirikiri command button">Kiri-Kiri</button>
          </div>
        </div>
        <!-- Agent details -->
        <div class="agent_details my-5 flex flex-col gap-5">
          <div class="name">
            <label for="name" class="font-[700] text-sm">Name</label>
            <input type="text" v-model="agent_details.name"
              class="w-full border border-gray-200 rounded-md px-3 py-2 h-[45px] mt-2" required />
          </div>
          <div class="phone">
            <label for="phone" class="font-[700] text-sm">Phone Number</label>
            <input type="tel" id="phone" v-model="agent_details.phone"
              class="w-full border border-gray-200 rounded-md px-3 py-2 h-[45px] mt-2" required />
          </div>
        </div>

        <!-- Receipt Number -->
        <div class="receipt_invoice_number_container flex flex-col gap-4 mb-8">
          <!-- Receipt number -->
          <div class="receipt_number">
            <label for="receipt_number" class="font-[700] text-sm flex items-center gap-1">
              Receipt Number
            </label>
            <!-- Action Button -->
            <div class="input_container flex gap-4 items-end">
              <input type="text" :value="containers.receipt_number" placeholder="Receipt number"
                class="w-full border border-gray-200 rounded-md px-3 py-2 h-[45px] mt-2" />
              <div class="icons flex items-center justify-center gap-4 h-[45px]">

                <!-- Download Icon -->
                <button @click="downloadInvoice(containers.receipt_number)"
                  class="icon cursor-pointer h-[45px] w-[50px] rounded-[4px] flex items-center justify-center bg-(--color-efl-blue-20)/30"
                  :class="{ 'opacity-100': containers.receipt_number, 'opacity-50': !containers.receipt_number }"
                  type="button" aria-label="More details button">
                  <img class="w-6" :src="file_download_icon" alt="download" />
                </button>

                <!-- Visible Icon -->
                <button @click="hideInvoice"
                  class="icon cursor-pointer h-[45px] w-[50px] rounded-[4px] flex items-center justify-center bg-(--color-efl-blue-20)/30"
                  :class="{ 'opacity-100': containers.receipt_number, 'opacity-50': !containers.receipt_number }"
                  type="button" aria-label="More details button">
                  <img class="w-6 cursor-pointer" src="https://img.icons8.com/forma-light-sharp/101d6a/24/visible.png"
                    alt="visible" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="booking_request_button">
          <button @click.prevent="handleRequestBooking"
            class="flex items-center justify-center w-[200px] h-[45px] bg-(--color-efl-blue-base) rounded-full text-[#f1f1f7] disabled:bg-(--color-efl-blue-base)/40 cursor-pointer"
            :disabled="bl_number === '' || command === '' || booked_date === '' || checked_containers.length < 1"
            type="button" aria-label="Booking request button">
            <span v-if="request_loader"
              class="block border-2 border-dashed border-white w-5 h-5 rounded-full animate-spin"></span>
            <span v-else>Request For Booking</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { VueCal } from 'vue-cal';
import "vue-cal/style"
import { ref, onBeforeMount, type Ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import file_download_icon from '@/assets/icons/download-file.png';
import type { Booking } from '@/interface/booking';
import { getDateRange } from '@/utils/date';
import { useBookingStore } from '@/stores/booking';
import { useSupportStore } from '@/stores/support';
import { useToast } from 'vue-toastification';
import domtoimage from 'dom-to-image';
// import mixpanel from "mixpanel-browser"
import SuccessComponent from '../modal/SuccessComponent.vue'
import ErrorComponent from '../modal/ErrorComponent.vue'


// Refs/Variables
const range: Ref<string[]> = ref([]);
const current_page: Ref<number> = ref(1);
const items_per_page: Ref<number> = ref(5);
const bl_number: Ref<string> = ref('');
const checked_containers: Ref<string[]> = ref([]);
const toast = useToast();
const loader: Ref<boolean> = ref(false);
const request_loader: Ref<boolean> = ref(false);
const slots_loading: Ref<boolean> = ref(false);
const disabled_days_arr: Ref<string[]> = ref([]);
const booked_date: Ref<string> = ref('');
const displayed_date: Ref<string> = ref('');
const apapa_slots: Ref<number> = ref(0);
const tincan_slots: Ref<number> = ref(0);
const kirikiri_slots: Ref<number> = ref(0);
const command: Ref<string> = ref('');
const show_invoice: Ref<boolean> = ref(false);
const booking_details: Ref<Booking> = ref({
  command: '',
  agency_name: '',
  phone: '',
  bl_number: '',
  container_number: [],
  invoice_number: '',
  day: '',
});
const agent_details: Ref<{ name: string; phone: string }> = ref({
  name: '',
  phone: '',
});


// Pinia Store
const booking_store = useBookingStore();
const support_store = useSupportStore();
const { available_slots, containers, invoice } = storeToRefs(booking_store);
const { agent } = storeToRefs(support_store);

// Pinia Methods
const { getAvailableSlots, clearSearchDetails, fetchAllBookings, fetchContainers, addSingleBooking, addMultipleBookings } = booking_store;

// Functions
const selectCommand = (selected_command: string) => {
  command.value = selected_command;
  // mixpanel.track("Command selected", {
  //   command: selected_command,
  // })
}


// Toggle all checkboxes for ALL containers (not just the current page)
const selectAllCheckboxes = () => {
  if (all_containers_selected.value) {
    // If all are selected, clear all selections
    checked_containers.value = [];
  } else {
    // Select all containers from containers.value.containers
    checked_containers.value = containers.value.containers.map(
      (container) => container.container_no
    );
  }
};

// Handle single checkbox change
const handleSingleCheckbox = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;
  const value = checkbox.value;

  if (checkbox.checked) {
    // Add value if not already present
    if (!checked_containers.value.includes(value)) {
      checked_containers.value.push(value);
    }
  } else {
    // Remove value
    checked_containers.value = checked_containers.value.filter((item) => item !== value);
  }
};


// Remove a selected container
const removeContainer = (container: string) => {
  // Remove container from checked containers array
  if (checked_containers.value.length > 0) {
    checked_containers.value = checked_containers.value.filter(item => item !== container)

    // Uncheck corresponding checkbox if it exists
    const checkbox = document.querySelector<HTMLInputElement>(`input[value="${container}"]`)
    if (checkbox) {
      checkbox.checked = false
    }
  }

}

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const edited_date = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return edited_date === 'Invalid Date' ?
    { is_available: false, message: 'Invalid date' } :
    { is_available: true, message: edited_date };
};

const handleRequestBooking = async () => {
  booking_details.value = {
    container_number: [...checked_containers.value],
    command: command.value,
    day: booked_date.value,
    agency_name: agent_details.value.name,
    phone: agent_details.value.phone,
    bl_number: bl_number.value,
    invoice_number: containers.value.receipt_number,
  }

  request_loader.value = true;
  try {
    console.log(booking_details.value)
    let response: any;

    // Single booking
    if (booking_details.value.container_number.length <= 1) {
      response = await addSingleBooking(booking_details.value);

      if (response?.status >= 200 && response?.status < 300) {
        // mixpanel.track('Booking request', {
        //   "Booking details": booking_details.value,
        // });
        toast.success({ component: SuccessComponent, props: { content: response.message } });
      } else {
        // mixpanel.track("Booking error", {
        //   error: response.message,
        //   "Booking details": booking_details.value,
        // })

        throw new Error(response.message)
      }
    }
    // Multiple booking
    else {
      response = await addMultipleBookings(booking_details.value);

      for (const res in response) {
        console.log(res);
        let error: any = [];

        if (response[res]?.status >= 200 && response[res]?.status < 300) {
          // mixpanel.track('Booking request', {
          //   "Booking details": booking_details.value,
          // });
          toast.success({ component: SuccessComponent, props: { content: `${response[res].message} for ${response[res].container_number}` } });
        } else {
          // mixpanel.track("Booking error", {
          //   error: response[res].message,
          //   "Booking details": booking_details.value,
          // })

          error = [...error, response[res]]
        }
        if (error.length >= 1) throw new Error(error);
      }
    }


  } catch (error: any) {
    console.log(error);
    toast.error({ component: ErrorComponent, props: { content: error.message } });
  } finally {
    request_loader.value = false;
    await clearSearchDetails();
    await fetchAllBookings();
    console.log("Bookings updated");
    clearSavedDetails()
  }
}

const clearSavedDetails = () => {
  checked_containers.value = [];
  bl_number.value = '';
  command.value = '';
  booked_date.value = '';
  displayed_date.value = '';
  slots_loading.value = false;
  apapa_slots.value = 0;
  tincan_slots.value = 0;
  kirikiri_slots.value = 0;
}

const handleDayClick = async (e: any) => {
  slots_loading.value = true;
  const cell_date = e.cell.start;
  const { message } = formatDateTime(cell_date);
  const edited_date = new Date(message).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const edited_date_v2 = new Date(message).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const [month, day, year] = edited_date.split('/');
  const formatted_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  booked_date.value = formatted_date;
  displayed_date.value = edited_date_v2;
  await getAvailableSlots(formatted_date);

  apapa_slots.value = available_slots.value.commands[1].count;
  tincan_slots.value = available_slots.value.commands[0].count;
  kirikiri_slots.value = available_slots.value.commands[2].count;
  slots_loading.value = false;

  // mixpanel.track('Booking date selected', {
  //   'Booking date': displayed_date.value,
  // })
}

const searchForContainers = async () => {
  loader.value = true;
  if (bl_number.value.length >= 9 && bl_number.value.length <= 15) {
    try {
      await fetchContainers(bl_number.value);
      // mixpanel.track('Searched for containers of a BL number', {
      //   'BL Number': bl_number.value,
      //   'Container Number(s)': [...containers.value.containers]
      // });
    } catch (error) {
      // mixpanel.track('Search error', {
      //   error: error
      // })
      console.error(error);
    } finally {
      loader.value = false;
    }
  } else {
    toast.error({ component: ErrorComponent, props: { content: 'Invalid BL number' } });
    loader.value = false;
  }
}

const disableDoubleClick = (e: Event) => {
  e.preventDefault(); // Disable double-click on cells (days)
}

const hideInvoice = () => {
  show_invoice.value = !show_invoice.value;
}

/**
* Downloads or shares an image of an invoice
*
* This function captures a DOM element containing invoice details and either:
* 1. Shares it via the Web Share API if supported by the browser
* 2. Downloads it directly as a PNG file if sharing is not supported
*
* @param {String} invoice_number - The unique invoice number used as the element ID
* @returns {Promise<void>} A promise that resolves when the image is shared or downloaded
*
* @example
* // Share/download details for container "CONT123456"
* await downloadInvoice("CONT123456")
*/

const downloadInvoice = async (invoice_number: string): Promise<void> => {
  const el = document.querySelector('.invoice') as HTMLElement;
  const header_button = document.querySelector('.header_button') as HTMLElement;

  if (!el || !header_button) {
    console.error('Invoice or header button element not found');
    toast.error({ component: ErrorComponent, props: { content: 'Failed to find invoice element' } });
    return;
  }

  try {
    // Ensure the invoice is visible
    show_invoice.value = true;

    // Temporarily hide the header buttons to exclude them from the capture
    header_button.style.opacity = '0';

    // Wait for the next DOM update to ensure the invoice is rendered
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Capture the invoice element as a PNG
    const dataUrl = await domtoimage.toPng(el, {
      quality: 1.0,
      width: el.offsetWidth,
      height: el.offsetHeight,
      bgcolor: '#ffffff', // Set a white background to avoid transparency
    });

    if (!navigator.canShare) {
      // Download the image if Web Share API is not supported
      console.log('Web Share API not supported');
      const link = document.createElement('a');
      link.download = `${invoice_number}_invoice.png`;
      link.href = dataUrl;
      link.click();

      // mixpanel.track('Invoice download', {
      //   'Invoice number': invoice_number,
      // });
    } else {
      // Share the image via Web Share API
      const blob = await domtoimage.toBlob(el, {
        quality: 1.0,
        width: el.offsetWidth * 2,
        height: el.offsetHeight * 2,
        bgcolor: '#ffffff', // Set a white background
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      });

      const file = new File([blob], `${invoice_number}.png`, {
        type: 'image/png',
      });

      await navigator.share({
        files: [file],
        title: 'Invoice Details',
        text: `Details for ${invoice_number} invoice`,
      });

      // mixpanel.track('Invoice share', {
      //   'Invoice number': invoice_number,
      // });
    }
  } catch (error) {
    console.error('Error capturing invoice:', error);
    toast.error({ component: ErrorComponent, props: { content: 'Failed to download/share invoice' } });
  } finally {
    // Restore the header buttons' visibility
    header_button.style.opacity = '1';
  }
};

// Computed properties
const total_pages = computed(() => {
  return Math.ceil((containers.value?.containers?.length || 0) / items_per_page.value);
});

const paginated_containers = computed(() => {
  const start = (current_page.value - 1) * items_per_page.value;
  const end = start + items_per_page.value;
  return containers.value?.containers?.slice(start, end) || [];
});

const all_containers_selected = computed(() => {
  if (!containers.value?.containers || containers.value.containers.length === 0) {
    return false;
  }
  return containers.value.containers.every((container) =>
    checked_containers.value.includes(container.container_no)
  );
});

onBeforeMount(async () => {
  const { range: range_days, disabled_days } = getDateRange();
  range.value = range_days;

  const formattedDisabledDays = disabled_days.map(date => {
    const [month, day, year] = date.split('/');
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  });

  console.log(formattedDisabledDays);
  disabled_days_arr.value = formattedDisabledDays;
  console.log(disabled_days_arr.value);
  await fetchAllBookings();

  if (containers.value.containers[0]?.bl_no) {
    bl_number.value = containers.value.containers[0].bl_no;
  }
})

</script>

<style scoped>
.calendar {
  width: 100%;
  height: 100%;
}
</style>
