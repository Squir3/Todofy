import { mount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";

describe("NavBar", () => {
  test("renders the title correctly", () => {
    const wrapper = mount(NavBar);

    const titleElement = wrapper.find("v-toolbar-title");
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toBe("Todofy");
  });

  test("has the correct background color", () => {
    const wrapper = mount(NavBar);

    const appBarElement = wrapper.find("v-app-bar");
    expect(appBarElement.attributes("color")).toBe("blue-darken-4");
  });
});
