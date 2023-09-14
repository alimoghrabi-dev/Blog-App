import getPosts from "@/app/actions/getPosts";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SinglePost from "./SinglePost";
import Link from "next/link";

const FetchPosts = async () => {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-10 pb-12">
        {posts.length === 0 && (
          <h1 className="text-xl sm:text-2xl font-bold text-start mr-0 lg:mr-52 mt-12">
            No Posts yet.
            <Link
              href={"/create"}
              className="underline text-blue-900 hover:text-blue-700 ml-1">
              Create One!
            </Link>
          </h1>
        )}
        {posts.map((item) => (
          <SinglePost data={item} key={item.id} currentUser={currentUser} />
        ))}
      </div>
    </section>
  );
};

export default FetchPosts;
