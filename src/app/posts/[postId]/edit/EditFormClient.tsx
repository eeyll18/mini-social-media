"use client";

import { updatePost, Post } from "@/lib/api"; // Post interface'ini import edin
import { useRouter } from "next/navigation";
import React, { useState } from "react"; // Form state'i için useState

interface EditFormClientProps {
  post: Post; // Mevcut post verisini prop olarak alacak
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
      await updatePost(post.postId, { title, content }); // post.id burada kesinlikle string
      alert("Post başarıyla güncellendi.");
      router.push(`/posts/${post.postId}`); // Güncellenen postun detay sayfasına yönlendir
      router.refresh(); // Detay sayfasındaki veriyi yenilemek için
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
            defaultValue={post.title} // Server'dan gelen ilk değer
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
            // value={title} onChange={(e) => setTitle(e.target.value)} // Controlled component için
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content} // Server'dan gelen ilk değer
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-32"
            required
            // value={content} onChange={(e) => setContent(e.target.value)} // Controlled component için
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