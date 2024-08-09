import { useQRgeneratedata } from "@/zustand/useQrGenerateData";

const useZustand = () => {
  const qrCodeData = useQRgeneratedata((state) => state.data);
  const updateQrCodeData = useQRgeneratedata((state ) => state.updateUserInput);

  return {
    qrCodeData,
    updateQrCodeData,
  };
};

export default useZustand;
