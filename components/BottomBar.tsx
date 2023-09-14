"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconContext } from "react-icons";
import { BiHomeAlt } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { IoIosContrast, IoIosPaperPlane } from "react-icons/io";
import { LiaAngleDoubleUpSolid } from "react-icons/lia";
import { ModeToggle } from "./ModeToggle";

const BottomBar = () => {
  const pathName = usePathname();

  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`z-[1000] border-t h-[75px] fixed border-opacity-40 bottom-0 w-full flex sm:hidden ${cn(
        "bg-[--whiteMode] dark:bg-black border-gray-500 dark:border-white dark:border-opacity-20"
      )} `}>
      <div className="w-full flex items-center justify-center gap-3">
        {navLinks.map((link, index) => {
          const isActive =
            (pathName.includes(link.href!) && link.href!.length > 1) ||
            pathName === link.href;
          const isMode = navLinks.length - 2 === index;

          return (
            <>
              <Link
                key={index}
                href={`${isMode ? "" : link.href}`}
                onClick={() => {
                  isMode ? setToggle((prev) => !prev) : null;
                }}
                className={`flex items-center text-start ${cn(
                  "hover:bg-gray-300 hover:dark:bg-[#272727]"
                )} py-3.5 px-5 rounded-md transition-all`}>
                <IconContext.Provider
                  value={{
                    color: `${cn("white dark:black")}`,
                    size: `25px`,
                  }}>
                  <div
                    className={`transition-all flex lg:hidden w-full items-center justify-center ${
                      isActive ? "scale-[1.12]" : "scale-100"
                    } ${toggle && isMode ? "scale-[1.12]" : "scale-100"}`}>
                    {link.label === "Home" && <BiHomeAlt />}
                    {link.label === "Create" && <CgAddR />}
                    {link.label === "Mode" && <IoIosContrast />}
                    {link.label === "Contact" && <IoIosPaperPlane />}
                  </div>
                </IconContext.Provider>
              </Link>
            </>
          );
        })}
        {toggle && (
          <div className="absolute bottom-[110%] z-50 right-5 xl:-right-[42%] flex flex-col items-center gap-2.5">
            <div className="shadow-2xl border border-gray-400 border-opacity-30 rounded-md">
              <ModeToggle />
            </div>
            <IconContext.Provider
              value={{
                color: `${cn("white dark:black")}`,
                size: "30px",
              }}>
              <div className="transition-all">
                <LiaAngleDoubleUpSolid />
              </div>
            </IconContext.Provider>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BottomBar;
