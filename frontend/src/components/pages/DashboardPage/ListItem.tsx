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
            width={120}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
