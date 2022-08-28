import {
  AccountState,
  AvailableTime,
  BioExtension,
  Extension,
  HumanName,
  Telecom,
} from "./types";

export const practitioner = (state: AccountState) => {
  const practitioner = state.practitioner;
  const firebaseRole = state.firebaseRole;

  if (!practitioner) {
    return;
  }

  const nameEn = practitioner.name.find((item: HumanName) => {
    return item.extension[0].valueString === "ABC";
  });
  const nameJp = practitioner.name.find(
    (item: HumanName) => item.extension[0].valueString === "IDE"
  );

  if (firebaseRole == "Staff") {
    return {
      id: `${practitioner.id}`,
      en: {
        firstName: nameEn.given[0],
        familyName: nameEn.family,
      },
      jp: {
        firstName: nameJp.given[0],
        familyName: nameJp.family,
      },
      sex:
        (practitioner.gender && practitioner.gender.toUpperCase()) ||
        "Not Provided",
      email: practitioner.telecom.find(
        (item: Telecom) => item.system === "email"
      ).value,
    };
  }

  const bioEn = practitioner.extension.find(
    (item: BioExtension) => item.extension[0].valueString === "en"
  ).valueString;

  const bioJp = practitioner.extension.find(
    (item: BioExtension) => item.extension[0].valueString === "ja"
  ).valueString;

  return {
    id: `${practitioner.id}`,
    en: {
      firstName: nameEn.given[0],
      familyName: nameEn.family,
      bio: bioEn,
    },
    jp: {
      firstName: nameJp.given[0],
      familyName: nameJp.family,
      bio: bioJp,
    },
    photo: {
      type: practitioner.photo?.[0].contentType,
      data: practitioner.photo?.[0].data,
    },
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email: practitioner.telecom.find((item: Telecom) => item.system === "email")
      .value,
    active: practitioner.active,
  };
};

export const practitionerRole = (state: AccountState) => {
  const practitionerRole = state.practitionerRole;
  const firebaseRole = state.firebaseRole;

  if (!practitionerRole) {
    return;
  }

  // backend will return a response of [{}] when the available time is empty.
  // this filters empty response out.
  const availableTime = practitionerRole.availableTime.filter(
    (av: AvailableTime) => av.availableStartTime !== undefined
  );

  if (firebaseRole == "Staff") {
    return {
      id: practitionerRole.id,
      availableTime: availableTime,
      roleType: "STAFF",
    };
  }

  return {
    id: practitionerRole.id,
    availableTime: availableTime,
    zoomId: practitionerRole.extension
      ? practitionerRole.extension.find(
          (item: Extension) => item.url === "zoom-id"
        ).valueString
      : "",
    zoomPasscode: practitionerRole.extension
      ? practitionerRole.extension.find(
          (item: Extension) => item.url === "zoom-passcode"
        ).valueString
      : "",
    roleType: practitionerRole.code[0].coding[0].code.toUpperCase(),
    active: practitionerRole.active,
    period: {
      start: practitionerRole.period.start,
      end: practitionerRole.period.end,
    },
  };
};
