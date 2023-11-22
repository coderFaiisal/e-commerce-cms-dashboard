"use client";

import { useGetSingleMaterialQuery } from "@/redux/features/material/materialApi";
import { MaterialForm } from "./components/materialForm";
import { useParams } from "next/navigation";
import { useGetAllCaratsQuery } from "@/redux/features/carat/caratApi";

const MaterialPage = () => {
  const params = useParams();
  const { storeId, materialId } = params;

  const { data: material, isLoading: isMaterialLoading } =
    useGetSingleMaterialQuery(materialId);

  const { data: carats = [], isLoading: isCaratsLoading } =
    useGetAllCaratsQuery(storeId);

  if (isMaterialLoading || isCaratsLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaterialForm initialData={material} carats={carats} />
      </div>
    </div>
  );
};

export default MaterialPage;
