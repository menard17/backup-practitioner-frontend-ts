import { Porter, PortersState } from "./types";

type loadingAction = {
  action: "porters";
  value: boolean;
};

export const setIsLoading = (
  state: PortersState,
  { action, value }: loadingAction
) => {
  state.loadingData[action].isLoading = value;
};

export const setPorters = (state: PortersState, porters: Porter[]) => {
  state.porters = porters;
};

export const updatePorter = (state: PortersState, porter: Porter) => {
  const index = state.porters.findIndex(
    (item) => item.documentId === porter.documentId
  );

  if (state.porters.length > index + 1) {
    state.porters = [
      ...state.porters.slice(0, index),
      porter,
      ...state.porters.slice(index + 1),
    ];
  } else {
    state.porters = [...state.porters.slice(0, index), porter];
  }
};
