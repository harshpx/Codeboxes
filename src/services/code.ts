import { baseUrl } from "@/lib/utils";

export const getCodes = async (token: string) => {
  const url = `${baseUrl}/api/v1/codes`;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(url, options);
  return await res.json();
};
