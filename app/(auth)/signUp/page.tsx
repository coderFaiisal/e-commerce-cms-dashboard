import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import authImage from '@/assets/auth-image.png';
import logo from '@/assets/logo.png';
import CustomImage from '@/components/customImage';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

const RegisterPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex-col justify-center md:grid lg:grid-cols-2 lg:px-0">
      <div className="h-full flex-col bg-black p-10 text-white lg:flex">
        <div className="flex items-start">
          <Link href={'/'}>
            <Image src={logo} alt="logo" className=" mr-2 w-32 h-12" />
          </Link>
        </div>

        <div className="mt-40 mb-36 tracking-wider">
          <div>
            <CustomImage
              src={authImage}
              alt="auth-page-image"
              className="w-[80%]"
            />
          </div>
        </div>
      </div>
      <div className="p-8"></div>
    </div>
  );
};

export default RegisterPage;
