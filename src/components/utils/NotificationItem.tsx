"use client"

import { cn } from "@/lib/utils"

type NotificationProps = {
  id: string
  user: string
  image: string
  action: string
  target: string
  timestamp: string
  unread?: boolean
  onClick?: (id: string) => void
  containerClassName?: string
}

export function NotificationItem({
  id,
  user,
  image,
  action,
  target,
  timestamp,
  unread = false,
  onClick,
  containerClassName,
}: NotificationProps) {
  const handleClick = () => {
    onClick?.(id)
  }

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 pe-3 py-3 px-2 rounded-md hover:bg-accent transition-colors cursor-pointer",
        unread && "bg-accent/50",
        containerClassName
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick()
        }
      }}
    >
      {/* Avatar */}
      <img
        alt={user}
        className="size-10 rounded-md shrink-0"
        height={32}
        src={image}
        width={32}
      />

      {/* Contenu */}
      <div className="flex-1 space-y-1 min-w-0">
        <button
          className="text-left text-foreground/80 after:absolute after:inset-0 block w-full"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
          type="button"
        >
          <span className="font-medium text-foreground hover:underline">
            {user}
          </span>{" "}
          {action}{" "}
          <span className="font-medium text-foreground hover:underline">
            {target}
          </span>
          .
        </button>
        <div className="text-muted-foreground text-xs">
          {timestamp}
        </div>
      </div>

      {/* Indicateur non lu */}
      {unread && (
        <div className="absolute end-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shrink-0" />
      )}
    </div>
  )
}
