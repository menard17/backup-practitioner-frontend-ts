export const stringToBase64 = (str: string) =>
  new Promise((resolve, reject) => {
    resolve(btoa(unescape(encodeURIComponent(str))));
  });

export const base64ToString = (str: string) =>
  decodeURIComponent(escape(atob(str)));

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const resizeImage = function (settings: { file?: any; maxSize?: any }) {
  const { file } = settings;
  const { maxSize } = settings;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const dataURItoBlob = (dataURI: string) => {
    const bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i += 1) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ia], { type: mime });
  };
  const resize = () => {
    let { width, height } = image;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
    canvas.width = width;
    canvas.height = height;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return;
    }
    canvasContext.drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/png");
    return dataURItoBlob(dataUrl);
  };
  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }
    reader.onload = function (readerEvent) {
      image.onload = function () {
        return ok(resize());
      };
      if (!readerEvent.target) {
        return;
      }
      image.src = readerEvent.target.result as string;
    };
    reader.readAsDataURL(file);
  });
};
