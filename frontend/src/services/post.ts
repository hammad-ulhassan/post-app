import type { Response } from "../models/api";
import type { Post } from "../models/post";
import { postApi } from "./baseQuery";

interface getPostParam {
  postId: number;
}

const getPost = ({ postId }: getPostParam) => ({
  url: `${postId}`,
  method: "GET",
});

const mainPostApi = postApi.injectEndpoints({
    endpoints: (build) => { 
      return {
        getPost: build.query<Post, getPostParam>({
            query: getPost,
            transformResponse: ( resp: Response<Post> ) => {
              return resp.data
            }
        })
    }},
    overrideExisting: true,
});

export const {
    useGetPostQuery
} = mainPostApi;
