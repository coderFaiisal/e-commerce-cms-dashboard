import SignUp from '@/components/auth/signUp';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-dvh flex-col justify-center md:grid lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full md:flex-col bg-black p-10 text-white lg:flex">
        <Link href={'/'}>
          <div className="tracking-wider text-2xl font-bold">
            <h1>Invento.</h1>
          </div>
        </Link>
      </div>
      <div className="p-[4%] md:p-8 my-auto">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
