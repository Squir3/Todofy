<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-textarea
        v-model="description"
        label="Description"
        required
      ></v-textarea>
      <template v-if="task">
        <!-- Warunek sprawdzający, czy istnieje zadanie -->
        <v-checkbox v-model="completed" label="Completed"></v-checkbox>
        <!-- Checkbox w trybie edycji -->
      </template>
      <v-btn type="submit" color="teal-darken-1">Save</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import { server } from "@/utils/api";

export default {
  name: "TaskForm",
  props: {
    task: Object,
  },
  data() {
    return {
      name: "",
      description: "",
      completed: false,
    };
  },
  async created() {
    if (this.task) {
      this.name = this.task.name;
      this.description = this.task.description;
      this.completed = this.task.completed;
      this.fetchTasks();
    }
  },
  methods: {
    async fetchTasks() {
      await axios.get(`${server.baseURL}/tasks/`).then((response) => {
        this.tasks = response.data;
      });
    },
    async submitForm() {
      const data = {
        name: this.name,
        description: this.description,
        completed: this.completed,
      };
      try {
        if (this.task) {
          await axios.put(`${server.baseURL}/tasks/${this.task._id}`, data);
        } else {
          const response = await axios.post(`${server.baseURL}/tasks/`, data);
          this.$emit("submit", response.data); // Emitowanie zdarzenia z nowym zadaniem
        }
        this.$emit("submit", data);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
