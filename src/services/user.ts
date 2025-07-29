import { baseUrl } from "@/lib/utils";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const url = `${baseUrl}/api/v1/users/register`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  };
  const data = await fetch(url, options);
  return await data.json();
};

export const loginUser = async (identifier: string, password: string) => {
  const url = `${baseUrl}/api/v1/users/login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  };
  const data = await fetch(url, options);
  return await data.json();
};
