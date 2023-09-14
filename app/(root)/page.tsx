import FetchPosts from "@/components/FetchPosts";
import FetchStories from "@/components/FetchStories";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-start">
      <div className="w-full flex flex-col items-center py-8 gap-7">
        <div className="w-full items-center justify-start ml-[14rem]">
          <FetchStories />
        </div>
        <div
          className={`w-[90%] h-[1px] ${cn(
            "bg-gray-500 bg-opacity-20 dark:bg-white dark:bg-opacity-20"
          )}`}
        />
      </div>
      <div className="ml-[2.5rem] md:ml-[5rem] lg:ml-[10rem] xl:ml-[14rem]">
        <FetchPosts />
      </div>
    </main>
  );
}
