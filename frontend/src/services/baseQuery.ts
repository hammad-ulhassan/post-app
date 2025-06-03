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
