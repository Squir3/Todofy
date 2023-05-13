<template>
  <NavBar />
  <div>
    <h1 class="text-center mb-2">Tasks</h1>
    <v-btn
      color="teal-darken-1"
      class="mb-2"
      style="left: 50%; transform: translateX(-50%)"
      @click="addTask"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <TaskList @edit-task="editTask" />
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ formTitle }}
        </v-card-title>
        <v-card-text>
          <TaskForm
            :task="selectedTask"
            @fetchTasks="fetchTasks"
            @submit="closeDialog"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import { server } from "@/utils/api";

export default {
  name: "Home",
  components: {
    TaskList,
    TaskForm,
    NavBar,
  },
  data() {
    return {
      dialog: false,
      selectedTask: null,
      tasks: [],
      formTitle: "",
    };
  },

  async created() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const response = await axios.get(`${server.baseURL}/tasks/`);
      this.tasks = response.data;
    },
    addTask() {
      this.formTitle = "Add task";
      this.selectedTask = null;
      this.dialog = true;
    },
    editTask(task) {
      this.formTitle = "Edit task";
      this.selectedTask = task;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.selectedTask = null;
    },
  },
};
</script>
