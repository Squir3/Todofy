<template>
  <NavBar />
  <h1 class="text-center">Register</h1>
  <div class="d-flex align-center justify-center" style="height: 60vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="register">
        <v-text-field
          variant="outlined"
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="passwordConfirm"
          :rules="passwordRules"
          :error-messages="arePasswordsSame ? '' : 'Passwords must match'"
          label="Confirm password"
          type="password"
          required
        ></v-text-field>

        <v-btn type="submit" color="blue-darken-4" block class="mt-2"
          >Sign Up</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import { server } from "@/utils/api";

export default defineComponent({
  name: "Register",
  components: { NavBar },
  data() {
    return {
      valid: true,
      status: false,
      success: false,
      username: "",
      errors: [],
      usernameRules: [(v) => !!v || "Username is required"],
      password: "",
      passwordConfirm: "",
      passwordRules: [(v) => !!v || "Password is required"],
      email: "",
      passwordMismatch: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Must be valid email address",
      ],
    };
  },
  computed: {
    arePasswordsSame() {
      return this.password === this.passwordConfirm;
    },
  },
  methods: {
    async register() {
      if (!this.arePasswordsSame) return;
      try {
        const response = await axios.post(`${server.baseURL}/auth/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        if (response.status === 201) {
          this.success = true; // ustawienie flagi na true
          this.$router.push({ path: "/login", query: { success: true } });
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
