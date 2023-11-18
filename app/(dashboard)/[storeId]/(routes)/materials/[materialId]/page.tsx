"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetSingleMaterialQuery } from "@/redux/features/material/materialApi";
import { MaterialForm } from "./components/caratForm";

const MaterialPage = ({ params }: { params: { materialId: string } }) => {
  const { data: material, isLoading: isMaterialLoading } = useGetSingleMaterialQuery(
    params.materialId
  );

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});

  if (isMaterialLoading || isCategoriesLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaterialForm categories={categories} initialData={material} />
      </div>
    </div>
  );
};

export default MaterialPage;
