'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { storeUserInfo } from '@/services/auth.service';
import { notify } from '@/utils/customToast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [userLogin] = useUserLoginMutation();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'At least 6 characters',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(loginData: z.infer<typeof FormSchema>) {
    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await userLogin(loginData);

    if (res && res?.data?.accessToken) {
      notify('success', 'Login in successfully!');
      storeUserInfo(res?.data?.accessToken);
      router.push('/');
    } else {
      notify('error', 'Please, try again!', res?.error?.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in Account</CardTitle>
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

              <Button disabled={loading} className="w-full">
                {loading ? (
                  <>
                    {'Sign In'}
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardContent>
          </form>
        </Form>

        <CardFooter className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <p className="text-center text-sm">
            Don&apos;t have an account?
            <Link href={'/singUp'}>
              <span className="font-bold cursor-pointer underline underline-offset-2 ml-2">
                Sign Up
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
