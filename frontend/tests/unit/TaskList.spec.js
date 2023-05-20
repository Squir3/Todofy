import { mount } from "@vue/test-utils";
import TaskList from "@/components/TaskList.vue";

describe("TaskList", () => {
  it("displays tasks correctly", () => {
    const tasks = [
      {
        _id: 1,
        name: "Task 1",
        description: "Description 1",
        completed: false,
      },
      { _id: 2, name: "Task 2", description: "Description 2", completed: true },
    ];

    const wrapper = mount(TaskList, {
      data() {
        return {
          tasks: tasks,
        };
      },
    });

    const taskElements = wrapper.findAll("tbody tr");

    expect(taskElements.length).toBe(tasks.length);

    taskElements.forEach((taskElement, index) => {
      const task = tasks[index];

      expect(taskElement.find("td").text()).toBe(task.name);
      expect(taskElement.find("td:nth-child(2)").text()).toBe(task.description);
      expect(taskElement.find("td:nth-child(3)").text()).toBe(
        task.completed ? "Completed" : "Uncompleted"
      );
    });
  });
});
