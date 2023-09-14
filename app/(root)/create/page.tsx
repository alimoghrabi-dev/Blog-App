"use client";

import CreatePost from "@/components/CreatePost";
import CreateStory from "@/components/CreateStory";
import { createToggle } from "@/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Page = () => {
  const [selectedText, setSelectedText] = useState(0);

  const handleTextClick = (index: number) => {
    setSelectedText(index);
  };

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-center gap-28 sm:gap-44 cursor-pointer">
        {createToggle.map((item, index) => (
          <span
            key={index}
            onClick={() => handleTextClick(index)}
            className={`text-lg h-full font-medium mt-[0.12rem] py-6 ${
              selectedText === index ? "border-b" : null
            } ${cn("border-black border-opacity-40 dark:border-gray-300")}`}>
            {item.label}
          </span>
        ))}
      </div>
      <div
        className={`w-[82%] lg:w-[62%] h-[1px] ${cn(
          "bg-gray-600 dark:bg-white dark:bg-opacity-10"
        )} bg-opacity-20`}
      />
      <div className="w-full flex items-center justify-center">
        {selectedText !== null && (
          <div className="w-full flex items-center justify-center mt-7">
            {selectedText === 0 && <CreatePost />}
            {selectedText === 1 && <CreateStory />}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
