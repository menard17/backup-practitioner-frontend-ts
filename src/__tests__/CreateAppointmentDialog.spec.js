import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Component from "@/views/Appointment/Dialogs/createAppointmentDialog.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("createAppointmentDialog.vue", () => {
  let actions, store;

  const mockPatient = {
    patient: {
      id: "patient_id",
      firstName: "first name",
      familyName: "family name",
    },
  };

  beforeEach(() => {
    actions = {
      createAppointment: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        $_appointments: {
          actions,
        },
      },
    });
  });

  it("when data is all filled in, values are cleared after save is clicked", async () => {
    const wrapper = shallowMount(Component, {
      propsData: mockPatient,
      store,
      localVue,
    });
    await wrapper.setData({
      start: "2022-01-01 09:00",
      end: "2022-01-01 09:15",
      isFollowUp: true,
      service: "Online",
      service_type: "followup",
      selectedPractitionerRoleId: "role_id",
      duration: "15 mins",
    });
    expect(wrapper.vm.duration).toBe("15 mins");
    await wrapper.find("v-btn#save").trigger("click");
    expect(wrapper.vm.duration).toBe("");
  });

  it("when data is not all filled in, values are not cleared", async () => {
    const wrapper = shallowMount(Component, {
      propsData: mockPatient,
      store,
      localVue,
    });
    await wrapper.setData({
      start: "2022-01-01 09:00",
      end: "",
      isFollowUp: true,
      service: "Online",
      service_type: "followup",
      selectedPractitionerRoleId: "role_id",
      duration: "30 mins",
    });
    const save = wrapper.find("v-btn#save");
    expect(wrapper.vm.duration).toBe("30 mins");
    expect(wrapper.vm.end).toBe("");

    await save.trigger("click");
    expect(wrapper.vm.duration).not.toBe("");
  });
});
