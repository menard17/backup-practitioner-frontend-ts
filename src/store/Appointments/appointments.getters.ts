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
