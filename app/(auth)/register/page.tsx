"use client";

import InputComponent from "@/components/InputComponent";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";

type initialStateProps = {
  name: string;
  email: string;
  password: string;
};

const initialState: initialStateProps = {
  name: "",
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

    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
          setSubmitting(false);
        }, 2500);
      })
      .catch((err: any) => {
        setSubmitting(false);
        setMsg("User Already Exists!");
        console.log(err);
      });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-gray-50 border-gray-800 border-opacity-30 border py-8 rounded-xl shadow-xl px-16">
        <h1 className="pb-5 mb-5 w-full text-center text-2xl font-extrabold header border-b border-gray-800 border-opacity-20">
          Register
        </h1>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Name
          </label>
          <InputComponent
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
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
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex items-center justify-center mb-2.5">
          <p className="text-red-500 font-bold">{msg}</p>
        </div>

        <div className="w-full flex items-center justify-center">
          <span className="flex gap-2 text-sm pb-5 font-normal text-gray-800">
            {"Already have an account?"}{" "}
            <p>
              <Link
                href="/login"
                className="text-blue-600 font-semibold underline">
                Login
              </Link>
            </p>
          </span>
        </div>

        <button
          disabled={submitting ? true : false}
          type="submit"
          className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {submitting ? <Loading /> : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Page;
