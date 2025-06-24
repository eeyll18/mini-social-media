import HomeClientWrapper from "@/components/HomeClientWrapper";
import PostsListServer from "@/components/PostsListServer";

export default async function HomePage() {
  return (
    <HomeClientWrapper>
      <PostsListServer />
    </HomeClientWrapper>
  );
}
