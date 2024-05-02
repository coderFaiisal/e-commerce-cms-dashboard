/* eslint-disable @typescript-eslint/no-explicit-any */
import { accessKey } from '@/constants/authKey';
import { LayoutDashboard, User } from 'lucide-react';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import CustomImage from './customImage';
import LogoutButton from './logoutButton';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function UserProfile(data: any) {
  const user = data?.data?.data;

  const handleSignout = async () => {
    'use server';
    try {
      revalidateTag('user');

      cookies().delete(accessKey);
    } catch (error) {
      return { error: 'Something went wrong! try again.' };
    }
  };

  return (
    <DropdownMenu>
      {user?._id ? (
        <DropdownMenuTrigger asChild>
          {user?.image ? (
            <Avatar>
              <CustomImage src={user?.image} alt="user image" priority={true} />
            </Avatar>
          ) : (
            <User className="w-full h-full text-white" />
          )}
        </DropdownMenuTrigger>
      ) : (
        <Link href={'/signIn'}>
          <Button>Sign In</Button>
        </Link>
      )}

      <DropdownMenuContent className=" w-48 mt-2 mr-2">
        <DropdownMenuLabel>
          {user?.name ? user?.name : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/dashboard`}>
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <form action={handleSignout} className="space-y-1">
          <input hidden />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
