"use client";

import { cn } from "@/lib/utils";
import ListBoxUi from "./ui/ListBoxUi";
import ButtonForm from "./ButtonForm";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";

interface initialStateProps {
  name?: string;
  description?: string;
  imageSrc: string;
}

const initialState: initialStateProps = {
  name: "",
  description: "",
  imageSrc: "",
};

const CreatePost = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(initialState);

  const setValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleDescChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    axios
      .post("api/post", state)
      .then(() => {
        router.push("/");
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        throw new Error("Something went wrong. Please try again.", err);
      });

    router.refresh();
  };

  return (
    <section className="w-full flex justify-center items-center pb-7">
      <div className="w-full flex flex-col justify-center items-center gap-6 sm:gap-8">
        <div className="w-full flex justify-center items-center gap-5 sm:gap-8 lg:gap-10 ml-8 sm:ml-0">
          <div
            className={`relative w-[145px] h-[145px] md:w-[230px] md:h-[230px] border-dashed border-2 ${cn(
              "border-gray-500 dark:border-white dark:border-opacity-50 rounded-2xl cursor-pointer bg-gray-200 dark:bg-black"
            )}`}>
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setValue("imageSrc", value)}
            />
          </div>

          <div
            className={`w-[1px] h-[10.35rem] md:h-[12.5rem] ${cn(
              "bg-gray-600 dark:bg-white dark:bg-opacity-20"
            )} bg-opacity-40 rounded-full`}
          />

          <div className="flex flex-col items-start justify-center gap-4">
            <input
              onChange={handleNameChange}
              value={state.name}
              name="name"
              type="text"
              placeholder="Your Name"
              className={`py-2.5 placeholder:text-[15px] w-[75%] md:w-full px-4 rounded-xl border ${cn(
                "bg-gray-200 border-gray-500 border-opacity-20 dark:bg-black dark:border-gray-500 dark:border-opacity-25 placeholder:text-[#7c7c7c] dark:placeholder:text-gray-400"
              )} outline-none shadow-md`}
            />
            <ListBoxUi />
          </div>
        </div>
        <div
          className={`w-[78%] h-[1px] ${cn(
            "bg-gray-600 dark:bg-white dark:bg-opacity-20"
          )} bg-opacity-40 rounded-full`}
        />
        <div className="w-full flex items-center justify-center ml-8 sm:ml-0">
          <input
            onChange={handleDescChange}
            value={state.description}
            name="description"
            placeholder="Your Post Description"
            className={`${cn(
              "bg-gray-200 border-gray-500 mr-8 md:mr-0 border-opacity-20 dark:bg-black dark:border-gray-500 dark:border-opacity-25 placeholder:text-[#7c7c7c] dark:placeholder:text-gray-400"
            )} w-[88%] p-4 px-8 rounded-lg outline-none border shadow-lg`}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <ButtonForm isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
