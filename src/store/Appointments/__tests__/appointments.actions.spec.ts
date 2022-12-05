import { filterAppointmentsByDateFilters } from "../appointments.actions";
import { dateFilterOptions } from "@/utils/filterOptions";

jest.mock("@/plugins/firebase", () => {
  return {
    auth: jest.fn(),
  };
});

describe("filter appointments", () => {
  const appointments: any[] = [
    {
      id: "693a90e0-fb0f-4762-87b4-e162c77fd956",
      description: "Booking practitioner role",
      end: "2022-09-24T00:15:00-05:00",
      start: "2022-09-24T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "9e3b05d7-51f8-4dd5-833c-a8c6a5ca7d9a",
      description: "Booking practitioner role",
      end: "2022-09-26T00:15:00-05:00",
      start: "2022-09-26T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "35d7ab4d-8255-4005-8a83-973894291be0",
      description: "Booking practitioner role",
      end: "2022-09-25T00:15:00-05:00",
      start: "2022-09-25T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "693a90e0-fb0f-4762-87b4-e162c77fd956",
      description: "Booking practitioner role",
      end: "2022-09-24T00:15:00-05:00",
      start: "2022-09-24T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "9e3b05d7-51f8-4dd5-833c-a8c6a5ca7d9a",
      description: "Booking practitioner role",
      end: "2022-09-26T00:15:00-05:00",
      start: "2022-09-26T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "35d7ab4d-8255-4005-8a83-973894291be0",
      description: "Booking practitioner role",
      end: "2022-09-25T00:15:00-05:00",
      start: "2022-09-25T00:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "1bae9c2a-d261-4c34-8dc6-4d2b336717aa",
      description: "Booking practitioner role",
      end: "2022-09-14T14:30:00-05:00",
      start: "2022-09-14T14:15:00-05:00",
      status: "fulfilled",
      resourceType: "Appointment",
    },
    {
      id: "c86f3595-dafc-443c-90e6-95e77c879291",
      description: "Booking practitioner role",
      end: "2022-09-20T01:30:00-05:00",
      start: "2022-09-20T01:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "b85aea11-1840-4d10-aea0-ac9fd09f2061",
      description: "Booking practitioner role",
      end: "2022-09-20T00:00:00-05:00",
      start: "2022-09-19T23:45:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "1c26ac73-0294-4309-a740-31a3206b7728",
      description: "Booking practitioner role",
      end: "2022-09-19T01:30:00-05:00",
      start: "2022-09-19T01:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "fcca00b6-125b-4cac-ada2-4af0ef858370",
      description: "Booking practitioner role",
      end: "2022-09-17T19:30:00-05:00",
      start: "2022-09-17T19:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "e68922e7-71cd-4d23-8f89-23fa5cbb81a1",
      description: "Booking practitioner role",
      end: "2022-09-17T19:00:00-05:00",
      start: "2022-09-17T18:45:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "15dfa821-95c6-42fa-a589-71f9682e8396",
      description: "Booking practitioner role",
      end: "2022-09-16T18:15:00-05:00",
      start: "2022-09-16T18:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "0ac7fef6-0dba-4ebc-957a-e99828b6c1bd",
      description: "Booking practitioner role",
      end: "2022-09-16T19:15:00-05:00",
      start: "2022-09-16T19:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "de38150f-bc18-4706-af9d-a4167ed32373",
      description: "Booking practitioner role",
      end: "2022-09-16T21:15:00-05:00",
      start: "2022-09-16T21:00:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "dcecf24b-75b1-4c44-8805-b17771b4ee4c",
      description: "Booking practitioner role",
      end: "2022-09-18T01:30:00-05:00",
      start: "2022-09-18T01:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "5f5df9cd-4821-4b57-8e1d-6cbee416a19a",
      description: "Booking practitioner role",
      end: "2022-09-18T00:00:00-05:00",
      start: "2022-09-17T23:45:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "6591cbc1-2b85-4304-afb5-649180f4d8cf",
      description: "Booking practitioner role",
      end: "2022-09-17T01:30:00-05:00",
      start: "2022-09-17T01:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "e376353c-423c-4689-b04f-0c70e0704809",
      description: "Booking practitioner role",
      end: "2022-09-10T14:30:00-05:00",
      start: "2022-09-10T14:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "5fc16661-9805-44fa-b2e5-670e98a3c218",
      description: "Booking practitioner role",
      end: "2022-09-11T14:30:00-05:00",
      start: "2022-09-11T14:15:00-05:00",
      status: "cancelled",
      resourceType: "Appointment",
    },
    {
      id: "305347ca-ce3c-49c3-b7e7-35ef49eb4ed4",
      description: "Booking practitioner role",
      end: "2022-09-11T15:00:00-05:00",
      start: "2022-09-11T14:45:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
    {
      id: "560427d4-481b-4630-954d-7fe93c8deb51",
      description: "Booking practitioner role",
      end: "2022-09-12T15:30:00-05:00",
      start: "2022-09-12T15:15:00-05:00",
      status: "booked",
      resourceType: "Appointment",
    },
  ];

  it("Should return today's Appointments with length 2 when using the today filter", async () => {
    const today = new Date("09-25-2022");
    const dateFilter = dateFilterOptions.today;
    const filteredAppointments = filterAppointmentsByDateFilters({
      appointments,
      dateFilter,
      today,
    });

    expect(filteredAppointments.length).toBe(2);
  });

  it("Should return tomorrow's Appointments with length 2 when using the tomorrow filter", async () => {
    const today = new Date("09-25-2022");
    const dateFilter = dateFilterOptions.tomorrow;
    const filteredAppointments = filterAppointmentsByDateFilters({
      appointments,
      dateFilter,
      today,
    });

    expect(filteredAppointments.length).toBe(2);
  });

  it("Should return yesterday's Appointments with length 2 when using the yesterday filter", async () => {
    const today = new Date("09-25-2022");
    const dateFilter = dateFilterOptions.yesterday;
    const filteredAppointments = filterAppointmentsByDateFilters({
      appointments,
      dateFilter,
      today,
    });

    expect(filteredAppointments.length).toBe(2);
  });

  it("Should return last 7 day's Appointments with length 2 when using the last 7 days filter", async () => {
    const today = new Date("09-25-2022");
    const dateFilter = dateFilterOptions.last7Days;
    const filteredAppointments = filterAppointmentsByDateFilters({
      appointments,
      dateFilter,
      today,
    });

    expect(filteredAppointments.length).toBe(5);
  });

  it("Should return next 7 day's Appointments with length 2 when using the next 7 days filter", async () => {
    const today = new Date("09-25-2022");
    const dateFilter = dateFilterOptions.next7Days;
    const filteredAppointments = filterAppointmentsByDateFilters({
      appointments,
      dateFilter,
      today,
    });

    expect(filteredAppointments.length).toBe(4);
  });
});
