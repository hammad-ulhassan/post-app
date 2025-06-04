import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../services/post";

interface PostPageProps {
  edit: boolean;
}

const PostPage = ({ edit }: PostPageProps) => {
  const { id } = useParams();
  const postId = id ? Number(id) : 0;
  const isValidId = id && !isNaN(postId) && postId > 0;

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching: userPostsFetching,
  } = useGetPostQuery(
    { postId },
    {
      skip: !isValidId,
    }
  );
  return <Card></Card>;
};

export default PostPage;
