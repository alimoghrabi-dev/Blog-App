"use client";

import { cn } from "@/lib/utils";
import { SafeBlogs, SafeUser } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconContext } from "react-icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";

interface BlogProps {
  key: string;
  data: SafeBlogs;
  currentUser?: SafeUser | null;
}

const SingleBlog = ({ data, key, currentUser }: BlogProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onDelete = () => {
    axios
      .delete(`/api/story/${data.id}`)
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          router.refresh();
        }, 4000);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <div className="relative rounded-full shadow-md">
        <Image
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(`/story/${data.id}`)}
          src={data.imageSrc}
          alt={data.name}
          width={75}
          height={75}
          className={`rounded-full cursor-pointer transition-all shadow-2xl bg-gray-300 ${
            isHovered ? "opacity-20" : ""
          }`}
        />

        {data.userId === currentUser?.id && isHovered && (
          <IconContext.Provider
            value={{
              color: `${cn("brown")}`,
              size: "24px",
            }}>
            <div className="transition-all">
              <RiDeleteBin5Line
                onMouseEnter={handleMouseEnter}
                onClick={onDelete}
                className="cursor-pointer object-contain absolute top-[33.5%] left-[33.5%]"
              />
            </div>
          </IconContext.Provider>
        )}
      </div>
      <p className="text-[15px] leading-[24px] font-normal">{data.name}</p>
      {alert && (
        <div className="fixed top-0 left-[42%]">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Story have been deleted successfully!</AlertTitle>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
