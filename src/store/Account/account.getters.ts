export function practitioner(state: any) {
  const practitioner = state.practitioner;

  if (!practitioner) {
    return;
  }

  const nameEn = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "ABC"
  );
  const nameJp = practitioner.name.find(
    (item: any) => item.extension[0].valueString === "IDE"
  );

  const bioEn = practitioner.extension.find(
    (item: any) => item.extension[0].valueString === "en"
  ).valueString;

  const bioJp = practitioner.extension.find(
    (item: any) => item.extension[0].valueString === "ja"
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
      type: practitioner.photo[0].contentType,
      data: practitioner.photo[0].data,
    },
    sex:
      (practitioner.gender && practitioner.gender.toUpperCase()) ||
      "Not Provided",
    email: `${
      practitioner.telecom.find((item: any) => item.system === "email").value
    }`,
  };
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
    zoomId: practitionerRole.extension.find(
      (item: any) => item.url === "zoom-id"
    ).valueString,
    zoomPasscode: practitionerRole.extension.find(
      (item: any) => item.url === "zoom-passcode"
    ).valueString,
    roleType: practitionerRole.code[0].coding[0].code.toUpperCase(),
  };
}
