<template>
  <NavBar />
  <h1 class="text-center mt-4">Login</h1>
  <div class="d-flex align-center justify-center" style="height: 50vh">
    <v-sheet width="400" class="mx-auto">
      <v-form ref="form" @submit.prevent="login">
        <v-alert v-if="alert" border="bottom" class="mb-2" color="error">
          Email or password is incorrect!
        </v-alert>
        <v-text-field
          variant="outlined"
          v-model="email"
          :rules="emailRules"
          label="Email"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          :rules="passwordRules"
          type="password"
          class="input-group--focused"
          label="Password"
          required
        ></v-text-field>

        <v-btn type="submit" color="blue-darken-4" block class="mt-2"
          >Login</v-btn
        >
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Don't have an account?
          <router-link class="routerLink" to="/register"
            >Click here</router-link
          >
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { server } from "@/utils/api";

export default defineComponent({
  name: "Login",
  components: {
    NavBar,
  },
  mounted() {
    if (this.$route.query.success === "true") {
      const toast = useToast();
      toast.success(
        "Your account has been created successfully. Now you can log in.",
        {
          position: "bottom-right",
          timeout: 3000,
        }
      );
    }
  },
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Must be valid email address",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      alert: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async login() {
      this.validate();
      try {
        await axios.post(`${server.baseURL}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        // przekieruj użytkownika do strony głównej
        await this.$router.push("/home");
        this.alert = false;
      } catch (error) {
        console.log(error.response);
        // wyświetl błąd
        this.alert = true;
      }
    },
  },
});
</script>
