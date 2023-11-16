import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  return <div className="flex-col">This is Dashboard page</div>;
};

export default DashboardPage;
