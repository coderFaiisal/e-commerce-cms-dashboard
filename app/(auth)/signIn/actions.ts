'use server';

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { TSignIn } from '@/types/user';
import { revalidateTag } from 'next/cache';

export const signInUser = async (signIpData: TSignIn) => {
  try {
    const result = await axiosBaseQuery({
      url: '/users/sign-in',
      method: 'POST',
      data: signIpData,
    });

    revalidateTag('user');

    return result;
  } catch (error) {
    return { error: { message: 'Sign in failed! Try again.' } };
  }
};
