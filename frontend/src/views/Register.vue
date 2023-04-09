<template>
  <NavBarGuest />
  <div class="d-flex align-center justify-center" style="height: 70vh">
    <v-sheet width="400" class="mx-auto">
      <v-form>
        <!-- fast-fail @submit.prevent="login" -->
        <v-text-field
          variant="outlined"
          v-model="username"
          label="Username"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="name"
          label="Name"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="email"
          label="Email"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          label="Confirm password"
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

import NavBarGuest from "../components/NavBarGuest.vue";

export default defineComponent({
  name: "Register",

  components: { NavBarGuest },
});
</script>
