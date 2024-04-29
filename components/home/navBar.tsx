import Link from 'next/link';
import { Button } from '../ui/button';

const NavBar = () => {
  return (
    <div className="w-full flex justify-between py-4 px-8 lg:px-12">
      <Link href={'/'}>
        <span className="text-xl md:2xl lg:text-3xl font-bold">Invento.</span>
      </Link>

      <aside className="flex gap-2 items-center">
        <Link href={'/signIn'}>
          <Button>Sign in</Button>
        </Link>
        {/* <UserProfile /> */}
      </aside>
    </div>
  );
};

export default NavBar;
