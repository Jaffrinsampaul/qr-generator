"use client";
import Modes from "@/components/modes/page";
import DefaultLayout from "@/layout/default/page";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, Suspense, useCallback, useEffect, useState } from "react";
import PhoneQR from "../components/phone/page";
import TextQr from "@/components/text/page";
import EmailQr from "@/components/email/page";
import WifiQr from "@/components/wifi/page";
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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DefaultLayout>
        {currentMode == null ? (
          <Modes selectedModes={handleSelectModes} />
        ) : currentMode === "text" ? (
          <TextQr data={currentData} />
        ) : currentMode === "phone" ? (
          <PhoneQR data={currentData} />
        ) : currentMode === "email" ? (
          <EmailQr data={currentData} />
        ) : currentMode === "wifi" ? (
          <WifiQr />
        ) : (
          <p>Under dev</p>
        )}

        {/* sdsadas */}
        {/* <TextQr/> */}
      </DefaultLayout>
    </Suspense>
  );
};

export default memo(Home);
