import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { IconContext } from "react-icons";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="q0adsgml"
      options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div onClick={() => open?.()}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <IconContext.Provider
                value={{
                  color: `${cn("white dark:black")}`,
                  size: "38px",
                }}>
                <div className="transition-all">
                  <TbPhotoPlus />
                </div>
              </IconContext.Provider>
            </div>

            {value && (
              <div className="absolute inset-0 w-full h-full z-50">
                <Image
                  src={value}
                  alt="upload"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
