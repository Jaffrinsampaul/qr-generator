"use client";

import ColorPicker from "@/components/colorPicker/page";
import DragDrop from "@/components/drag&drop/page";
import Modes from "@/components/modes/page";
import QrCoderRender from "@/components/qrCodeRender/page";
import DefaultLayout from "@/layout/default";
import { generateQRCode } from "@/service";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import PhoneQR from "../components/phone/page";
import TextQr from "@/components/text/page";
import EmailQr from "@/components/email/page";
const Home = () => {
  // const [currentMode, setCurrentMode] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get("mode");
  const currentData = searchParams.get("data");
  const updateQueryParam = useCallback(
    (mode) => router.push(`?mode=${mode}`),
    []
  );
  const handleSelectModes = useCallback(
    (selectedMode) => updateQueryParam(selectedMode),
    []
  );
  console.log("modes--->", currentMode);
  return (
    <DefaultLayout>
      {currentMode == null? (
        <Modes selectedModes={handleSelectModes} />
      ) : currentMode === "text" ? (
        <TextQr data={currentData} />
      ) : currentMode === "phone" ? (
        <PhoneQR data={currentData} />
      ) : currentMode === "email" ? (
        <EmailQr data={currentData} />
      ) : (
        <p>Under dev</p>
      )}

      {/* sdsadas */}
      {/* <TextQr/> */}
    </DefaultLayout>
  );
};

export default memo(Home);
