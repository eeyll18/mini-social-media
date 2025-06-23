"use client";

import { getPosts, Post } from "@/lib/api";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedData = await getPosts();
      setPosts(fetchedData);
    };
    fetchPosts();
  }, []);

  if (!session) {
    return (
      <div className="p-8">
        <a href="/login" className="text-blue-500">
          Please Login
        </a>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <Link href="/posts/create" className="text-blue-500 underline">
        Create New Post
      </Link>

      <div className="mt-6 space-y-4">
        {posts.map((post: any) => (
          <div key={post.postId} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
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
