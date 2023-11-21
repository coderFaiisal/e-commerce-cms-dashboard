"use client";

import { useGetSingleCaratQuery } from "@/redux/features/carat/caratApi";
import { CaratForm } from "./components/caratForm";

const CaratPage = ({ params }: { params: { caratId: string } }) => {
  const { data: carat, isLoading } = useGetSingleCaratQuery(params.caratId);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaratForm initialData={carat} />
      </div>
    </div>
  );
};

export default CaratPage;
