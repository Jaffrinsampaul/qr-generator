import QrCode from "qrcode.react";

const QrCoderRender = ({ url, bgColor, fgColor, size, uploadImage }) => {
  return (
    <>
      {url ? (
        <QrCode
          value={url}
          bgColor={bgColor}
          fgColor={fgColor}
          imageSettings={{ src: uploadImage }}
          level="M"
          includeMargin
        />
      ) : (
        ""
      )}
    </>
  );
};

export default QrCoderRender;
