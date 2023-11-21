"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alertModal";

import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ui/imageUpload";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  storeId: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Select a category, please",
  }),
  materialId: z.string().min(1, {
    message: "Select a material, please",
  }),
  caratId: z.string().min(1, {
    message: "Select a carat, please",
  }),
  name: z.string().min(3, {
    message: "Name at least 3 characters",
  }),
  price: z.coerce.number({ required_error: "Price is required" }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, {
      message: "At least 10 characters",
    })
    .max(160, {
      message: "Not be longer than 40 characters",
    }),
  images: z
    .array(
      z.string({
        required_error: "Images required",
      })
    )
    .min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  status: z.string({
    required_error: "Status is required",
  }),
  stockQuantity: z.coerce.number().min(1, {
    message: "Stock quantity is required",
  }),
  materials: z
    .array(z.string(), { required_error: "Select at least one item" })
    .refine((value) => value.some((item) => item), {
      message: "Select at least one item",
    }),
  dimensions: z.string().optional(),
  discounts: z.string().optional(),
  returnPolicy: z.string().optional(),
  customizable: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any;
  categories: any;
  carats: any;
  materials: any;
}

const items = [
  {
    id: "diamond",
    label: "Diamond",
  },
  {
    id: "platinum",
    label: "Platinum",
  },
  {
    id: "gold",
    label: "Gold",
  },
  {
    id: "pearls",
    label: "Pearls - (Rubies, Sapphires, Emeralds)",
  },
  {
    id: "silver",
    label: "Silver",
  },
  {
    id: "titanium",
    label: "Titanium",
  },
] as const;

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  carats,
  materials,
}) => {
  const params = useParams();
  const id = params.productId;
  const storeId = params.storeId;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const title = initialData ? "Edit product" : "Create product";
  const productDescription = initialData
    ? "Edit a product"
    : "Add a new product";

  const action = initialData ? "Save changes" : "Create";

  const defaultValues = {
    categoryId: initialData?.categoryId?._id,
    caratId: initialData?.caratId?._id,
    materialId: initialData?.materialId?._id,
    name: initialData?.name,
    price: initialData?.price,
    description: initialData?.description,
    images: initialData?.images,
    isFeatured: initialData?.isFeatured,
    isArchived: initialData?.isArchived,
    status: initialData?.status,
    stockQuantity: initialData?.stockQuantity,
    materials: initialData?.productMaterials,
    dimensions: initialData?.dimensions,
    discounts: initialData?.discounts,
    returnPolicy: initialData?.returnPolicy,
    customizable: initialData?.customizable,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);

    if (initialData) {
      const res: any = await updateProduct({ id, data });

      if (res?.data?._id) {
        router.push(`/${params.storeId}/products`);
        toast.success("Product updated successfully");
      } else if (res?.error) {
        toast.error(res?.error?.message);
      }
    } else {
      data.storeId = storeId as string;

      const res: any = await createProduct(data);

      if (res?.data?._id) {
        router.push(`/${params.storeId}/products`);
        toast.success("Product created successfully");
      } else if (res?.error) {
        toast.error(res?.error?.message);
      }
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);

    const res: any = await deleteProduct(id);

    if (res?.data?._id) {
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted successfully");
    } else if (res?.error) {
      toast.error(res?.error?.message);
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={productDescription} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image: any) => image)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Set product status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="stock">In stock</SelectItem>
                      <SelectItem value="stock out">Stock out</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dimensions</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product dimensions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category: any) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caratId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carat</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a carat"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carats?.map((carat: any) => (
                        <SelectItem key={carat._id} value={carat._id}>
                          {carat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="materialId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a material"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {materials?.map((material: any) => (
                        <SelectItem key={material._id} value={material._id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customizable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Customizable</FormLabel>
                    <FormDescription>Select for customizable</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounts</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product discounts"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="returnPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Policy</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Return policy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="materials"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Materials</FormLabel>
                    <FormDescription>
                      Select additional materials
                    </FormDescription>
                  </div>
                  {items?.map((item: any) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="materials"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field?.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? (
              <>
                {action}
                <CustomLoader>
                  <RingLoader color="#ffffff" size={30} />
                </CustomLoader>
              </>
            ) : (
              action
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
