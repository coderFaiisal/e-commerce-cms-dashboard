"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Store, User } from "lucide-react";

export function SidebarNav() {
  const params = useParams();
  const storeId = params.storeId;

  const pathname = usePathname();

  console.log(pathname);

  const NavItems = [
    {
      title: "Manage Store",
      icon: <Store className="w-4 h-4 font-thin text-muted-foreground mr-2" />,
      href: `/${storeId}/settings`,
    },
    {
      title: "Manage Admin",
      icon: <User className="w-4 h-4 font-thin text-muted-foreground mr-2" />,
      href: `/${storeId}/settings/admins`,
    },
  ];

  return (
    <nav className="h-[450px] flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {NavItems?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:bg-slate-50",
            "justify-start"
          )}
        >
          {item.icon} {item.title}
        </Link>
      ))}
    </nav>
  );
}
