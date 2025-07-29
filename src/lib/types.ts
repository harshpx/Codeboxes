// file for defining types and utilities related to programming languages

import { languages } from "./utils";

export type LanguageKeyType = keyof typeof languages;
export type UserType = {
  id: "string";
  username: "string";
  email: "string";
  token: "string";
};
export type CompileResultType = {
  output: string | null;
  error: boolean;
};