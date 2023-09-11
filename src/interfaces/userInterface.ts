export interface InputUserInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OutputUserInterface {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  createdAt: string | undefined;
  message: string | undefined;
}

export interface LoginInputInterface {
  id: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface loginOutputInterface {
  id?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  message: string | undefined;
}
