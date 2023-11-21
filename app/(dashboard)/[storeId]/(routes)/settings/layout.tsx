import { SidebarNav } from "./components/sidebarNav";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const sidebarNavItems = [
  {
    title: "My Profile",
    icon: <User />,
    href: "/example/my-profile",
  },
  {
    title: "Edit Profile",
    icon: <User />,
    href: "/example/edit-profile",
  },
  {
    title: "Change Password",
    icon: <User />,
    href: "/example/change-password",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 p-10">
      <Card className="-mx-4 lg:w-1/5">
        <SidebarNav items={sidebarNavItems} />
      </Card>
      <div className="flex-1 lg:max-w-2xl">{children}</div>
    </div>
  );
}
