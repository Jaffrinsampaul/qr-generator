const generateQRCode = async (convertUrl, format, bgColor, fbColor) => {
  try {
    const URL = `https://api.api-ninjas.com/v1/qrcode?format=${format}&data=${convertUrl}&X-Api-Key=${process.env.API_KEY}&fg_color=${fbColor}&bg_color=${bgColor}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.API_KEY,
        Accept: "image/png",
      },
      responseType: "arraybuffer",
    }).then((res) => {
      console.log("response --->", res);
      if (res.status !== 200) {
        throw new Error("error while creating QR code, try some time latter");
      }

      return res.blob();
    });
    console.log("response after complete and api --->", response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { generateQRCode };
