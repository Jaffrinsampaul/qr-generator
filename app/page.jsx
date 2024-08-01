"use client";

import ColorPicker from "@/components/colorPicker/page";
import { generateQRCode } from "@/service";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
const Home = () => {
  const [url, setUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [qrCodeType, setQrCodeType] = useState("png");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [foreGroundColor, setForeGround] = useState("#000000");

  const KEY_NAME = "Enter";
  const handleUrl = useCallback((event) => setUrl(event.target.value), [url]);

  const handleEnterKey = useCallback(
    (event) =>
      event.key === KEY_NAME
        ? apicall(
            url,
            qrCodeType,
            modifileColorCode(bgColor),
            modifileColorCode(foreGroundColor)
          )
        : null,
    [url]
  );

  const handleColor = useCallback((color, type) => {
    console.log("close --->", color, type);
    switch (type) {
      case "bg":
        setBgColor(color);
        break;
      case "fg":
        setForeGround(color);
        break;
    }
  }, []);

  const modifileColorCode = useCallback((colorCode) => {
    console.log(colorCode);
    return colorCode.replaceAll("#", "");
  }, []);

  const downloadQrCode = useCallback(async () => {
    try {
      const FILE_NAME = "qrcode";
      const anchorTag = document.createElement("a");
      anchorTag.href = qrCode;
      anchorTag.download = `${FILE_NAME}.${qrCodeType}`;
      document.body.appendChild(anchorTag);
      anchorTag.click();
      document.body.removeChild(anchorTag);
    } catch (error) {
      console.error(error.message);
    }
  }, [url, qrCode]);

  const apicall = useCallback(async () => {
    console.log("url --->", url);
    const response = await generateQRCode(url, qrCodeType, bgColor, foreGroundColor);
    const image = URL.createObjectURL(response);
    setQrCode(image);
    return image;
  }, [url, qrCodeType, bgColor, foreGroundColor]);
  return (
    <main className="w-full h-screen bg-white ">
      <section
        className="w-[100%] h-full border border-black border-opacity-25 
      flex justify-center items-center"
      >
        <div
          className="flex flex-col justify-evenly items-center min-h-[40%] w-[50%] p-[15px] 
        border border-black border-opacity-15 rounded-[10px] gap-y-[30px] transition-all delay-300 duration-200 ease-linear"
          style={{
            boxShadow: "#d3d3d3 1px 5px 8px ",
          }}
        >
          <header className="text-center">
            <h1 className="text-[20px] font-bold">QR Code Generator</h1>
            {/* <h3 className="font-semibold text-[15px]">
              Enter any text to genrator a QR code
            </h3> */}
          </header>
          <label for="content" className="flex flex-col w-[70%] gap-y-[5px]">
            <input
              id="content"
              type="text"
              value={url}
              // onKeyDown={handleEnterKey}
              onChange={handleUrl}
              className="text-black indent-[10px] focus:outline-none placeholder:text-center"
              placeholder="Enter any text to genrator a QR code"
            />
          </label>
          {qrCode ? (
            <section className="flex gap-x-[10px] items-center">
              <img src={qrCode} alt="dsasdsa" height={100} width={100} />
              <button onClick={downloadQrCode} className=" text-blue-500 text-opacity-30 hover:text-opacity-100 transition-all delay-150 duration-150 ease-linear text-[20px] font-bold capitalize bounce">
                download
              </button>
            </section>
          ) : (
            <p>QR Not found </p>
          )}

          <section className="flex gap-x-[50px]">
            <article className="flex gap-x-[10px] items-center">
              <h4 className="capitalize">background color</h4>
              <ColorPicker
                selectedColor={handleColor}
                type="bg"
                defaultvalue={bgColor}
              />
            </article>
            <article className="flex gap-x-[10px] items-center">
              <h4 className="capitalize">foreground color</h4>
              <ColorPicker
                selectedColor={handleColor}
                type="fg"
                defaultvalue={foreGroundColor}
              />
            </article>
          </section>
          <button
            className="capitalize bg-black bg-opacity-40 hover:bg-opacity-100 transition-all delay-150 duration-150 ease-linear text-white w-[50%] h-[35px] rounded-[10px]"
            onClick={apicall}
          >
            genrator QR code
          </button>
        </div>
      </section>
    </main>
  );
};

export default memo(Home);
