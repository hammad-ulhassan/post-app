import { Image, List } from "antd";
import type { Post } from "../../../models/post";
import { useCallback } from "react";

interface ListItemProps {
  post: Post;
}

const ListItem = ({ post }: ListItemProps) => {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

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
