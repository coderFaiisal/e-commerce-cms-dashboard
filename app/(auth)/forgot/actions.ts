'use server';

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';

export const forgotPassword = async (forgotData: { email: string }) => {
  try {
    const result = await axiosBaseQuery({
      url: '/users/forgot-password',
      method: 'POST',
      data: forgotData,
    });

    return result;
  } catch (error) {
    return { error: { message: 'failed! Please try again.' } };
  }
};
