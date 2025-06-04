import { Button, Image, List } from "antd";
import type { Post } from "../../../models/post";
import { useCallback } from "react";
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ListItemProps {
  post: Post;
}

const ListItem = ({ post }: ListItemProps) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`post/${post.id}`)
  }, [ navigate, post ]);

  return (
    <List.Item
      onClick={handleClick}
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.backgroundColor = "#f5f5f5";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.backgroundColor = "transparent";
      }}
      actions={[
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`post/${post.id}/edit`)
          }}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Image width={150} height={100} src={post.imageUrl} preview={false} />
        }
        title={post.title}
        description={post.body}
      />
    </List.Item>
  );
};

export default ListItem;
