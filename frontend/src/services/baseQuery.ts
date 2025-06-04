import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { environment } from "../config/env";

export const userApi = createApi({
  reducerPath: "user-api",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: environment.USER_BASE_URL,
  }),
  endpoints: () => ({}),
});

export const postApi = createApi({
  reducerPath: "posts",
  tagTypes: [ "posts" ],
  baseQuery: fetchBaseQuery({
    baseUrl: environment.POST_BASE_URL,
  }),
  endpoints: () => ({}),
})
