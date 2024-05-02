'use server';

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { TSignIn } from '@/types/user';

export const SignInUser = async (signIpData: TSignIn) => {
  try {
    const result = await axiosBaseQuery({
      url: '/users/sign-in',
      method: 'POST',
      data: signIpData,
    });

    return result;
  } catch (error) {
    return { error: { message: 'Sign in failed! Try again.' } };
  }
};
