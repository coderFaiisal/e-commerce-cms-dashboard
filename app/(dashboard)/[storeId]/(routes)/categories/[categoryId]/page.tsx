"use client";

import { useGetSingleCategoryQuery } from "@/redux/features/category/categoryApi";
import { CategoryForm } from "./components/categoryForm";
import { useGetAllBillboardsQuery } from "@/redux/features/billboard/billboardApi";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const { storeId, categoryId } = params;

  const { data: category, isLoading: isCategoryLoading } =
    useGetSingleCategoryQuery(categoryId);

  const { data: billboards, isLoading: isBillboardsLoading } =
    useGetAllBillboardsQuery(storeId);

  if (isCategoryLoading || isBillboardsLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
