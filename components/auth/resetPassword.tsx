'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { resetPassword } from '@/app/(auth)/reset/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notify } from '@/utils/customToast';
import { useRouter } from 'next/navigation';
import LoadingButton from '../loadingButton';

const ResetPassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const FormSchema = z.object({
    newPassword: z.string().min(6, {
      message: 'At least 6 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await resetPassword({ token, data });

    if (result && result?.success) {
      notify('success', 'Please sign in.', result.message);

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
              <CardTitle className="text-xl">Reset Password</CardTitle>
              <CardDescription>Enter your new password.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton type="submit" loading={isSubmitting}>
                Reset
              </LoadingButton>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
