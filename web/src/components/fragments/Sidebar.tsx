import { FC } from "react";
import Avatar from "../elements/Avatar";
import Button from "../elements/Button";
import Separator from "../elements/Separator";

interface SidebarProps {
  username: string;
  avatarSrc: string;
  friends: { username: string; avatarSrc: string }[];
}

const Sidebar: FC<SidebarProps> = ({ username, avatarSrc, friends }) => (
  <div className="hidden w-64 flex-col gap-4 border-r bg-background p-4 sm:flex">
    <div className="flex items-center gap-2">
      <Avatar src={avatarSrc} alt={`@${username}`} className="h-10 w-10 border" />
      <div>
        <div className="font-medium">{username}</div>
        <div className="text-sm text-muted-foreground">@{username}</div>
      </div>
    </div>
    <Separator />
    <nav className="flex flex-col gap-1">
      <Button variant="ghost" className="justify-start gap-2 px-2 text-left">
        <span>Home</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 px-2 text-left">
        <span>Friends</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 px-2 text-left">
        <span>Groups</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 px-2 text-left">
        <span>Explore</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 px-2 text-left">
        <span>Settings</span>
      </Button>
    </nav>
    <Separator />
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium">Friends</div>
      <div className="grid grid-cols-3 gap-2">
        {friends.map((friend, index) => (
          <Avatar key={index} src={friend.avatarSrc} alt={`@${friend.username}`} className="h-10 w-10 border" />
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;

