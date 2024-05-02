'use server';

import { getBaseUrl } from '@/helpers/config/envConfig';
import axios from 'axios';
import { revalidateTag } from 'next/cache';

export const resetPassword = async ({
  token,
  data,
}: {
  token: string;
  data: { newPassword: string };
}) => {
  try {
    const result = await axios.post(
      `${getBaseUrl()}/users/reset-password`,
      data,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    revalidateTag('user');

    return result.data;
  } catch (error) {
    return { error: { message: 'failed! Please try again.' } };
  }
};
