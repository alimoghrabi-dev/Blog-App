"use client";

import InputComponent from "@/components/InputComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Loading from "@/components/Loading";

type initialStateProps = {
  email: string;
  password: string;
};

const initialState: initialStateProps = {
  email: "",
  password: "",
};

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push("/");
        router.refresh();
        setSubmitting(false);
      }

      if (res?.error) {
        router.push("/login");
        setMsg("Invalid Email or Password.");
        throw new Error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-gray-50 border-gray-800 border-opacity-30 border py-8 rounded-xl shadow-xl px-16">
        <h1 className="pb-5 mb-5 w-full text-center text-2xl font-extrabold header border-b border-gray-800 border-opacity-20">
          Log In
        </h1>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>

          <InputComponent
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <InputComponent
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <div className="w-full flex items-center justify-center mb-2.5">
          <p className="text-red-500 font-bold">{msg}</p>
        </div>

        <div className="w-full flex items-center justify-center">
          <span className="flex gap-2 text-sm pb-5 font-normal text-gray-800">
            {"Don't have an account?"}{" "}
            <p>
              <Link
                href="/register"
                className="text-blue-600 font-semibold underline">
                Register
              </Link>
            </p>
          </span>
        </div>

        <button
          disabled={submitting ? true : false}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {submitting ? <Loading /> : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Page;
