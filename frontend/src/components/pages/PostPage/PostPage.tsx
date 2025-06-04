import { Button, Card, Flex, Form, Image, Input, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../services/post";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import type { PostForm } from "../../../models/post";
import usePostSubmission from "../../../hooks/useFormSubmission";

interface PostPageProps {
  edit: boolean;
}

const defaultPostValues: PostForm = {
  title: "",
  body: "",
};

const PostPage = ({ edit }: PostPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = id ? Number(id) : 0;
  const isValidId = id && !isNaN(postId) && postId > 0;

  const {
    data: post,
    isLoading: postLoading,
    isFetching: postFetching,
  } = useGetPostQuery(
    { postId },
    {
      skip: !isValidId,
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>({
    defaultValues: defaultPostValues,
    mode: "onChange",
  });

  const { updatePost, isLoading: submissionLoading, clearError } = usePostSubmission();

  const onFormSubmit = async (data: PostForm) => {
    try {
      clearError();
      const updatedPost = await updatePost(postId, data);
      console.log('Post updated successfully:', updatedPost);
      navigate("/dashboard");
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };
  const onCancel = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <Card variant="borderless">
      {!edit && (
        <Flex vertical align="center">
          {postLoading || postFetching || submissionLoading ? <Spin /> : null}
          <Typography.Title level={4}>{post?.title}</Typography.Title>
          <Image
            width={150}
            height={100}
            src={post?.imageUrl}
            preview={false}
            loading={"lazy"}
          />
          <Typography.Text>{post?.body}</Typography.Text>
        </Flex>
      )}
      {edit && (
        <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
          <Form.Item
            label="Title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={post?.title || "Enter post title"}
                  status={errors.title ? "error" : ""}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Body"
            validateStatus={errors.body ? "error" : ""}
            help={errors.body?.message}
          >
            <Controller
              name="body"
              control={control}
              rules={{
                required: "Body is required",
                minLength: {
                  value: 10,
                  message: "Body must be at least 10 characters",
                },
              }}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder={ post?.body || "Enter post body" }
                  rows={4}
                  status={errors.body ? "error" : ""}
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Flex gap="small">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Flex>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default PostPage;
