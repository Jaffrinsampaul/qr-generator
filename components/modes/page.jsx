import { MODES } from "@/utils/constant";
import Image from "next/image";
import RenderSVG from "../renderSVG/page";

const Modes = ({ selectedModes }) => {
  const svgs = [
    {
      id: 1,
      svg: (
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    // Add more SVG objects here if needed
  ];
  return (
    <section className=" flex flex-col gap-[10px] w-full justify-between items-center flex-1 ">
      <section className="flex flex-col gap-y-[20px] items-center">
        <h1 className="font-semibold text-[20px]">Qr Modes</h1>
        <h2 className="opacity-60">Create QR codes for various purposes</h2>
      </section>
      <section className="flex flex-wrap content-baseline gap-x-[15px] gap-y-[25px] max-h-[400px] flex-[.7] overflow-auto w-full p-[10px] pt-[15px]">
        {MODES.map((mode, key) => (
          <button
            key={`${mode} - ${key}}`}
            className="capitalize min-w-[32%] max-w-[45%] min-h-[20px] font-semibold border rounded-[10px] border-black 
          hover:border-white hover:text-white hover:font-normal modes border-opacity-35
          transition-all delay-150 duration-150 ease-in-out flex justify-between items-center gap-x-[10px] p-[10px]"
            onClick={() => selectedModes(mode.name)}
          >
            <div className="svg-box flex justify-center items-center">
              {mode.icon}
            </div>
            <div className="flex flex-col justify-between items-start w-full ">
              <h1 className="text-opacity-5 ">{mode.name}</h1>
              <p className="font-normal text-[10px]">{mode.description}</p>
              {/* <h2 className="">Create</h2> */}
            </div>
          </button>
        ))}
      </section>

    </section>
  );
};


// "WIFI:S:Jebikson Jaffrin;T:WEP;P:johnsi5404;H:false;;"

export default Modes;
