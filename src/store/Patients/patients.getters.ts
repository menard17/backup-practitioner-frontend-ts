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

  return {
    id: `${patient.id}`,
    firstName: patient.name[0].given[0],
    familyName: patient.name[0].family,
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
    id: appointment.id,
    practitioner: {
      id: appointment.practitioner.id,
      firstName: appointment.practitioner.name[0].given[0],
      familyName: appointment.practitioner.name[0].family,
    },
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  }));
}

export function paymentMethods(state: any) {
  const paymentMethods = state.paymentMethods;

  if (!paymentMethods.length) {
    return [];
  }

  return paymentMethods.map((method: any) => ({
    id: method.id,
    customer: method.customer,
    name: method.billing_details.name,
    brand: method.card.brand.toUpperCase(),
    last4: `x${method.card.last4}`,
    exp: `${method.card.exp_month}-${method.card.exp_year}`,
  }));
}

export function insuranceCard(state: any) {
  const documentReferences = state.documentReferences;
  if (!documentReferences.length) {
    return [];
  }
  const insuranceCard = documentReferences.find((document: any) =>
    document.type.coding.find((code: any) => code.code === "64290-0")
  );

  if (!insuranceCard) {
    return null;
  }

  return insuranceCard.content;
}

export function medicalRecord(state: any) {
  const documentReferences = state.documentReferences;

  if (!documentReferences.length) {
    return [];
  }

  const medicalRecord = documentReferences.find((document: any) =>
    document.type.coding.find((code: any) => code.code === "34117-2")
  );

  if (!medicalRecord) {
    return null;
  }

  return medicalRecord.content;
}
