import type { User } from "../models/user";
import { getRandomInt } from "../utils";
import { userApi } from "./baseQuery";

const getRandomUser = () => ({
  url: `${getRandomInt(1, 10)}`,
  method: "GET",
});

const mainUserApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    getRandomUser: build.query<User, null>({
      query: getRandomUser,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRandomUserQuery
} = mainUserApi;

