import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function CustomImage({
  src,
  alt,
  priority,
  className,
}: ImageProps) {
  return (
    <Image
      className={cn("w-full h-auto rounded-lg mx-auto", className)}
      src={src}
      alt={alt}
      sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
      width={650}
      height={366}
      priority={!!priority}
    />
  );
}
