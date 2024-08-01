import { memo, useCallback, useEffect, useRef, useState } from "react";

const ColorPicker = ({ selectedColor, type, defaultvalue }) => {
  const [currentColor, setCurrentColor] = useState(defaultvalue);
  const colorRef = useRef(null);

  const handleColorChange = useCallback((event) => {
    console.log(event.target.value);
    setCurrentColor(event.target.value);
  }, []);

  const tiggerColorPicker = useCallback(() => {
    colorRef.current.click();
  }, [colorRef]);

  useEffect(() => {
    return () => {
      selectedColor(currentColor, type);
    };
  }, [currentColor]);
  console.log("current color -->", currentColor);
  return (
    <>
      <button
        className={` h-[30px] w-[30px] rounded-[5px] border relative`}
        style={{ backgroundColor: `${currentColor}` , boxShadow: "#d3d3d3 1px 1px 1px 1px"}}
        onClick={tiggerColorPicker}
      >
        <input
          type="color"
          className=" absolute w-0 h-0"
          onChange={handleColorChange}
          value={currentColor}
          ref={colorRef}
          // onSubmit={()=>{
          //   console.log("here")
          // }}
        />
      </button>
    </>
  );
};

export default memo(ColorPicker);
