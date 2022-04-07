export function setIsLoading(state: any, { action, value }: any) {
  state.loadingData[action].isLoading = value;
}
