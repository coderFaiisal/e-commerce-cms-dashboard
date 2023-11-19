"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  status: string;
  stockQuantity: string;
  category: string;
  carat: string;
  material: boolean;
  createdAt: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "carat",
    header: "Carat",
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "status",
    header: "Product Status",
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
