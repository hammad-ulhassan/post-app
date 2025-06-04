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
        getPost: build.query({
            query: getPost,
        })
    }},
    overrideExisting: false,
});

export const {
    useGetPostQuery
} = mainPostApi;
