import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function appointments(state: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  return appointments.map((appointment: any) => ({
    id: appointment.id,
    patient: {
      id: appointment.patient.id,
      firstName: appointment.patient.name[0].given[0],
      familyName: appointment.patient.name[0].family,
    },
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  }));
}

export function appointment(state: any, getters: any, rootState: any) {
  const appointment = state.appointment;
  if (!appointment) {
    return;
  }

  return {
    id: appointment.id,
    patient: appointment.participant
      .find((item: any) => item.actor.reference.includes("Patient"))
      .actor.reference.split("/")[1],
    practitionerRole: appointment.participant
      .find((item: any) => item.actor.reference.includes("PractitionerRole"))
      .actor.reference.split("/")[1],
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  };
}

export function diagnosticReports(state: any) {
  const diagnosticReports = state.diagnosticReports;

  if (!diagnosticReports) {
    return [];
  }

  return diagnosticReports.map((report: any) => ({
    id: report.id,
    note: report.conclusion,
    createdOn: formatDateString(
      report.meta.lastUpdated,
      TimeConstants.monthDayYearTime
    ),
  }));
}

export function slots(state: any) {
  const slots = state.slots;

  if (!slots.length) {
    return [];
  }

  return slots;
}

export function events(state: any) {
  const slots = state.slots;

  if (!slots.length) {
    return [];
  }

  return slots.map((item: any) => {
    const startDate = new Date(item.start);
    const endDate = new Date(item.end);
    const start = `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`;
    const end = `${endDate.getFullYear()}-${
      endDate.getMonth() + 1
    }-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`;
    return {
      start,
      end,
      name: item.status === "busy-unavailable" ? "Blocked" : "Busy",
      color: item.status === "busy-unavailable" ? "red" : "blue",
      slotId: item.id,
      status: item.status,
    };
  });
}
