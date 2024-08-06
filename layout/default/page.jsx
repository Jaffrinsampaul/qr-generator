"use client";

import ColorPicker from "@/components/colorPicker/page";
import DragDrop from "@/components/drag&drop/page";
import QrCoderRender from "@/components/qrCodeRender/page";
import { useQRgeneratedata } from "@/zustand/useQrGenerateData";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

const DefaultLayout = ({ children }) => {
  const [backGroundColor, setBackGoundColor] = useState("#ffffff");
  const [foreGroundColor, setForeGround] = useState("#000000");
  const [qrSize, setqrSize] = useState(40);
  const [uploadImage, setUploadImage] = useState(null);
  const [qrCodeData, setQrCode] = useState(null);

  const qrCodeStore = useQRgeneratedata((state) => state.data);
  const updateUserInput = useQRgeneratedata((state) => state.updateUserInput);

  const router = useRouter();
  const searchParams = useSearchParams();

  // const bgColor = searchParams.get("bgColor");
  // const fgColor = searchParams.get("fgColor");
  const currentMode = searchParams.get("mode");
  // const size = searchParams.get("size");

  const handleColor = useCallback((color, type) => {
    console.log("close --->", color, type);
    switch (type) {
      case "bg":
        setBackGoundColor(color);
        // router.replace(
        //   `/?mode=${currentMode}&bgColor=${color}&fgColor=${foreGroundColor}&size`
        // );
        break;
      case "fg":
        setForeGround(color);
        // router.replace(
        //   `/?mode=${currentMode}&bgColor=${bgColor}&fgColor=${color}`
        // );
        break;
    }
  }, []);
  const getGeneratedQR = useCallback(async () => {
    // get generated QR
    const canvas = document.querySelector("canvas");
    const imageDataURI = canvas.toDataURL(qrCodeType, 1.0);
    const blob = await (await fetch(imageDataURI)).blob();
    const qrCode = window.URL.createObjectURL(blob);
    return qrCode;
  }, []);

  const downloadQrCode = useCallback(async () => {
    try {
      const FILE_NAME = "qrcode";
      const qrCode = await getGeneratedQR();
      // Download generated QR
      const anchorTag = document.createElement("a");
      anchorTag.href = qrCode;
      anchorTag.download = `${FILE_NAME}.${qrCodeType}`;
      document.body.appendChild(anchorTag);
      anchorTag.click();
      document.body.removeChild(anchorTag);
    } catch (error) {
      console.error(error.message);
    }
  }, [qrCodeData]);

  const handleGenerateQrCode = useCallback(() => {
    console.log("here");
    setQrCode(qrCodeStore);
  }, [qrCodeStore]);

  const handleRange = useCallback((event) => {
    // router.replace(
    //   `/?mode=${currentMode}&bgColor=${bgColor}&fgColor=${fgColor}&size=${event.target.value}`
    // );

    // const params = URLSearchParams(searchParams.toString());
    // params.set("size", event.target.value);
    // params.

    setqrSize(event.target.value);
  }, []);

  useEffect(() => {
    return () => updateUserInput(null);
  }, []);

  return (
    <main className="w-full h-screen bg-gradient-to-br from-amber-300 to-orange-600">
      <section
        className="w-[100%] h-full border border-black border-opacity-25 
      flex justify-center items-center"
      >
        <div
          className="flex flex-col justify-evenly items-center min-h-[50%] w-[95%] sm:w-[50%] p-[15px] bg-gray-950 backdrop-blur-2xl bg-opacity-15 border border-gray-100
        border-opacity-15 rounded-[10px] gap-y-[30px] transition-all delay-300 duration-200 ease-linear"
        >
          
          {children}
          {currentMode != null ? (
            <>
              {qrCodeData ? (
                <section>
                  <label className="flex flex-col gap-x-[10px] gap-y-[12px] items-center">
                    Drag files to add image to QR code
                    <section className="flex gap-x-[20px] items-center">
                      <DragDrop
                        handleImageSelect={(file) => {
                          setUploadImage(file);
                        }}
                      >
                        <QrCoderRender
                          bgColor={backGroundColor}
                          fgColor={foreGroundColor}
                          url={qrCodeData}
                          uploadImage={uploadImage}
                          size={qrSize}
                        />
                      </DragDrop>
                      {/* <img src={qrCode} alt="dsasdsa" height={100} width={100} /> */}
                      <button
                        onClick={downloadQrCode}
                        className=" text-black text-opacity-30 hover:text-opacity-100 transition-all delay-150 duration-150 ease-linear text-[20px] font-bold capitalize bounce"
                      >
                        download
                      </button>
                    </section>
                  </label>
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
                    defaultvalue={backGroundColor}
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
              <section className="flex items-center gap-x-[10px]">
                <label htmlFor="size">Size</label>
                <input
                  type="range"
                  name=""
                  id="size"
                  value={qrSize}
                  max={1000}
                  min={30}
                  onChange={handleRange}
                />
                <span>{qrSize}</span>
              </section>
              <button
                className="capitalize bg-black bg-opacity-40 hover:bg-opacity-100 transition-all delay-100 duration-150 ease-linear text-white w-[50%] h-[35px] rounded-[10px]"
                onClick={handleGenerateQrCode}
              >
                genrator QR code
              </button>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default memo(DefaultLayout);
