"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface MainNavProps {
  onClose: () => void;
}

export function MainNav({ onClose }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/carats`,
      label: "Carats",
      active: pathname === `/${params.storeId}/carats`,
    },
    {
      href: `/${params.storeId}/materials`,
      label: "Materials",
      active: pathname === `/${params.storeId}/materials`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
  ];

  return (
    <div className="flex flex-col  md:flex-row md:items-center space-y-1 md:space-y-0 px-2 md:px-0 pb-3 md:pb-0 pt-2 md:pt-0 md:space-x-[2px] mx-2 ">
      {routes.map((route) => (
        <Link
          onClick={onClose}
          key={route.href}
          href={route.href}
          className={cn(
            "hover:bg-slate-200 dark:hover:bg-gray-800 rounded-md py-2 text-sm px-2 font-medium transition-colors hover:text-primary",
            route.active
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
