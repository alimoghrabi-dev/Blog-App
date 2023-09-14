import { Blog, Post, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeBlogs = Omit<Blog, "createdAt"> & {
  createdAt: string;
};

export type SafePosts = Omit<Post, "createdAt"> & {
  createdAt: string;
};
