import { Porter, PortersState } from "./types";

export const porters = (state: PortersState) => {
  return state.porters.map((porter: Porter) => ({
    active: porter.active,
    name: porter.name,
    area: porter.area,
    documentId: porter.documentId,
    ref: porter.ref,
  }));
};

export const isLoading = (state: PortersState): boolean => {
  return state.loadingData.porters.isLoading;
};

export const portersFromArea = (state: PortersState) => (area: string) => {
  return state.porters
    .filter((porter: Porter) => porter.area == area && porter.active == true)
    .map((porter: Porter) => porter.name);
};

export const porterIdFromName = (state: PortersState) => (name: string) => {
  const nameList = state.porters
    .filter((porter: Porter) => porter.name === name)
    .map((porter: Porter) => porter.id);

  if (nameList.length > 0) {
    return nameList[0];
  }
  return "";
};
