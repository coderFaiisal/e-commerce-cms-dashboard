'use client';

import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ErrorPage = () => {
  const handleBackToHome = () => {
    redirect('/');
  };
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-y-2">
      <h1 className="text-5xl md:text-6xl font-bold">500</h1>
      <h2 className="text-2xl md:text-3xl text-center">
        Internal Server Error!!!
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={handleBackToHome}>Get Back</Button>
        <div className="flex justify-center items-center">
          <Link href={'/support'}>
            <Button variant={'secondary'}>
              Contact Support <User className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
