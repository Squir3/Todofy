<template>
  <NavBarGuest />
  <div class="d-flex align-center justify-center" style="height: 70vh">
    <v-sheet width="400" class="mx-auto">
      <v-form>
        <!-- fast-fail @submit.prevent="login" -->
        <v-text-field
          variant="outlined"
          v-model="email"
          label="Email"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          label="Password"
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
import { defineComponent } from "vue";

import NavBarGuest from "../components/NavBarGuest.vue";

export default defineComponent({
  name: "Login",

  components: { NavBarGuest },
});
</script>
