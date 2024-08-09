import useZustand from "@/hooks/useZustand";
import Image from "next/image";
import { useCallback, useState } from "react";

// import visibleIcons from "./"

const WifiQr = () => {
  const [SSID, setSSID] = useState(null);
  const [password, setPassword] = useState(null);
  const [encryption, setEncryption] = useState("WPA");
  const [isVisible, setIsVisible] = useState(false);

  const handleInput = useCallback((event) => {
    const { value, name } = event.target;
    console.log(value, name);
    switch (name) {
      case "ssid":
        setSSID(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "encryption":
        setEncryption(value);
        break;
    }
  }, []);

  const handleVisible = () => setIsVisible((visible) => !visible);

  const { qrCodeData, updateQrCodeData } = useZustand();
  //   WIFI:S:Jebikson Jaffrin;T:WEP;P:johnsi5404;H:false;;
  return (
    <>
      <header className="text-center">
        <h1 className="text-[20px] font-bold">QR Code Generator</h1>
      </header>
      <section className="flex gap-[20px]  flex-wrap w-[100%]">
        <label
          for="content"
          className="flex flex-col sm:w-[47%]  w-[30%] gap-y-[5px] bg-slate-200 "
        >
          <input
            id="content"
            type="text"
            name="ssid"
            value={SSID}
            onChange={handleInput}
            className="text-black indent-[10px] h-[40px] bg-transparent focus:outline-none placeholder:text-center
             placeholder:text-black placeholder:text-opacity-55"
            placeholder="Enter SSID"
          />
        </label>
        <label
          htmlFor="password"
          className="flex gap-x-[20px] sm:w-[47%] w-[60%] gap-y-[5px] bg-slate-200 "
        >
          <input
            id="content"
            name="password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handleInput}
            className="text-black indent-[10px] h-[40px] bg-transparent w-[85%] 
            focus:outline-none placeholder:text-center placeholder:text-black placeholder:text-opacity-55"
            placeholder="Enter password"
          />
          <button onClick={handleVisible}>
            <Image
              src={isVisible ? "/asset/visibility.png" : "/asset/visible.png"}
              alt="icons"
              height={20}
              width={20}
            />
          </button>
        </label>
        <label
          for="content"
          className="flex flex-col sm:w-[47%]] w-[60%] gap-y-[5px] "
        >
          <select
            name="encryption"
            value={encryption}
            id=""
            onChange={handleInput}
            className="h-[40px] rounded-[10px] p-[10px]"
          >
            <option value="WPA">WPA</option>
            <option value="WEP">WEP</option>
          </select>
        </label>
      </section>
    </>
  );
};

export default WifiQr;
