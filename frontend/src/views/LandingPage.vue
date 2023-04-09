<template>
  <NavBarGuest />
  <v-container fluid>
    <v-main style="min-height: 300px">
      <v-flex xs12 class="text-h1 text-center" mt-5>
        <h1>Welcome to Todofy</h1>
      </v-flex>
      <blockquote class="blockquote text-center">
        <p>
          It's a simple application <br />
          that will help you manage your tasks.
        </p>
        <p>Login or register if you don't have an account.</p>
        <p>Enjoy :)</p>
      </blockquote>
    </v-main>
    <div class="d-flex justify-center">
      <v-flex class="mt-1">
        <v-btn class="me-5" color="teal-lighten-2" variant="tonal" to="/login"
          >Login</v-btn
        >
        <v-btn variant="tonal" color="light-blue" to="/register"
          >Register</v-btn
        >
      </v-flex>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

import NavBarGuest from "../components/NavBarGuest.vue";

export default defineComponent({
  name: "LandingPage",

  components: {
    NavBarGuest,
  },
});
</script>
