'use server';

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { TSignUp } from '@/types/user';
import { revalidateTag } from 'next/cache';

export const signUpUser = async (signUpData: TSignUp) => {
  try {
    const result = await axiosBaseQuery({
      url: '/users/sign-up',
      method: 'POST',
      data: signUpData,
    });

    revalidateTag('user');

    return result;
  } catch (error) {
    return {
      error: {
        message: 'Registration failed! Try again.',
      },
    };
  }
};
