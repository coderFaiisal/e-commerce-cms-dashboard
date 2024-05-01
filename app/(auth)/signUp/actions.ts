'use server';

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { TSignUp } from '@/types/user';

export const signUpUser = async (signUpData: TSignUp) => {
  try {
    const result = await axiosBaseQuery({
      url: '/users/sign-up',
      method: 'POST',
      data: signUpData,
    });

    return result;

    // cookies().set(accessKey, accessToken);

    // return { success: true };
  } catch (error) {
    return { error: 'Registration failed! Try again.' };
  }
};
