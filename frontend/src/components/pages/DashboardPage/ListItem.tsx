import { Image, List, Typography } from "antd";
import type { Post } from "../../../models/post";

interface ListItemProps {
  post: Post;
}

const ListItem = ({ post }: ListItemProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Image
            width={150}
            height={100}
            src={post.imageUrl}
            preview={false}
          />
        }
        title={<Typography.Title level={4} style={{margin: 0}}>{post.title}</Typography.Title>}
        description={post.body}
      />
    </List.Item>
  );
};

export default ListItem;
