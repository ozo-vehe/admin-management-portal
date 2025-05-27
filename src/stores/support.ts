import { defineStore } from "pinia";

const BASE_API_URL = "https://booking-prototype.efl.africa/api";

interface UserLoginDetails {
  email: string;
  password: string;
}

interface SupportDetails {
  email: string;
  name: string;
  phone: string;
  id: string | number;
  profile: [] | null;
}

export const useSupportStore = defineStore("supportStore", {
  state: () => ({
    agent: {} as SupportDetails,
    token: "",
  }),
  actions: {
    async login(user: UserLoginDetails) {
      try {
        const req = await fetch(`${BASE_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const res = await req.json();
        console.log(res);
        console.log(res.data);
        if (res.data) {
          this.token = res.data.token;
          localStorage.setItem("token", this.token);
          return { message: "Login successful", status: "success", code: res.statusCode };
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        console.log(error);
        return { message: error, status: "error", code: 300 };
      }
    },
    async logout() {
      this.token = "";
      localStorage.clear();
    },
    async updateToken() {
      const token = localStorage.getItem('token');
      token ? this.token = token : this.token = '';
    },
    async getSupport() {
      await this.updateToken();

      const req = await fetch("https://booking-prototype.efl.africa/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      const res = await req.json();
      console.log(res);
      this.agent = res.data
    },
  },
});
