import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Badge, Avatar } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  SendOutlined,
  BellOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  FolderOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useGetRandomUserQuery } from "../../../services/user";
import UserSection from "../../common/UserSection";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: randomUser } = useGetRandomUserQuery(null);

  const menuItems = [
    {
      key: "dashboards-group",
      label: "Dashboards",
      type: "group" as const,
      collapsed: false,
      children: [
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: "Overview",
        },
        {
          key: "/calendar",
          icon: <CalendarOutlined />,
          label: "Calendar",
        },
        {
          key: "/schedule",
          icon: <SendOutlined />,
          label: "Schedule Actions",
        },
        {
          key: "/alerts",
          icon: <BellOutlined />,
          label: "Live Alerts",
        },
      ],
    },
    {
      key: "blogs-group",
      label: "Blogs",
      type: "group" as const,
      children: [
        {
          key: "/blogs",
          icon: <FileTextOutlined />,
          label: "All",
        },
        {
          key: "/blogs/latest",
          icon: <ClockCircleOutlined />,
          label: "Latest",
        },
        {
          key: "/blogs/archived",
          icon: <FolderOutlined />,
          label: "Archived",
        },
      ],
    },
    {
      key: "documentation-group",
      label: "DOCUMENTATION",
      type: "group" as const,
      children: []
    },
    {
      key: "reports-group",
      label: "REPORTS",
      type: "group" as const,
      children: []
    },
    {
      key: "help-group",
      label: "NEED HELP?",
      type: "group" as const,
      children: []
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "transparent",
          padding: 0,
          display: "flex",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          height: "64px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: collapsed ? 80 : 280,
            background: "#4f7cff",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            transition: "width 0.2s ease",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            QDB
          </div>

          <Button
            type="text"
            style={{ color: "white", marginLeft: "auto" }}
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <div
          style={{
            flex: 1,
            background: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          <div style={{ flex: 1, maxWidth: "400px" }}>
            <div
              style={{
                background: "rgba(0,0,0,0.04)",
                borderRadius: "8px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <SearchOutlined />
              <input
                placeholder="Type here to search..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button type="text">+ Add</Button>

            <Badge count={1} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>

            <Badge count={4} size="small">
              <Button type="text" icon={<QuestionCircleOutlined />} />
            </Badge>

            <Badge count={6} size="small">
              <Button type="text" icon={<FileTextOutlined />} />
            </Badge>

            <Avatar
              size={32}
              src={
                randomUser
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      randomUser.name
                    )}`
                  : undefined
              }
              style={{
                backgroundColor: randomUser ? undefined : "rgba(0,0,0,0.1)",
                border: "2px solid rgba(0,0,0,0.05)",
              }}
            >
              {!randomUser ? "?" : undefined}
            </Avatar>
          </div>
        </div>
      </Header>

      <Layout style={{ marginTop: "64px" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={280}
          collapsedWidth={80}
          style={{
            background: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          }}
          trigger={null}
        >
          <UserSection user={randomUser} collapsed={collapsed} />
          <Menu
            mode="inline"
            defaultSelectedKeys={["/blogs"]}
            defaultOpenKeys={["blogs-group"]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{
              border: "none",
              fontSize: "14px",
            }}
          />
        </Sider>

        <Layout>
          <Content
            style={{
              padding: "24px",
              background: "#f5f5f5",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
