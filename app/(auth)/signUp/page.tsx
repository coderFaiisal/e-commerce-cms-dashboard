import SignUp from '@/components/auth/signUp';
import { Pyramid } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
};

const SignUpPage = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-dvh flex-col justify-center md:grid lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full md:flex-col bg-black p-10 text-white lg:flex">
        <div className="flex items-start">
          <Link href={'/'}>
            <Pyramid size={28} />
          </Link>
        </div>

        <div className="tracking-wider">
          <h1>Invento.</h1>
        </div>
      </div>
      <div className="p-[4%] md:p-8 my-auto">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
