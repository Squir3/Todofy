<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-text-field
        v-model="name"
        label="Name"
        :rules="formRules"
        required
      ></v-text-field>
      <v-textarea
        v-model="description"
        :rules="formRules"
        label="Description"
        required
      ></v-textarea>
      <v-checkbox v-model="completed" label="Completed"></v-checkbox>
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
      valid: true,
      formRules: [(v) => !!v || "Field is required"],
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
    validate() {
      this.$refs.form.validate();
    },
    validateAndSubmit() {
      this.validate();
      if (this.$refs.form.valid) {
        this.submitForm();
      }
    },
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
          await axios.post(`${server.baseURL}/tasks/`, data);
        }
        this.$emit("submit", data);
        this.$emit("fetch-tasks");
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
