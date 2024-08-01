import { useDropzone } from "react-dropzone";

const DragDrop = ({ handleImageSelect, children }) => {
  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: async (arrayOfFiles) => {
      const b64URL = await getBase64Representation(arrayOfFiles[0]);
      handleImageSelect(b64URL);
    },
  });

  const getBase64Representation = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <section {...getRootProps({ className: "form_group" })}>
      <input {...getInputProps()} />
      <label>
        Drag files to add image to QR code
        {children}
      </label>
    </section>
  );
};

export default DragDrop;
