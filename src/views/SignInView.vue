<template>

  <main class="flex flex-wrap items-start justify-center min-h-screen">
    <!-- Signin form image -->
    <div class="form_image lg:h-screen md:h-screen h-[50vh] lg:w-[60%] md:w-[60%] w-full">
      <img :src="form_image" alt="Form image" class="w-full h-full object-cover">
    </div>

    <div
      class="signin_form lg:w-[40%] md:w-[40%] lg:h-full md:h-full h-fit w-full flex items-between min-h-screen justify-start flex-col lg:px-10 px-5 py-8">
      <form @submit.prevent="handleSignin" class="w-full flex flex-col gap-5">
        <h2 class="text-4xl font-[500] mb-8 uppercase">Sign in to your account</h2>

        <!-- Dashboard selection -->
        <div class="signin_dashboard">
          <h3 class="font-[600]">Select Dashboard</h3>
          <div class="dashboards mt-2 flex flex-wrap gap-4 text-(--color-efl-blue-base)">
            <button @click="selectDashboard('support')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': dashboard === 'support' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] px-3 min-w-[110px] h-[45px]" type="button"
              aria-label="Customer support dashboard button">Customer support</button>
            <button @click="selectDashboard('track-trace')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': dashboard === 'track-trace' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] px-3 min-w-[110px] h-[45px]" type="button"
              aria-label="Track and trace dashboard button">T&T</button>
            <button @click="selectDashboard('finance')"
              :class="{ 'bg-(--color-efl-blue-base) text-[#f1f1f7]': dashboard === 'finance' }"
              class="border border-(--color-efl-blue-base) rounded-[4px] px-3 min-w-[110px] h-[45px]" type="button"
              aria-label="Finance dashboard button">Finance</button>
          </div>
        </div>

        <div class="email">
          <label for="email" class="block text-gray-900 mb-2 font-[600]">Email Address</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email"
            class="w-full px-3 flex items-center h-[55px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
        </div>

        <div class="relative">
          <label for="password" class="block text-gray-900 mb-2 font-[600]">Password</label>
          <input :type="show_password ? 'text' : 'password'" id="password" v-model="password" required
            placeholder="Enter your password"
            class="w-full px-3 flex items-center h-[55px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
          <img @click="show_password = !show_password" v-if="show_password"
            class="w-6 absolute cursor-pointer bottom-[15px] z-10 right-4"
            src="https://img.icons8.com/forma-light-sharp/24/visible.png" alt="visible" />
          <img @click="show_password = !show_password" v-else
            class="w-6 cursor-pointer absolute bottom-[15px] z-10 right-4"
            src="https://img.icons8.com/forma-light-sharp/24/invisible.png" alt="invisible" />
        </div>

        <button aria-label="Sing in button" type="submit"
          class="cursor-pointer w-full bg-[#1e1e1e] text-white font-[500] h-[48px] px-4 rounded-full flex items-center justify-center">
          <span v-if="loader"
            class="block animate-spin border-2 border-dashed border-white w-5 h-5 rounded-full"></span>
          <span v-else>Sign In</span>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import form_image from "@/assets/images/signin.jpg";
import { useToast } from "vue-toastification";
import { useSupportStore } from "@/stores/support";
import { useRouter } from "vue-router";
// import mixpanel from "mixpanel-browser";
import SuccessComponent from "@/components//modal/SuccessComponent.vue"
import ErrorComponent from "@/components/modal/ErrorComponent.vue";

// Refs/variables/Reactive variables
const toast = useToast();
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const show_password: Ref<boolean> = ref(false);
const loader: Ref<boolean> = ref(false);
const router = useRouter();
const dashboard: Ref<string> = ref("");

const support_store = useSupportStore();
const { login } = support_store;

// Functions
const handleSignin = async () => {
  loader.value = true;
  if (email.value === "" || password.value === "" || dashboard.value === "") {
    toast.error({ component: ErrorComponent, props: { content: "Please fill in all fields and select a dashboard" } });
    loader.value = false;
    return;
  }
  if(dashboard.value === "track-trace" || dashboard.value === "finance") {
    toast.error({
      component: ErrorComponent,
      props: {
        content: `${dashboard.value} is currently not available, please try again later...`
      }
    })
    loader.value = false;
    return;
  }

  try {
    const response: any = await login({ email: email.value, password: password.value });
    // mixpanel.track("Sign in attempt");
    // console.log(response);
    if (response?.code >= 300) {
      // mixpanel.track("Sign in failed", {
      //   error: response.message,
      //   user: {
      //     email: email.value,
      //     password: password.value,
      //   }
      // });

      throw new Error(response?.message);
    }
    toast.success({ component: SuccessComponent, props: { content: response?.message } });
    // mixpanel.track("Sign in successful", {
    //   user: {
    //     email: email.value,
    //     password: password.value,
    //   }
    // });
    router.push(`/${dashboard.value}`);
  } catch (error: any) {
    console.log(error);
    toast.error({ component: ErrorComponent, props: { content: error.message } });
  } finally {
    loader.value = false;
  }
};


const selectDashboard = (selectedDashboard: string) => {
  dashboard.value = selectedDashboard;
  console.log(dashboard.value);
};
</script>

<style scoped></style>
