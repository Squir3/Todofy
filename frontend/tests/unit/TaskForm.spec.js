import { mount } from "@vue/test-utils";
import TaskForm from "@/components/TaskForm.vue";

describe("TaskForm", () => {
  it("submits the form when Save button is clicked", async () => {
    const wrapper = mount(TaskForm);
    const nameInput = wrapper.find('v-text-field[label="Name"]');
    const descriptionInput = wrapper.find('v-textarea[label="Description"]');
    const saveButton = wrapper.find('v-btn[type="submit"]');

    nameInput.element.value = "Test Task";
    await nameInput.trigger("input");

    descriptionInput.element.value = "Test Description";
    await descriptionInput.trigger("input");

    await saveButton.trigger("click");
  });
});
