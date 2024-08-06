import { MODES } from "@/utils/constant";

const Modes = ({ selectedModes }) => {
  return (
    <section className=" flex flex-col gap-[10px] w-full justify-between items-center flex-1 ">
      <h1 className="font-semibold text-[20px]">Qr Modes</h1>
      <section className="flex flex-wrap content-baseline gap-x-[15px] gap-y-[25px] flex-[.7] overflow-auto w-full  p-[10px] pt-[15px]">
        {MODES.map((mode, key) => (
          <button
            key={`${mode} - ${key}}`}
            className="capitalize w-[100px] h-[30px] font-semibold border rounded-[10px] border-black 
          hover:border-white hover:text-white hover:font-normal modes
          transition-all delay-150 duration-150 ease-in-out"
            onClick={() => selectedModes(mode)}
          >
            <p className="text-opacity-5">{mode}</p>
          </button>
        ))}
      </section>
    </section>
  );
};

export default Modes;
