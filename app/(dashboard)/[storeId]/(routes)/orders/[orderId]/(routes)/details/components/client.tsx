"use client";

import CustomImage from "@/components/customImage";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductsClientProps {
  products: any;
}

export const ProductsTable = ({ products }: ProductsClientProps) => {
  const formattedProducts = products?.map((item: any) => ({
    id: item?.productId?._id,
    image: item?.productId?.images[0],
    name: item?.productId?.name,
    price: item?.productId?.price,
    quantity: item?.quantity,
    status: item?.productId?.status,
  }));

  return (
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Stock Status</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formattedProducts.map((product: any) => (
          <TableRow key={product?.name}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-4">
                  <CustomImage
                    className="w-full h-full"
                    src={product?.image}
                    alt="product image"
                  />
                </div>
                {product?.name}
              </div>
            </TableCell>
            <TableCell>{product?.quantity}</TableCell>
            <TableCell>{product?.status}</TableCell>
            <TableCell className="text-right">${product?.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
