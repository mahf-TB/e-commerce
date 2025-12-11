import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps  extends React.HTMLAttributes<HTMLDivElement>  {
  src?: string;
  fallback?: string;
  size?: number | string; // px ou string
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  fallback = "NN",
  size = 40,
  className = "",
  fallbackClassName = "",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Avatar className={`rounded-full ${className} bg-gray-900`} style={{ width: size, height: size }} {...props}>
      {imgSrc && (
        <AvatarImage
          src={imgSrc}
          alt="avatar"
          // Avoid sending referer to third-party image hosts which can block hotlinking
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(undefined)}
        />
      )}
      <AvatarFallback className={`bg-blue-950 text-white ${fallbackClassName}`}>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
