import { getPosts, Post } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const posts: Post[] = await getPosts();
  if (!posts || posts.length === 0) {
    return (
      <div className="p-4">
        <p>Gösterilecek post bulunamadı.</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl mb-4">Posts</h1>
      {/* <Link className="text-blue-500 underline" href="/posts/create">
        Create New Post
      </Link> */}
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div key={post.postId} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <Link
              href={`/posts/${post.postId}`}
              className="text-blue-500 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
