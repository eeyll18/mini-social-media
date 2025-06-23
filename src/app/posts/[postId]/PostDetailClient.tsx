"use client";

import { deletePost, Post } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PostDetailClientProps {
  post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Bu postu silmek istediğinizden emin misiniz?")) {
      try {
        const success = await deletePost(post.postId); 
        if (success) {
          alert("Post başarıyla silindi.");
          router.push("/");
          router.refresh();
        } else {
          alert("Post silinemedi.");
        }
      } catch (error) {
        console.error("Post silinirken hata:", error);
        alert("Post silinirken bir hata oluştu.");
      }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl mb-4">{post.title}</h1>
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
      <p className="text-gray-600 mb-4">Author: {post.author}</p>
      <div className="mt-6 space-x-2">
        <Link
          href={`/posts/${post.postId}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}