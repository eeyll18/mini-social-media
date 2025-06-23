import { getPostById, Post } from "@/lib/api";
import Link from "next/link";
import PostDetailClient from "./PostDetailClient";

interface PostPageProps {
  params: { postId: string };
}

export default async function PostPage({
  params: paramsPromise,
}: PostPageProps) {
  const params = await paramsPromise;
  const postId = (await paramsPromise).postId;
  const post: Post | null = await getPostById(postId);
  // const post: Post | null = await getPostById(params.postId);

  if (!post) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl mb-4">Post Not Found</h1>
        <p className="mb-4">İstenen post bulunamadı.</p>
        <Link href="/" className="text-blue-500 underline mt-2 inline-block">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return <PostDetailClient post={post} />;
}
