import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export function practitioners(state: any) {
  if (!state.practitioners.length) {
    return [];
  }

  return state.practitioners.map((practitioner: any) => ({
    id: `${practitioner.id}`,
    name: `${practitioner.name[0].prefix[0]}: ${practitioner.name[0].family}, ${practitioner.name[0].given[0]}`,
    photo: {
      type: practitioner.photo[0].contentType,
      data: practitioner.photo[0].data,
    },
    birthDate: practitioner.birthDate || "Not Provided",
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email: `${
      practitioner.telecom.find((item: any) => item.system === "email").value ||
      "Not Provided"
    }`,
    active: practitioner.active,
  }));
}

export function practitioner(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return;
  }

  return {
    id: `${practitioner.id}`,
    firstName: practitioner.name[0].given[0],
    familyName: practitioner.name[0].family,
    birthDate: practitioner.birthDate || "Not Provided",
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email: `${
      practitioner.telecom.find((item: any) => item.system === "email").value
    }`,
    active: practitioner.active,
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

export function practitionerNameEn(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return "";
  }

  const name = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "ABC"
  );

  const fullName =
    `${name && name.prefix && name.prefix[0]} ${name && name.text}` ||
    "Not Provided";

  return fullName;
}

export function practitionerNameJp(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return "";
  }

  const name = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "IDE"
  );

  const fullName =
    `${name && name.prefix && name.prefix[0]} ${name && name.text}` ||
    "Not Provided";

  return fullName;
}

export function zoomId(state: any) {
  const practitionerRole = state.practitionerRole;
  if (!practitionerRole) {
    return "";
  }
  return practitionerRole.extension.find((item: any) => item.url === "zoom-id")
    .valueString;
}

export function zoomPasscode(state: any) {
  const practitionerRole = state.practitionerRole;
  if (!practitionerRole) {
    return "";
  }
  return practitionerRole.extension.find(
    (item: any) => item.url === "zoom-passcode"
  ).valueString;
}
