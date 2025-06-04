import {
  Button,
  Card,
  Dropdown,
  Flex,
  List,
  Menu,
  Space,
  Typography,
  type MenuProps,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import ListItem from "./ListItem";
import { useGetUserPostsQuery } from "../../../services/user";
import { SortAscendingOutlined, WechatWorkOutlined } from "@ant-design/icons";

const items = [
  {
    label: "All Posts",
    key: "all",
  },
  {
    label: "Latest Posts",
    key: "latest",
  },
  {
    label: "Archived",
    key: "archived",
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const dropDownItems: MenuProps["items"] = [
  {
    label: "Title",
    key: "1",
  },
  {
    label: "User",
    key: "2",
  },
];

const menuProps = {
  items: dropDownItems,
  onClick: handleMenuClick,
};

const DashboardPage = () => {
  const [current, setCurrent] = useState("all");
  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching: userPostsFetching,
  } = useGetUserPostsQuery(null);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "1em" }}
      >
        <Flex gap={10}>
          <Button type="primary" style={{padding: "2rem"}} icon={<WechatWorkOutlined style={{ fontSize: '150%'}}/>} size={"large"} />
          <Flex vertical justify="center">
            <Typography.Title level={4} style={{margin: 0}}>All Blog Posts</Typography.Title>
            <Typography.Text disabled>Qatar Development Bank</Typography.Text>
          </Flex>
        </Flex>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Filter/Sort by
              <SortAscendingOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Flex>
      <Card>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Content style={{ padding: "1em" }}>
          <List
            itemLayout="horizontal"
            dataSource={userPosts}
            renderItem={(item) => <ListItem post={item} />}
            loading={userPostsLoading || userPostsFetching}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
              position: "bottom",
              align: "center"
            }}
          />
        </Content>
      </Card>
    </>
  );
};

export default DashboardPage;
