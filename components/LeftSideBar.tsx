"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import {
  LiaAngleDoubleRightSolid,
  LiaAngleDoubleDownSolid,
  LiaAngleDoubleUpSolid,
} from "react-icons/lia";
import { useState } from "react";
import { IconContext } from "react-icons";
import { pacifico } from "@/app/(root)/layout";
import { BiHomeAlt } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { IoIosContrast, IoIosPaperPlane } from "react-icons/io";
import { SafeUser } from "@/types/type";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { FaSignInAlt } from "react-icons/fa";

interface currentUserProps {
  currentUser: SafeUser | null;
}

const LeftSideBar = ({ currentUser }: currentUserProps) => {
  const pathName = usePathname();

  const [toggle, setToggle] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`sticky pb-24 top-0 w-[15.5%] md:w-[13.5%] border-r border-opacity-30 hidden sm:flex flex-col items-center justify-start ${cn(
        "bg-[--whiteMode] dark:bg-black border-gray-500 dark:border-white dark:border-opacity-20"
      )}`}>
      <div className="w-full h-screen flex flex-col items-center justify-evenly">
        <div className="w-full flex items-center justify-center">
          <h1
            className={`text-[36px] ${pacifico.className} hidden lg:block leading-[1.2] font-extrabold text-center header`}>
            Data
            <br />
            Verse
          </h1>
          <h1
            className={`text-[38px] ${pacifico.className} block lg:hidden leading-[1.2] font-extrabold text-center header`}>
            D
            <br />V
          </h1>
        </div>
        <div
          className={`w-[80%] h-[1px] ${cn(
            "bg-gray-500 dark:bg-white dark:bg-opacity-20"
          )} bg-opacity-30`}
        />
        <div className="flex flex-col items-center w-full justify-center gap-2 mb-4">
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
                  className={`w-[80%] flex items-center gap-1.5 text-start ${cn(
                    "hover:bg-gray-300 hover:dark:bg-[#272727]"
                  )} py-2.5 px-3.5 rounded-md transition-all`}>
                  <IconContext.Provider
                    value={{
                      color: `${cn("white dark:black")}`,
                      size: `30px`,
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
                  {toggle && isMode ? (
                    <IconContext.Provider
                      value={{
                        color: `${cn("white dark:black")}`,
                        size: "21px",
                      }}>
                      <div className="transition-all hidden lg:block">
                        <LiaAngleDoubleRightSolid />
                      </div>
                    </IconContext.Provider>
                  ) : (
                    ""
                  )}
                  {isActive && (
                    <IconContext.Provider
                      value={{
                        color: `${cn("white dark:black")}`,
                        size: "21px",
                      }}>
                      <div className="transition-all hidden lg:block overflow-x-clip">
                        <LiaAngleDoubleRightSolid />
                      </div>
                    </IconContext.Provider>
                  )}
                  <p
                    className={`text-[15px] transition-all hidden lg:block overflow-x-clip ${
                      toggle && isMode ? "font-bold" : "font-medium"
                    } ${isActive ? "font-bold" : "font-medium"}`}>
                    {link.label}
                  </p>
                </Link>
              </>
            );
          })}
          {toggle && (
            <div className="absolute top-3 z-50 -right-[56%] xl:-right-[42%] flex flex-col items-center gap-2.5">
              <IconContext.Provider
                value={{
                  color: `${cn("white dark:black")}`,
                  size: "35px",
                }}>
                <div className="transition-all">
                  <LiaAngleDoubleDownSolid />
                </div>
              </IconContext.Provider>
              <div className="shadow-2xl border border-gray-400 border-opacity-30 rounded-md">
                <ModeToggle />
              </div>
            </div>
          )}
        </div>

        {currentUser ? (
          <div
            className={`w-full flex flex-col border-r border-opacity-30 items-center justify-center gap-3 overflow-x-clip boder-t mt-2`}>
            <p className="overflow-x-clip text-center font-bold">
              {currentUser?.name}
            </p>
            <button
              onClick={() => signOut()}
              className={`text-start font-medium rounded-md ${cn(
                "hover:bg-gray-300 hover:dark:bg-[#272727]"
              )} py-2.5 px-3.5 w-[80%] hidden lg:block transition-all`}>
              LogOut
            </button>
            <button
              onClick={() => signOut()}
              className={`flex justify-center lg:hidden rounded-md w-[80%] ${cn(
                "hover:bg-gray-300 hover:dark:bg-[#272727]"
              )} py-2.5 px-3.5 transition-all`}>
              <IconContext.Provider
                value={{
                  color: `${cn("white dark:black")}`,
                  size: "32px",
                }}>
                <div className="transition-all mr-1.5">
                  <BiLogOut />
                </div>
              </IconContext.Provider>
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className={`rounded-md ${cn(
                "hover:bg-gray-300 hover:dark:bg-[#272727]"
              )} py-2.5 px-3.5 w-[80%] hidden lg:block transition-all`}>
              <button className={`text-start font-medium`}>LogIn</button>
            </Link>
            <Link
              href="/login"
              className={`rounded-md flex items-center justify-center ${cn(
                "hover:bg-gray-300 hover:dark:bg-[#272727]"
              )} py-2.5 px-3.5 w-[80%] block lg:hidden transition-all`}>
              <button className={`text-start font-medium`}>
                <IconContext.Provider
                  value={{
                    color: `${cn("white dark:black")}`,
                    size: "32px",
                  }}>
                  <div className="transition-all mr-1.5">
                    <FaSignInAlt />
                  </div>
                </IconContext.Provider>
              </button>
            </Link>
          </>
        )}
      </div>
      <IconContext.Provider
        value={{
          color: `${cn("white dark:black")}`,
          size: "32px",
        }}>
        <div className="transition-all absolute bottom-4 left-[40%]">
          <LiaAngleDoubleUpSolid
            onClick={scrollToTop}
            className={`transition-opacity duration-300 ease-in-out cursor-pointer`}
          />
        </div>
      </IconContext.Provider>
    </nav>
  );
};

export default LeftSideBar;
