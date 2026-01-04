import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "../ui/animated-grid-pattern"


interface AnimatedBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function AnimatedBackground({
  children,
  className,
}: AnimatedBackgroundProps) {
  return (
    <div
      className={cn(
        "bg-background relative flex items-center justify-center overflow-hidden rounded-lg border p-8",
        className
      )}
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-[40%] inset-y-[-90%] h-[200%] skew-y-12"
        )}
      />
      {/* Content au-dessus de l’animation */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
