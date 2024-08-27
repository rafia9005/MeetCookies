import { ImgHTMLAttributes } from "react";
import clsx from "clsx";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Avatar = ({ fallback, src, alt, className, ...props }: AvatarProps) => {
  return (
    <div className={clsx("relative flex items-center justify-center", className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" {...props} />
      ) : (
        <span className="h-full w-full flex items-center justify-center bg-gray-300 text-sm">
          {fallback || "?"}
        </span>
      )}
    </div>
  );
};

export default Avatar;

