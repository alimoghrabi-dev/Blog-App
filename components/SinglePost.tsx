"use client";

import { cn } from "@/lib/utils";
import { SafePosts, SafeUser } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconContext } from "react-icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Alert, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";

interface PostProps {
  key: string;
  data: SafePosts;
  currentUser?: SafeUser | null;
}

const SinglePost = ({ data, key, currentUser }: PostProps) => {
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
      .delete(`/api/post/${data.id}`)
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

  const createdAtDate = new Date(data.createdAt);
  const formattedDate = createdAtDate.toISOString().split("T")[0];

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2.5">
      <div className="w-[520px] flex flex-col sm:flex-row items-center justify-start gap-0 sm:gap-5">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-[40%] rounded-lg relative">
          <Image
            onClick={() => router.push(`/story/${data.id}`)}
            src={data.imageSrc}
            alt={data.name}
            width={200}
            height={200}
            className={`rounded-lg w-full h-full transition-all bg-gray-200 ${
              isHovered ? "opacity-20" : ""
            }`}
          />
          {data.userId === currentUser?.id && isHovered && (
            <IconContext.Provider
              value={{
                color: `${cn("brown")}`,
                size: "28px",
              }}>
              <div className="transition-all absolute top-[41.2%] left-[43%] z-50">
                <RiDeleteBin5Line
                  onMouseEnter={handleMouseEnter}
                  onClick={onDelete}
                  className="cursor-pointer object-contain absolute top-[33.5%] left-[33.5%]"
                />
              </div>
            </IconContext.Provider>
          )}
        </div>
        <div className="w-[60%] h-[186px] flex flex-col items-center sm:items-start justify-evenly gap-0 sm:gap-2.5">
          <p
            className={`w-[50%] text-center sm:text-start text-[18px] leading-[24px] font-medium border-b ${cn(
              "dark:border-white dark:border-opacity-25 border-black"
            )} py-2 border-opacity-25`}>
            {data.name}
          </p>
          <div className="max-w-sm flex items-start justify-start">
            <p className="truncate text-[14px] font-normal py-1.5 sm:py-4">
              {data.description}
            </p>
          </div>
          <span className="text-sm font-light">{formattedDate}</span>
        </div>
      </div>

      {alert && (
        <div className="fixed top-0 left-[42%]">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Post have been deleted successfully!</AlertTitle>
          </Alert>
        </div>
      )}

      <div
        className={`opacity-25 ${cn(
          "dark:border-white dark:border-opacity-25 border-black"
        )} border-opacity-25 w-[77.5%] h-[1px] bg-white mt-7`}
      />
    </div>
  );
};

export default SinglePost;
