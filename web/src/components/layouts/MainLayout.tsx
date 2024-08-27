import { FC, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "../fragments/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  username: string;
  avatarSrc: string;
  friends: { username: string; avatarSrc: string }[];
}

const MainLayout: FC<MainLayoutProps> = ({ children, username, avatarSrc, friends }) => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <div className="container mx-auto flex flex-1 px-4 py-6">
      <Sidebar username={username} avatarSrc={avatarSrc} friends={friends} />
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

export default MainLayout;

