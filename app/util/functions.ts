import cookie from "cookie";
import jwt from "jsonwebtoken";
import { ContestCol, UserOnClient } from "./types";
import useSWR from "swr";

export function getServerUrl(url: string) {
  let SERVER_URL;
  if (process.env.NODE_ENV === "production") {
    SERVER_URL = "https://clash-of-codes-api-pwiz.onrender.com";
  } else {
    SERVER_URL = "http://localhost:3001";
  }
  return `${SERVER_URL}${url}`;
}

export function customFetch(url: string, options?: any) {
  options = options || {};

  options.headers = {
    ...options.headers,
    auth: document.cookie,
    "Content-Type": "application/json",
  };

  return fetch(getServerUrl(url), options);
}

export function getUserData() {
  if (!process.browser) return null;
  const cookieObj = cookie.parse(document.cookie);
  const serverToken = cookieObj["server_token"];
  if (!serverToken) {
    return null;
  }
  const userData: UserOnClient = jwt.decode(serverToken) as UserOnClient;
  return userData;
}
//@ts-ignore
export const fetcher = (...args) => {
  args.push({
    headers: {
      auth: document.cookie,
      "Content-Type": "application/json",
    },
  });
  //@ts-ignore
  return fetch(...args)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
};

export function useConfig(
  page: number,
  searchQuery: string,
  maxResults: number
) {
  const { data, error, isLoading, mutate } = useSWR(
    getServerUrl(
      `/admin/config?page=${page}&maxResults=${maxResults}&searchQuery=${searchQuery}`
    ),
    fetcher
  );

  return {
    contests: data as ContestCol[],
    isLoading,
    isError: error,
    mutate,
  };
}
