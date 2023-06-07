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
      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteConfirmation" max-width="500px">
        <v-card>
          <v-card-title>Delete Task</v-card-title>
          <v-card-text>
            Are you sure you want to delete the task "{{
              selectedTaskToDelete?.name
            }}"?
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" text @click="cancelDeleteTask">Cancel</v-btn>
            <v-btn color="green" text @click="confirmDeleteTask">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      deleteConfirmation: false,
      selectedTaskToDelete: null,
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
    addNewTask(newTask) {
      this.tasks.push(newTask);
    },
    editTask(task) {
      this.$emit("edit-task", task);
    },
    async deleteTask(task) {
      this.selectedTaskToDelete = task;
      this.deleteConfirmation = true;
    },
    async confirmDeleteTask() {
      const taskId = this.selectedTaskToDelete._id;
      try {
        await axios.delete(`${server.baseURL}/tasks/${taskId}`);
        await this.fetchTasks();
      } catch (error) {
        console.error(error);
      }
      this.cancelDeleteTask();
    },
    cancelDeleteTask() {
      this.deleteConfirmation = false;
      this.selectedTaskToDelete = null;
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
