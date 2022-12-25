import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";
import { PractitionerRoles, PractitionerState } from "./types";

export function practitioners(state: any) {
  if (!state.practitioners.length) {
    return [];
  }

  return state.practitioners.map((practitioner: any) => ({
    id: `${practitioner.id}`,
    name: `${practitioner.name[0].prefix[0]}: ${practitioner.name[0].family}, ${practitioner.name[0].given[0]}`,
    photo: {
      type: practitioner.photo ? practitioner.photo[0].contentType : "",
      data: practitioner.photo ? practitioner.photo[0].data : "",
    },
    birthDate: practitioner.birthDate || "Not Provided",
    gender:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email: `${
      practitioner.telecom.find((item: any) => item.system === "email").value ||
      "Not Provided"
    }`,
    active: practitioner.active,
  }));
}

function formatPractitioner(practitioner: any, practitionerRole: any = null) {
  const nameEn = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "ABC"
  );
  const nameJp = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "IDE"
  );

  const bioEn = practitioner.extension.find(
    (item: any) =>
      item && item.extension[0] && item.extension[0].valueString === "en"
  ).valueString;

  const bioJpExt = practitioner.extension.find((item: any) => {
    return item.extension[0].valueString === "ja";
  });
  const bioJp = bioJpExt && bioJpExt.valueString;

  return {
    id: `${practitioner.id}`,
    en: {
      firstName: nameEn.given[0],
      familyName: nameEn.family,
      bio: bioEn,
    },
    jp: {
      firstName: (nameJp && nameJp.given[0]) || "Not Provided",
      familyName: (nameJp && nameJp.family) || "Not Provided",
      bio: bioJp || "Not Provided",
    },
    photo: {
      type: practitioner.photo[0].contentType,
      data: practitioner.photo[0].data,
    },
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email:
      practitioner.telecom.find((item: any) => item.system === "email").value ||
      "Not Provided",
    active: practitioner.active,
    roleType: practitionerRole
      ? practitionerRole.code[0].coding[0].code
      : "Not Provided",
  };
}

export function practitioner(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return;
  }

  return formatPractitioner(practitioner);
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

export function practitionerRole(state: any) {
  const practitionerRole = state.practitionerRole;

  if (!practitionerRole) {
    return;
  }

  // backend will return a response of [{}] when the available time is empty.
  // this filters empty response out.
  const availableTime = practitionerRole.availableTime.filter(
    (av: any) => av.availableStartTime !== undefined
  );

  return {
    id: practitionerRole.id,
    availableTime: availableTime,
    roleType: practitionerRole.code[0].coding[0].code.toUpperCase(),
  };
}

export function practitionerRoles(state: PractitionerState) {
  const practitionerRoles = state.practitionerRoles;

  if (!practitionerRoles.length) {
    return;
  }

  return practitionerRoles.map((practitionerRole) => {
    const practitioner = practitionerRole.practitionerObj;

    const formattedPractitioner = formatPractitioner(
      practitioner,
      practitionerRole
    );
    return formattedPractitioner;
  });
}
