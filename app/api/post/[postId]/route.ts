import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  postId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    return NextResponse.error();
  }

  const story = await prisma.post.delete({
    where: {
      id: postId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(story);
}
