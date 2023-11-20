"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { ProductColumn, columns } from "./columns";

export const ProductsClient = () => {
  const params = useParams();
  const storeId = params.storeId;

  const router = useRouter();

  const { data: products = [], isLoading } = useGetAllProductsQuery(storeId);

  if (isLoading) {
    return null;
  }

  const formattedProducts: ProductColumn[] = products?.map((item: any) => ({
    id: item?._id,
    name: item?.name,
    price: item?.price,
    status: item?.status,
    stockQuantity: item?.stockQuantity,
    category: item?.categoryId?.name,
    carat: item?.caratId?.name,
    material: item?.materialId?.name,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${formattedProducts?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedProducts} />
    </>
  );
};
