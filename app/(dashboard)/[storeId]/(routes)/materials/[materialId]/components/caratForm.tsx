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
import { useCreateMaterialMutation, useDeleteMaterialMutation, useUpdateMaterialMutation } from "@/redux/features/material/materialApi";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  categoryId: z.string().min(1),
});

type MaterialFormValues = z.infer<typeof formSchema>;

interface MaterialFormProps {
  initialData: any;
  categories: any;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const id = params.materialId;
  const storeId = params.storeId;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [createMaterial] = useCreateMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();
  const [deleteMaterial] = useDeleteMaterialMutation();

  const title = initialData ? "Edit material" : "Create material";
  const description = initialData ? "Edit a material" : "Add a new material";

  const action = initialData ? "Save changes" : "Create";

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageURL: "",
    },
  });

  const onSubmit = async (data: MaterialFormValues) => {
    setLoading(true);

    if (initialData) {
    
      const res: any = await updateMaterial({ id, data });

      if (res?.data?._id) {
        router.push(`/${params.storeId}/materials`);
        toast.success("Material updated successfully");
      } else if (res?.error) {
        toast.error(res?.error?.message);
      }
    } else {
      const materialData = {
        name: data.name,
        value: data.value,
        storeId,
        categoryId: data.categoryId,
      };

      const res: any = await createMaterial(materialData);

      if (res?.data?._id) {
        router.push(`/${params.storeId}/materials`);
        toast.success("Material created successfully");
      } else if (res?.error) {
        toast.error(res?.error?.message);
      }
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);

    const res: any = await deleteMaterial(id);

    if (res?.data?._id) {
      router.push(`/${params.storeId}/materials`);
      toast.success("Material deleted successfully");
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
        <Heading title={title} description={description} />
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
                      placeholder="Material name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Material value"
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
                      {categories.map((category: any) => (
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
