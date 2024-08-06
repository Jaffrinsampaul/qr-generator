"use client";
import { useCallback, useState } from "react";
import { useQRgeneratedata } from "@/zustand/useQrGenerateData";

const TextQr = () => {
  const [content, setContent] = useState(null);

  const updateUserInput = useQRgeneratedata((state) => state.updateUserInput);

  const handleUrl = useCallback(
    (event) => updateUserInput(event.target.value),
    []
  );

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
          type="text"
          value={updateUserInput}
          // onKeyDown={handleEnterKey}
          onChange={handleUrl}
          className="text-black indent-[10px] bg-transparent focus:outline-none placeholder:text-center placeholder:text-black placeholder:text-opacity-55"
          placeholder="Enter any text to genrator a QR code"
        />
      </label>
    </>
  );
};

export default TextQr;
