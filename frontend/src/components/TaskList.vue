<template>
  <v-container fluid>
    <div>
      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task._id">
            <td :class="{ completedT: task.completed }">{{ task.name }}</td>
            <td :class="{ completedT: task.completed }">
              {{ task.description }}
            </td>
            <td v-bind:class="[task.completed ? 'completed' : 'not-completed']">
              {{ task.completed ? "Completed" : "Uncompleted" }}
            </td>
            <td>
              <v-btn color="blue" class="me-4" small @click="editTask(task)">
                <v-icon small class="mr-2">mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="red" small @click="deleteTask(task)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/api";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get(`${server.baseURL}/tasks/`);
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editTask(task) {
      this.$emit("edit-task", task);
    },
    async deleteTask(task) {
      await axios.delete(`${server.baseURL}/tasks/${task._id}`);
      await this.fetchTasks();
    },
  },
};
</script>

<style>
.completed {
  color: green;
}
.completedT {
  text-decoration: line-through;
}
.not-completed {
  color: red;
}
</style>
