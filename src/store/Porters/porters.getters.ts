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
