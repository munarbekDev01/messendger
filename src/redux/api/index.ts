import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  prepareHeaders(headers) {
    const token = localStorage.getItem("auth");
    const token2 = token ? JSON.parse(token) : null
    if (token) headers.set("Authorization", `Bearer ${token2.access}`);
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["inst"],
  endpoints: () => ({}),
});
