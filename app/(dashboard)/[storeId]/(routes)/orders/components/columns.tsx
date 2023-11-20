"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  trackingNumber: string;
  phoneNumber: string;
  totalCost: number;
  isPaid: boolean;
  orderStatus: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
  },
  {
    accessorKey: "isPaid",
    header: "Is Paid",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
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
