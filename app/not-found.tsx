'use client';

import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-y-2">
      <h1 className="text-5xl md:text-6xl font-bold">404</h1>
      <h2 className="text-2xl md:text-3xl text-center">Page Not Found!!!</h2>

      <div className="flex justify-center items-center">
        <Button onClick={() => router.push('/')}>
          Back Home <Undo2 className=" ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
