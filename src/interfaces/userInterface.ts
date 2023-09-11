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
}
