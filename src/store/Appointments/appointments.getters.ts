import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function appointments(state: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  return appointments.map((appointment: any) => ({
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
