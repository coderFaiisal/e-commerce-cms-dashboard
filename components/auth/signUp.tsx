'use client';

import { signUpUser } from '@/app/(auth)/signUp/actions';
import LoadingButton from '@/components/loadingButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import ImageUpload from '../imageUpload';

const formSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }).min(1),
    email: z.string({ required_error: 'Email is required' }).email(),
    imageUrl: z.string({ required_error: 'Image is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 or more long' }),
    confirmPassword: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(6, { message: 'Password must be 6 or more long' }),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Confirm passwords does not match!',
      path: ['confirmPassword'],
    },
  );

type RegisterFormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('form data: ', data);

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      imageUrl: data.imageUrl,
    };

    try {
      const result = await signUpUser(userData);
      console.log('sign up respons result here: ', result);
      // if (result.success) {
      //   router.push('/');
      // }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="border md:border-none shadow-sm md:shadow-none rounded-md p-4 md:p-0 my-4">
      <div className="my-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Register
        </h2>
        <p className="text-sm text-muted-foreground">
          Create an account and unlock more features.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={url => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" type="email" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
      <p className="m-1 my-2 text-sm">
        Already have an account?{' '}
        <Link
          href={'/login'}
          className="font-bold underline underline-offset-2 cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
