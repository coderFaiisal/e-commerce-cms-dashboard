"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { useAdminSignInMutation } from "@/redux/api/authApi";
import { storeAdminInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const SignIn = () => {
  const [adminSignIn] = useAdminSignInMutation();
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "At least 3 characters",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res: any = await adminSignIn(data);

    if (res && res?.data?.accessToken) {
      toast.success("Sign in successfully!");
      storeAdminInfo(res?.data?.accessToken);
      router.push("/");
    } else {
      toast.message(res?.error?.message, {
        description: "Please, try again!",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign In Account</CardTitle>
              <CardDescription>
                Enter your email & password to access account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign In</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
