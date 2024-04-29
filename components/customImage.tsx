import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

export default function CustomImage({
  src,
  alt,
  priority,
  width,
  height,
  className,
}: ImageProps) {
  return (
    <Image
      className={cn('w-full h-auto rounded-lg mx-auto', className)}
      src={src}
      alt={alt}
      sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
      width={width || 650}
      height={height || 366}
      priority={!!priority}
    />
  );
}
