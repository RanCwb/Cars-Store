import { ReactNode } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
  password?: string;
}
export interface AuthProviderProps {
  children: ReactNode;
}
