"use client";

import { updatePost, Post } from "@/lib/api"; 
import { useRouter } from "next/navigation";
import React, { useState } from "react"; 

interface EditFormClientProps {
  post: Post;
}

export default function EditFormClient({ post }: EditFormClientProps) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      alert("Başlık ve içerik alanları zorunludur.");
      return;
    }

    try {
      await updatePost(post.postId, { title, content }); 
      alert("Post başarıyla güncellendi.");
      router.push(`/posts/${post.postId}`); 
      router.refresh(); 
    } catch (error) {
      console.error("Post güncellenirken hata:", error);
      alert("Post güncellenemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Edit Post: {post.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={post.title} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}