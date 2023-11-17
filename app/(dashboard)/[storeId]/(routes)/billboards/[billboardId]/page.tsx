"use client";

import { BillboardForm } from "./components/billboard-form";
import { useGetSingleBillboardQuery } from "@/redux/features/billboard/billboardApi";

const BillboardPage = ({ params }: { params: { billboardId: string } }) => {
  const { data: billboard, isLoading } = useGetSingleBillboardQuery(
    params.billboardId
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
