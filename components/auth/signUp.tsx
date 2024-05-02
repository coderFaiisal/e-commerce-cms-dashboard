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
import { storeUserInfo } from '@/services/auth.service';
import { notify } from '@/utils/customToast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ImageUpload from '../imageUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const formSchema = z
  .object({
    name: z.string({ required_error: 'Name is required.' }).min(2),
    email: z.string({ required_error: 'Email is required.' }).email(),
    image: z.string({ required_error: 'Image is required.' }),
    role: z.string().optional(),
    phoneNumber: z.coerce.number().optional(),
    gender: z
      .enum(['male', 'female', 'others'] as [string, ...string[]])
      .optional(),
    dobDay: z.coerce.number().optional(),
    dobMonth: z.coerce.number().optional(),
    dobYear: z.coerce.number().optional(),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, { message: 'Password must be 6 or more long.' }),
    confirmPassword: z
      .string({
        required_error: 'Confirm password is required.',
      })
      .min(6, { message: 'Password must be 6 or more long.' }),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Confirm password not match!',
      path: ['confirmPassword'],
    },
  );

type SignUpFormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpFormValues) => {
    const signUpData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'store-owner',
      image: data.image,
      phoneNumber: data.phoneNumber?.toString() || '',
      gender: data.gender || '',
      dob: `${data.dobYear}-${data.dobMonth}-${data.dobDay}` || '',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await signUpUser(signUpData);

    if (result && result?.success) {
      notify('success', result.message);

      const accessToken = result.data.accessToken;
      storeUserInfo(accessToken);

      router.push('/');
    } else if (result.error) {
      notify('error', result.error.message);
    }
  };

  return (
    <div className="border md:border-none shadow-sm md:shadow-none rounded-md p-4 md:p-0 my-4">
      <div className="my-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Sign Up
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
            name="image"
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
                    <Input {...field} />
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number{' '}
                    <span className="text-xs opacity-70">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender{' '}
                    <span className="text-xs opacity-70">(optional)</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>
                Date of Birth{' '}
                <span className="text-xs opacity-70">(optional)</span>
              </FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="dobDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="DD" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dobMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="MM" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dobYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <LoadingButton type="submit" loading={isSubmitting}>
            Sign Up
          </LoadingButton>
        </form>
      </Form>
      <p className="m-1 my-2 text-sm">
        Already have an account?
        <Link
          href={'/signIn'}
          className="font-bold underline underline-offset-2 cursor-pointer ml-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
