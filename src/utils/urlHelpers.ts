export const convertParams = (params: string) => {
  const paramHash: any = {};
  if (params === undefined) {
    return paramHash;
  }
  const paramList = params.split("&");
  for (let i = 0; i < paramList.length; i += 1) {
    const param = paramList[i].split("=");
    const [key, value] = param;
    paramHash[key] = value;
  }
  return paramHash;
};
