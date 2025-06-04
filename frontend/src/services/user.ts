import { User } from "../constants/endpoints";
import type { Response } from "../models/api";
import type { Post } from "../models/post";
import type { User as UserType } from "../models/user";
import { getRandomInt } from "../utils";
import { userApi } from "./baseQuery";

const randomUserId = getRandomInt(1, 10)

const getRandomUser = () => ({
  url: `${randomUserId}`,
  method: "GET",
});

const getUserPosts = () => ( {
  url: `${randomUserId}/${User.POSTS}`,
  method: "GET",
} )

const getRandomImageUrl = (width = 400, height = 300) => {
  const imageId = getRandomInt(1, 500);
  return `https://picsum.photos/id/${imageId}/${width}/${height}`;
};

const transformPostsWithImages = ( response: Response<Post[]> ): Post[] => {
  if( response.success ) {
    return response.data.map(post => ({
      ...post,
      imageUrl: getRandomImageUrl(400, 300)
    }));
  }
  return [];
};

const mainUserApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    getRandomUser: build.query<UserType, null>({
      query: getRandomUser,
      transformResponse: ( res: Response<UserType> ) => {
        return res.data
      }
    }),
    getUserPosts: build.query<Post[], null>( {
      query: getUserPosts,
      transformResponse: (response: Response<Post[]>) => transformPostsWithImages(response)
    } )
  }),
  overrideExisting: false,
});

export const {
  useGetRandomUserQuery,
  useGetUserPostsQuery,
} = mainUserApi;
