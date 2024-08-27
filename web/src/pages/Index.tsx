import { FC } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Post from "../components/fragments/Post";

const username = "john_doe";
const avatarSrc = `https://picsum.photos/seed/${Math.random()}/100`;
const friends = [
  { username: "friend1", avatarSrc: `https://picsum.photos/seed/${Math.random()}/100` },
  { username: "friend2", avatarSrc: `https://picsum.photos/seed/${Math.random()}/100` }
];

const posts = [
  {
    avatarSrc: `https://picsum.photos/seed/${Math.random()}/100`,
    username: "jane_doe",
    content: "This is a sample post.",
    likes: 1234,
    comments: [
      { username: "user1", comment: "Great post!" },
      { username: "user2", comment: "Thanks for sharing!" }
    ]
  },
];

const Index: FC = () => {
  return (
    <MainLayout username={username} avatarSrc={avatarSrc} friends={friends}>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Post
            key={index}
            avatarSrc={post.avatarSrc}
            username={post.username}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Index;

