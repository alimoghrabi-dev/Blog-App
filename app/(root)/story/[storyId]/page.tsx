import getBlogsById from "@/app/actions/getBlogsById";
import Image from "next/image";

interface IParams {
  storyId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const story = await getBlogsById(params);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src={story?.imageSrc!}
        alt="image"
        width={500}
        height={500}
        className="rounded-xl shadow-md"
      />
    </div>
  );
};

export default Page;
