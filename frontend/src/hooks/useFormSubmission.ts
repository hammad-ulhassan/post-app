import { useState } from "react";
import type { PostForm } from "../models/post";
import axios from "axios";

const useFormSubmission = () => {
  const[isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePost = async (postId: number, data: PostForm) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          id: postId,
          title: data.title,
          body: data.body,
          userId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);

      let errorMessage = "Failed to update post";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err;
    }
  };

  return {
    updatePost,
    isLoading,
    error,
    clearError: () => setError(""),
  };
};

export default useFormSubmission;
