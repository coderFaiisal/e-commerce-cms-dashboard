import { JwtPayload } from 'jwt-decode';

export type TMeta = {
  limit: number;
  page: number;
  size: number;
};

export type ResponseSuccessType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: TMeta;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type TSignUpResponse = {
  data: {
    accessToken: string;
  };
};

export type CustomJwtPayload = {
  email: string;
  role: string;
} & JwtPayload;

export type User = {
  email: string;
  role: string;
};
