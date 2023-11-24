"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import Link from "next/link";
import { removeAdminInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomImage from "./customImage";
import { authKey } from "@/constants/storageKey";

export default function AdminProfile({
  storeId,
  data,
}: {
  storeId: string;
  data: any;
}) {
  const router = useRouter();

  const handleSignOut = () => {
    removeAdminInfo(authKey);
    toast.success("Signed out successfully");
    router.push("/signIn");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {data?.image ? (
            <CustomImage src={data?.image} alt="admin image" priority={true} />
          ) : (
            <CustomImage
              src="https://github.com/shadcn.png"
              alt="default image"
              priority={true}
            />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48 mt-2 mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${storeId}/profile`}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href={`/${storeId}/settings`}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSignOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
