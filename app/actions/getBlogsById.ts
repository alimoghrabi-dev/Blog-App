import prisma from "@/lib/prismadb";

interface IParams {
  storyId: string;
}

export default async function getBlogsById(params: IParams) {
  try {
    const { storyId } = params;

    const story = await prisma.blog.findUnique({
      where: {
        id: storyId,
      },
      include: {
        user: true,
      },
    });

    if (!story) return null;

    return {
      ...story,
      createdAt: story.createdAt.toISOString(),
      user: {
        ...story.user,
        createdAt: story.user.createdAt.toISOString(),
        updatedAt: story.user.updatedAt.toISOString(),
        emailVerified: story.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
