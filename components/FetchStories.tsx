import getBlogs from "@/app/actions/getBlogs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SingleBlog from "./singleBlog";
import Link from "next/link";

const FetchStories = async () => {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <section className="w-full flex items-center justify-start gap-12">
      <div className="flex items-center justify-center gap-10">
        {blogs.length === 0 && (
          <h1 className="text-xl sm:text-2xl font-bold text-center py-4">
            No Stories yet.
            <Link
              href={"/create"}
              className="underline text-blue-900 hover:text-blue-700 ml-1">
              Create One!
            </Link>
          </h1>
        )}
        {blogs.map((item) => (
          <SingleBlog data={item} key={item.id} currentUser={currentUser} />
        ))}
      </div>
    </section>
  );
};

export default FetchStories;
