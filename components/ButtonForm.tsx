import { FormEvent } from "react";
import Loading from "./Loading";
import { cn } from "@/lib/utils";

type Props = {
  isSubmitting: boolean;
  handleSubmit: (e: FormEvent) => void;
};

const ButtonForm = ({ isSubmitting, handleSubmit }: Props) => {
  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting ? true : false}
      className={`${cn(
        "text-white dark:text-black dark:font-medium"
      )}  py-2 px-5 rounded-xl shadow-lg bg-purple-700 text-medium text-base hover:bg-purple-500 transition-all`}>
      {isSubmitting ? <Loading /> : "Create"}
    </button>
  );
};

export default ButtonForm;
