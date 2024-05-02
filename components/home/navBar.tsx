import { accessKey } from '@/constants/authKey';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import UserProfile from '../userProfile';

const NavBar = async () => {
  const accessToken = getCookie(accessKey, { cookies });

  const response = await fetch(`${getBaseUrl()}/users/my-profile`, {
    headers: {
      Authorization: `${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    next: {
      tags: ['user'],
    },
  });

  const data = await response.json();

  return (
    <div className="w-full flex justify-between py-4 px-8 lg:px-12">
      <Link href={'/'}>
        <span className="text-xl md:2xl lg:text-3xl font-bold">Invento.</span>
      </Link>

      <aside className="flex gap-2 items-center">
        <UserProfile data={data} />
      </aside>
    </div>
  );
};

export default NavBar;
