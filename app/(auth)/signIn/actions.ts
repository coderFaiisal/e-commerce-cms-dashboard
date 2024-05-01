'use server';

import { accessKey, refreshKey } from '@/constants/authKey';
import { createToken } from '@/helpers/jwt';
import prisma from '@/lib/prisma';
import { LoginData } from '@/types/auth';
import { cookies } from 'next/headers';

export const logiUser = async (loginData: LoginData) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user) return { error: 'User not found!' };

    if (user.password !== loginData.password)
      return { error: 'Password not matched!' };

    const { id, role } = user;

    const accessToken = createToken({ id, role }, 'access');
    const refreshToken = createToken({ id, role }, 'refresh');

    cookies().set(accessKey, accessToken);
    cookies().set(refreshKey, refreshToken);

    return { success: true };
  } catch (error) {
    return { error: 'Login failed! Try again.' };
  }
};
