import { useCallback, useState } from "react";
import acceptNumberOnly from "@/utils/numberVaidationReg";
import { useQRgeneratedata } from "@/zustand/useQrGenerateData";

const PhoneQR = () => {
  const updateQrData = useQRgeneratedata((state) => state.updateUserInput);
  const qrData = useQRgeneratedata((state) => state.data);

  const handleUrl = useCallback((event) => {
    const userInput = event.target.value;
    if (acceptNumberOnly(userInput)) updateQrData(userInput);
    else alert("Number only");
  }, []);

  return (
    <>
    <header className="text-center">
            <h1 className="text-[20px] font-bold">QR Code Generator</h1>
          </header>
      <label
        for="content"
        className="flex flex-col sm:w-[70%] w-[90%] gap-y-[5px]"
      >
        <input
          id="content"
          type="tel"
          value={qrData}
          onChange={handleUrl}
          className="text-black indent-[10px] bg-transparent focus:outline-none placeholder:text-center placeholder:text-black placeholder:text-opacity-55"
          placeholder="Enter any phonenumber to genrator a QR code"
        />
      </label>
    </>
  );
};

export default PhoneQR;
