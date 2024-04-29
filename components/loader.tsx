import { cn } from '@/lib/utils';
import { Loader as LucidLoader } from 'lucide-react';

type TLoaderProps = {
  className?: string;
};

const Loader = ({ className }: TLoaderProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <LucidLoader size={20} className="animate-spin" />
    </div>
  );
};

export default Loader;
