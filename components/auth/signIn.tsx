'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { signInUser } from '@/app/(auth)/signIn/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { storeUserInfo } from '@/services/auth.service';
import { notify } from '@/utils/customToast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingButton from '../loadingButton';

const SignIn = () => {
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'At least 6 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(signInData: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await signInUser(signInData);

    if (result && result?.success) {
      notify('success', result.message);

      const accessToken = result.data.accessToken;
      storeUserInfo(accessToken);

      router.push('/');
    } else if (result.error) {
      notify('error', result.error.message);
    }
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
                      <Input type="email" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={'/forgot'}>
                <p className="text-right text-xs font-semibold cursor-pointer">
                  Forgot password?
                </p>
              </Link>

              <LoadingButton type="submit" loading={isSubmitting}>
                Sign In
              </LoadingButton>
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
            <Link href={'/signUp'}>
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
