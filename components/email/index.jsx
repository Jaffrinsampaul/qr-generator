import { useQRgeneratedata } from "@/zustand/useQrGenerateData";
import { useCallback, useState } from "react";

const EmailQr = () => {
  const [mailto, setMailto] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const updateQrData = useQRgeneratedata((state) => state.updateUserInput);
  const qrData = useQRgeneratedata((state) => state.data);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "mailto":
        setMailto(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "body":
        setBody(value);
        break;
    }
    updateQrData(createPayloadUpdateQrData());
  };
  const createPayloadUpdateQrData = () =>
    `mailto:${mailto}?subject=${subject}&body=${body}`;

  const handleUrl = useCallback((event) => {
    const userInput = event.target.value;
    // if (acceptNumberOnly(userInput))
    updateQrData(userInput);
    // else alert("Number only");
  }, []);
  // mailto:jaffrin@gmail.com?subject=ddsfdfsd&body=dfsifdsf
  return (
    <>
      <header className="text-center">
        <h1 className="text-[20px] font-bold">QR Code Generator</h1>
      </header>
      <label
        for="content"
        className="flex flex-col sm:w-[70%] w-[90%] gap-y-[20px]"
      >
        <input
          id="content"
          type="email"
          value={mailto}
          name="mailto"
          onChange={handleUserInput}
          className="text-black indent-[10px] bg-transparent focus:outline-none placeholder:text-center placeholder:text-black placeholder:text-opacity-55 
          border border-black rounded-[10px] h-[45px]"
          placeholder="Enter emailId to genrator a QR code"
        />
        <input
          id="content"
          type="text"
          value={subject}
          name="subject"
          onChange={handleUserInput}
          className="text-black indent-[10px] bg-transparent focus:outline-none placeholder:text-center placeholder:text-black placeholder:text-opacity-55 
          border border-black rounded-[10px] h-[45px]"
          placeholder="Enter subject"
        />
        <textarea
          id="content"
          type="text"
          name="body"
          value={body}
          onChange={handleUserInput}
          className="text-black indent-[10px] bg-transparent focus:outline-none placeholder:text-center pt-[10px]
           placeholder:text-black placeholder:text-opacity-55 resize-none min-h-[70px] border border-black rounded-[10px]"
          placeholder="Enter message "
        />
      </label>
    </>
  );
};

export default EmailQr;
