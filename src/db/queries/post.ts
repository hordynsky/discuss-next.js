import type { Post } from "@prisma/client";

import { db } from "@/db";

export type PostDisplayItem = Post & {
  topic: {
    slug: string;
  };
  _count: {
    comments: number;
  };
  user: { name: string | null };
};

// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[];

export function fetchPostsByTopicSlug(slug: string): Promise<PostDisplayItem[]> {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true }}
    },
  });
}

export function fetchTopPosts(): Promise<PostDisplayItem[]> {
  return db.post.findMany({
    take: 4,
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true }}
    },
  });
}