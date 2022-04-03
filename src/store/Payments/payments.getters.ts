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
