import QrCode from "qrcode.react";

const QrCoderRender = ({ url, bgColor, fgColor, size, uploadImage }) => {
  return (
    <>
      {url ? (
        <QrCode
          size={size}
          value={url}
          bgColor={bgColor}
          fgColor={fgColor}
          imageSettings={{ src: uploadImage }}
          level="H"
          includeMargin
          style={{overflow:"hidden", height:"100px", width:"100px"}}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default QrCoderRender;
