import { JwtPayload } from 'jwt-decode';
import { LucideIcon } from 'lucide-react';

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

export type TRegisterResponse = {
  data: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
};

export type CustomJwtPayload = {
  id: string;
  role: string;
} & JwtPayload;

export type TSideNavItemsProps = {
  title: string;
  label: string;
  link: string;
  key: string;
  icon: LucideIcon;
  variant:
    | 'ghost'
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | null
    | undefined;
}[];

export type User = {
  id: string;
  role: string;
};
