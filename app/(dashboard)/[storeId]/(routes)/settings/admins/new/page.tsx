import { AdminForm } from "./components/adminForm";

const AdminPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminForm />
      </div>
    </div>
  );
};

export default AdminPage;