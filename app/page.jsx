"use client";

import ColorPicker from "@/components/colorPicker/page";
import DragDrop from "@/components/drag&drop/page";
import QrCoderRender from "@/components/qrCodeRender/page";
import { generateQRCode } from "@/service";
import { memo, useCallback, useState } from "react";
const Home = () => {
  const [url, setUrl] = useState(null);
  const [content, setContent] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [qrCodeType, setQrCodeType] = useState("png");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [foreGroundColor, setForeGround] = useState("#000000");
  const [uploadImage, setUploadImage] = useState("");

  const handleUrl = useCallback(
    (event) => setContent(event.target.value),
    [content]
  );

  const handleGenerateQrCode = useCallback(() => {
    setUrl(content);
  }, [content]);

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
  }, [url]);

  return (
    <main className="w-full h-screen bg-white ">
      <section
        className="w-[100%] h-full border border-black border-opacity-25 
      flex justify-center items-center"
      >
        <div
          className="flex flex-col justify-evenly items-center min-h-[40%] w-[95%] sm:w-[50%] p-[15px] 
        border border-black border-opacity-15 rounded-[10px] gap-y-[30px] transition-all delay-300 duration-200 ease-linear"
          style={{
            boxShadow: "#d3d3d3 1px 5px 8px ",
          }}
        >
          <header className="text-center">
            <h1 className="text-[20px] font-bold">QR Code Generator</h1>
          </header>
          <label for="content" className="flex flex-col sm:w-[70%] w-[90%] gap-y-[5px]">
            <input
              id="content"
              type="text"
              value={content}
              // onKeyDown={handleEnterKey}
              onChange={handleUrl}
              className="text-black indent-[10px] focus:outline-none placeholder:text-center"
              placeholder="Enter any text to genrator a QR code"
            />
          </label>
          {url ? (
            <section className="flex gap-x-[10px] items-center">
              <label className="flex flex-col gap-x-[10px] items-center">
                Drag files to add image to QR code
                <section className="flex gap-x-[10px] items-center">
                  <DragDrop
                    handleImageSelect={(file) => {
                      setUploadImage(file);
                    }}
                  >
                    <QrCoderRender
                      bgColor={bgColor}
                      fgColor={foreGroundColor}
                      url={url}
                      uploadImage={uploadImage}
                    />
                  </DragDrop>
                  {/* <img src={qrCode} alt="dsasdsa" height={100} width={100} /> */}
                  <button
                    onClick={downloadQrCode}
                    className=" text-blue-500 text-opacity-30 hover:text-opacity-100 transition-all delay-150 duration-150 ease-linear text-[20px] font-bold capitalize bounce"
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
            onClick={handleGenerateQrCode}
          >
            genrator QR code
          </button>
        </div>
      </section>
    </main>
  );
};

export default memo(Home);
