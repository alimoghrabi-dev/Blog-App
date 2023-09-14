import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

const people = [
  { name: "Front-End" },
  { name: "Back-End" },
  { name: "Full-Stack" },
  { name: "UI/UX" },
];

export default function Example() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg ${cn(
              "bg-gray-200 dark:bg-black"
            )} py-3 pl-3 pr-20 text-left ${cn(
              "bg-gray-200 border text-gray-500 dark:text-gray-400 border-gray-500 border-opacity-20 dark:bg-black dark:border-gray-500 dark:border-opacity-25"
            )} shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}>
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md ${cn(
                "bg-gray-200 dark:bg-black border text-gray-500 dark:text-gray-400 border-gray-500 border-opacity-20 dark:border-gray-500 dark:border-opacity-25"
              )} py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                      active
                        ? `${cn(
                            "bg-gray-300 text-gray-900 dark:text-gray-300 dark:bg-gray-800"
                          )}`
                        : `${cn("text-gray-900 dark:text-gray-300")}`
                    }`
                  }
                  value={person}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}>
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
