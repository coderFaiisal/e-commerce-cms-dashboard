import { AdminsClient } from "./components/client";

const AdminsPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <AdminsClient />
      </div>
    </div>
  );
};

export default AdminsPage;
