import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function appointments(state: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  return appointments.map((appointment: any) => ({
    id: appointment.id,
    patient: appointment.participant.find((item: any) =>
      item.actor.reference.includes("Patient")
    ).actor.reference,
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
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  };
}
