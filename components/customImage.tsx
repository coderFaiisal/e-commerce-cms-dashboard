import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function CustomImage({ src, alt, priority }: ImageProps) {
  return (
    <Image
      className="w-full h-auto rounded-lg mx-auto"
      src={src}
      alt={alt}
      sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
      width={650}
      height={366}
      priority={!!priority}
    />
  );
}
