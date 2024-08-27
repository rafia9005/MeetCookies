import { FC } from "react";
import Avatar from "../elements/Avatar";
import Button from "../elements/Button";
import Card, { CardHeader, CardContent, CardFooter } from "../elements/Card";
import Input from "../elements/Input";

interface PostProps {
  avatarSrc: string;
  username: string;
  content: string;
  likes: number;
  comments: { username: string; comment: string }[];
}

const Post: FC<PostProps> = ({ avatarSrc, username, content, likes, comments }) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex items-start gap-4 border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar src={avatarSrc} alt={`@${username}`} className="h-10 w-10 border" />
        <div>
          <div className="font-medium">{username}</div>
          <div className="text-sm text-muted-foreground">@{username}</div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <span className="sr-only">More</span>
      </Button>
    </CardHeader>
    <CardContent className="p-4">
      <div className="prose prose-gray dark:prose-invert">
        <p>{content}</p>
      </div>
    </CardContent>
    <CardFooter className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <span className="sr-only">Like</span>
        </Button>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Comment</span>
        </Button>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Share</span>
        </Button>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <span className="sr-only">Save</span>
      </Button>
    </CardFooter>
    <div className="flex flex-col gap-2 p-4">
      <div className="font-medium">{likes} likes</div>
      {comments.map((comment, index) => (
        <div key={index}>
          <span className="font-medium">{comment.username}</span> {comment.comment}
        </div>
      ))}
      <Input type="text" placeholder="Add a comment..." />
    </div>
  </Card>
);

export default Post;

