import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function practitioners(state: any) {
  if (!state.practitioners.length) {
    return [];
  }
  return state.practitioners.map((practitioner: any) => ({
    id: `${practitioner.resource.id}`,
    name: `${practitioner.resource.name[0].family}, ${practitioner.resource.name[0].given[0]}`,
    birthDate: practitioner.resource.birthDate || "Not Provided",
    sex:
      (practitioner.resource.gender &&
        practitioner.resource.gender.toUpperCase()) ||
      "Not Provided",
    phone: `${
      practitioner.resource.telecom.find((item: any) => item.system === "phone")
        .value
    }`,
    email: `${
      practitioner.resource.telecom.find((item: any) => item.system === "email")
        .value
    }`,
  }));
}

export function practitioner(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return;
  }

  console.log(practitioner.address);

  return {
    id: `${practitioner.id}`,
    name: `${practitioner.name[0].family}, ${practitioner.name[0].given[0]}`,
    birthDate: practitioner.birthDate || "Not Provided",
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    phone: `${
      practitioner.telecom.find((item: any) => item.system === "phone").value
    }`,
    email: `${
      practitioner.telecom.find((item: any) => item.system === "email").value
    }`,
    address: `${practitioner.address[0].postalCode},
    ${practitioner.address[0].state},
    ${practitioner.address[0].city}, 
    ${practitioner.address[0].line[0]} 
    ${practitioner.address[0].line[1]}, 
    ${practitioner.address[0].country}
    `,
  };
}

export function appointments(state: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  return appointments.map((appointment: any) => ({
    id: appointment.id,
    practitioner: appointment.participant.find((item: any) =>
      item.actor.reference.includes("Practitioner")
    ).actor.reference,
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  }));
}
