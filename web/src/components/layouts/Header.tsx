import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import Avatar from "../elements/Avatar";

const Header: FC = () => (
  <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
    <Link to="" className="flex items-center gap-2">
      <span className="text-lg font-semibold">Sociagram</span>
    </Link>
    <nav className="flex items-center gap-4">
      <Link to="/explore" className="text-muted-foreground hover:text-foreground">
        Explore
      </Link>
      <Link to="/notifications" className="text-muted-foreground hover:text-foreground">
        Notifications
      </Link>
      <Link to="/messages" className="text-muted-foreground hover:text-foreground">
        Messages
      </Link>
      <Button variant="ghost" size="icon" className="flex items-center">
        <Avatar src="/path/to/avatar.jpg" alt="Profile" className="h-8 w-8" />
      </Button>
    </nav>
  </header>
);

export default Header;

