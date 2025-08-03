import { CodeObjectType } from "@/context/CodeContextProvider";
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

export const getCodeById = async (id: string, token: string) => {
  const url = `${baseUrl}/api/v1/codes/${id}`;
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

export const createCode = async (data: CodeObjectType, token: string) => {
  const url = `${baseUrl}/api/v1/codes`;
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  return await res.json();
};

export const updateCode = async (data: CodeObjectType, token: string) => {
  const url = `${baseUrl}/api/v1/codes`;
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  return await res.json();
};
