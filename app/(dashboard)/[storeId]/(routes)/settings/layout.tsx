import { SidebarNav } from "./components/sidebarNav";
import { Card } from "@/components/ui/card";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className=" flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 p-10">
      <Card className="-mx-4 lg:w-1/5 border-t-4 border-t-black dark:border-t-white">
        <SidebarNav />
      </Card>
      <div className="flex-1">{children}</div>
    </div>
  );
}
