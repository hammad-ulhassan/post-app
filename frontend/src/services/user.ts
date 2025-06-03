import type { Post } from "../models/post";
import type { User } from "../models/user";
import { getRandomInt } from "../utils";
import { userApi } from "./baseQuery";

const randomUserId = getRandomInt(1, 10)

const getRandomUser = () => ({
  url: `${randomUserId}`,
  method: "GET",
});

const getUserPosts = () => ( {
  url: `${randomUserId}/posts`,
  method: "GET",
} )

const mainUserApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    getRandomUser: build.query<User, null>({
      query: getRandomUser,
    }),
    getUserPosts: build.query<Post[], null>( {
      query: getUserPosts
    } )
  }),
  overrideExisting: false,
});

export const {
  useGetRandomUserQuery,
  useGetUserPostsQuery,
} = mainUserApi;

