"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import ImageUpload from "@/components/ui/imageUpload";
import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";
import { useUpdateAdminProfileMutation } from "@/redux/features/admin/adminApi";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  image: z.string({ required_error: "Image is required" }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  data: any;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [updateAdmin] = useUpdateAdminProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      image: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);

    const res: any = await updateAdmin(data);

    if (res?.data?._id) {
      router.push(`/${params.storeId}/profile`);
      toast.success("Profile updated successfully");
    } else if (res?.error) {
      toast.error(res?.error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Heading
        title="Edit Profile"
        description="Edit your profile information"
      />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? (
              <>
                {"Save changes"}
                <CustomLoader>
                  <RingLoader color="#ffffff" size={30} />
                </CustomLoader>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
