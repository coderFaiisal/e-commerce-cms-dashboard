"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";

import { useGetAllMaterialsQuery } from "@/redux/features/material/materialApi";
import { useGetAllCaratsQuery } from "@/redux/features/carat/caratApi";
import { ProductForm } from "./components/productForm";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const { data: product, isLoading: isProductLoading } =
    useGetSingleProductQuery(params.productId);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});

  const { data: carats, isLoading: isCaratLoading } = useGetAllCaratsQuery({});

  const { data: materials, isLoading: isMaterialLoading } =
    useGetAllMaterialsQuery({});

  if (
    isProductLoading ||
    isCaratLoading ||
    isMaterialLoading ||
    isCategoriesLoading
  ) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          carats={carats}
          materials={materials}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
