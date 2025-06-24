import Navbar from "@/components/common/Navbar";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import { getPosts, Post } from "@/lib/api";

export default async function HomePage() {
  const initialPosts: Post[] = await getPosts();

  return (
    <>
      <Navbar />
      <HomeClientWrapper initialPosts={initialPosts} />
    </>
  );
}
