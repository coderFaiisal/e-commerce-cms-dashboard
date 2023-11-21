import { useGetAdminProfileQuery } from "@/redux/features/admin/adminApi";
import AdminProfile from "./adminProfile";
import { MainNav } from "./mainNav";
import StoreSwitcher from "./storeSwitcher";
import { useGetAllStoresQuery } from "@/redux/features/store/storeApi";
import { ThemeToggle } from "./themeToggle";

const Navbar = ({ storeId }: { storeId: string }) => {
  const { data: stores } = useGetAllStoresQuery({});
  const { data } = useGetAdminProfileQuery({});

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 ">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <AdminProfile storeId={storeId} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
