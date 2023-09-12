export interface InputUserInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserInterface {
  id?: string;
  username?: string;
  email?: string ;
  message?: string ;
  createdAt?: string ;
}

export interface LoginInputInterface {
  email: string | undefined;
  password: string | undefined;
}

export interface loginOutputInterface {
  id?: string;
  email: string | undefined;
  password: string | undefined;
  message: string | undefined;
}
