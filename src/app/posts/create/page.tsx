"use client"
import { createPost } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreatePost() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await createPost({
      title,
      content,
      author: session?.user?.name || "Anonymous",
    });

    router.push("/");
  };
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="w-full p-2 border h-32"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
