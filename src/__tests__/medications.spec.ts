import { medications } from "@/store/Appointments/appointments.getters";

test("Empty medications", () => {
  const state = {
    medications: [],
  };
  expect(medications(state)).toBe("");
});

test("One medication", () => {
  const state = {
    medications: [
      {
        display: "display1",
        value: "value1",
      },
    ],
  };
  expect(medications(state)).toBe("display1");
});

test("Many medications in different order", () => {
  const state = {
    medications: [
      {
        display: "display1",
        value: "value1",
      },
      {
        display: "display2",
        value: "value2",
      },
      {
        display: "display3",
        value: "value3",
      },
    ],
  };
  expect(medications(state)).toBe("display1,display2,display3");

  const newState = {
    medications: [
      {
        display: "display3",
        value: "value3",
      },
      {
        display: "display1",
        value: "value1",
      },
      {
        display: "display2",
        value: "value2",
      },
    ],
  };
  expect(medications(newState)).toBe(medications(state));
});
