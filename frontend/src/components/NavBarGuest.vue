<template>
  <v-container fluid>
    <v-app-bar color="blue-darken-4">
      <v-toolbar-title>
        <router-link class="routerLink" to="/"
          >Todofy</router-link
        ></v-toolbar-title
      >
      <router-link class="routerLink" to="/login">
        <v-btn text>
          <span>Login</span>
        </v-btn>
      </router-link>
      <router-link class="routerLink" to="/register">
        <v-btn text>
          <span>Register</span>
        </v-btn>
      </router-link>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "NavBarGuest",

  data: () => ({}),
};
</script>
