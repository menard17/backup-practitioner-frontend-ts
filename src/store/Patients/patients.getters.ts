import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function patients(state: any) {
  if (!state.patients.length) {
    return [];
  }
  return state.patients.map((patient: any) => ({
    id: `${patient.resource.id}`,
    name: `${patient.resource.name[0].family}, ${patient.resource.name[0].given[0]}`,
    birthDate: patient.resource.birthDate || "Not Provided",
    sex:
      (patient.resource.gender && patient.resource.gender.toUpperCase()) ||
      "Not Provided",
    phone: `${
      patient.resource.telecom.find((item: any) => item.system === "phone")
        .value
    }`,
    email: `${
      patient.resource.telecom.find((item: any) => item.system === "email")
        .value
    }`,
  }));
}

export function patient(state: any) {
  const patient = state.patient;

  if (!patient) {
    return;
  }

  console.log(patient.address);

  return {
    id: `${patient.id}`,
    name: `${patient.name[0].family}, ${patient.name[0].given[0]}`,
    birthDate: patient.birthDate || "Not Provided",
    sex: (patient.gender && patient.gender.toUpperCase()) || "Not Provided",
    phone: `${
      patient.telecom.find((item: any) => item.system === "phone").value
    }`,
    email: `${
      patient.telecom.find((item: any) => item.system === "email").value
    }`,
    address: `${patient.address[0].postalCode},
    ${patient.address[0].state},
    ${patient.address[0].city}, 
    ${patient.address[0].line[0]} 
    ${patient.address[0].line[1]}, 
    ${patient.address[0].country}
    `,
  };
}

export function appointments(state: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  return appointments.map((appointment: any) => ({
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
