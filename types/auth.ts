export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = {
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
  phoneNumber?: string;
  gender?: string;
  dob?: string;
};
