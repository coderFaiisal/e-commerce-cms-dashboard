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

import { forgotPassword } from '@/app/(auth)/forgot/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { storeUserInfo } from '@/services/auth.service';
import { notify } from '@/utils/customToast';
import { useRouter } from 'next/navigation';
import LoadingButton from '../loadingButton';

const ForgotPassword = () => {
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await forgotPassword(data);

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
              <CardTitle className="text-xl">Password Forgot?</CardTitle>
              <CardDescription>Enter your email.</CardDescription>
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

              <LoadingButton type="submit" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
