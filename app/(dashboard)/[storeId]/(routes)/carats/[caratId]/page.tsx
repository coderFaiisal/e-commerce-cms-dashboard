"use client";

import { useGetSingleCaratQuery } from "@/redux/features/carat/caratApi";
import { CaratForm } from "./components/caratForm";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const CaratPage = ({ params }: { params: { caratId: string } }) => {
  const { data: carat, isLoading: isCaratLoading } = useGetSingleCaratQuery(
    params.caratId
  );

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});

  if (isCaratLoading || isCategoriesLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaratForm categories={categories} initialData={carat} />
      </div>
    </div>
  );
};

export default CaratPage;
