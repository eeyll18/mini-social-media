"use client";

import { Post, createPost, getPosts } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HomeClientWrapperProps {
  initialPosts: Post[];
}

export default function HomeClientWrapper({ initialPosts }: HomeClientWrapperProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false); 
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const showCreatePostLink = true; 

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);


  const handleCreatePost = async () => {
    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }
    if (!session || !session.user) {
        alert("You must be logged in to create a post.");
        return;
    }

    const authorName = session.user.name || "Anonymous";
    const postTitle = `Post by ${authorName} at ${new Date().toLocaleTimeString()}`;

    try {
      setIsLoading(true); 
      const newPost = await createPost({
        title: postTitle,
        content: content,
        author: authorName,
      });

      if (newPost && newPost.postId) {
        alert("Post created successfully!");
        setContent("");
        const updatedPosts = await getPosts(); 
        setPosts(updatedPosts);

      } else {
        alert("Failed to create post. The server might have returned an error or unexpected data.");
        console.error("Failed to create post, API response:", newPost);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 pt-20 pb-10 flex justify-center items-center">
        <p className="text-xl text-gray-500">Updating posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {session && showCreatePostLink && ( 
          <div className="mb-6 flex items-end justify-center space-x-3 p-4 bg-sky-50 rounded-xl shadow-md">
            <textarea
              name="content"
              placeholder="What's on your mind?"
              required
              className="w-full bg-sky-100 min-h-[44px] max-h-60 p-2.5 border-none rounded-lg focus:ring-2 focus:ring-sky-100 focus:border-sky-100 resize-y transition-colors duration-150 ease-in-out placeholder-sky-900 text-gray-800"
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="button"
              onClick={handleCreatePost}
              disabled={isLoading || !session} 
              className="flex-shrink-0 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition duration-150 ease-in-out text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">
              Gösterilecek post bulunamadı.
            </p>
            {session && !showCreatePostLink && ( 
              <Link
                href="/posts/create" 
                className="mt-4 inline-block bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md transition duration-150"
              >
                İlk Postunu Oluştur
              </Link>
            )}
            {!session && ( 
                 <p className="mt-4 text-gray-600">
                    <Link href="/api/auth/signin" className="text-sky-600 hover:underline">Login</Link> to create posts.
                 </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.postId}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {post.author}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {post.content}
                </p>
                {/* <p className="text-sm text-gray-500">Title: {post.title}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}