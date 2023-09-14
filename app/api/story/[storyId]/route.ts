import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  storyId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { storyId } = params;

  if (!storyId || typeof storyId !== "string") {
    return NextResponse.error();
  }

  const story = await prisma.blog.delete({
    where: {
      id: storyId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(story);
}
