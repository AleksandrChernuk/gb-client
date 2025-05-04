export type TypeSignup = {
  userName: string;
  email: string;
  password: string;
};

export type TypeSignin = {
  email: string;
  password: string;
};

export type TypeVerifyCode = {
  email: string;
  code: string;
};
