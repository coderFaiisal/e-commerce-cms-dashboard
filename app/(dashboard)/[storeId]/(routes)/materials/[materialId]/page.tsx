"use client";

import { useGetSingleMaterialQuery } from "@/redux/features/material/materialApi";
import { MaterialForm } from "./components/materialForm";

const MaterialPage = ({ params }: { params: { materialId: string } }) => {
  const { data: material = {}, isLoading } = useGetSingleMaterialQuery(
    params.materialId
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaterialForm initialData={material} />
      </div>
    </div>
  );
};

export default MaterialPage;
