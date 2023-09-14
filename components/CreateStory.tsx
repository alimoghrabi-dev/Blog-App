"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonForm from "./ButtonForm";
import ImageUpload from "./ImageUpload";
import axios from "axios";

interface initialStateProps {
  name?: string;
  imageSrc: string;
}

const initialState: initialStateProps = {
  name: "",
  imageSrc: "",
};

const CreateStory = () => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    axios
      .post("api/story", state)
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
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div
            className={`relative w-[230px] h-[230px] border-dashed border-2 ${cn(
              "border-gray-500 dark:border-white dark:border-opacity-50 rounded-2xl cursor-pointer bg-gray-200 dark:bg-black"
            )}`}>
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setValue("imageSrc", value)}
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-4">
            <input
              onChange={handleNameChange}
              value={state.name}
              name="name"
              type="text"
              placeholder="Your Name"
              className={`py-2.5 placeholder:text-[15px] px-4 rounded-xl border ${cn(
                "bg-gray-200 border-gray-500 border-opacity-20 dark:bg-black dark:border-gray-500 dark:border-opacity-25 placeholder:text-[#7c7c7c] dark:placeholder:text-gray-400"
              )} outline-none shadow-md`}
            />
          </div>
          <div
            className={`w-[57%] h-[1px] ${cn(
              "bg-gray-600 dark:bg-white dark:bg-opacity-10"
            )} bg-opacity-30 rounded-full`}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <ButtonForm isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default CreateStory;
