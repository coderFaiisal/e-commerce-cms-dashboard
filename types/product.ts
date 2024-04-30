export type TProduct = {
  _id: string;
  name: string;
  price: number;
  productCode?: string;
  description: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  status: 'stock' | 'stock out';
  stockQuantity: number;
  discounts?: number;
  returnPolicy?: string;

  storeId: string;
  categoryId: string;
  attributeIds: string[];
};

export type TProductReview = {
  rating: number;
  message?: string;
  productId: string;
  userId?: string;
};
