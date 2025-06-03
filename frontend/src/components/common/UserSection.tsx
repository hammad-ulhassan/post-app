import { Avatar, Badge, Button } from "antd";
import type { User } from "../../models/user";
import { 
  BarChartOutlined
} from "@ant-design/icons";

interface UserSectionProps {
  user: User | undefined;
  collapsed: boolean;
}

const UserSection = ({ user, collapsed }: UserSectionProps) => {
  if (collapsed) {
    return (
      <div style={{ 
        padding: "16px 8px", 
        textAlign: "center",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <Badge dot color="#1890ff">
          <Avatar 
            size={40} 
            src={user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : undefined}
            style={{ 
              backgroundColor: user ? undefined : "#f0f0f0",
              color: "#999"
            }}
          >
            {!user ? "?" : undefined}
          </Avatar>
        </Badge>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "24px 16px", 
      textAlign: "center",
      backgroundColor: "#fff",
      borderBottom: "1px solid #f0f0f0"
    }}>
      <Badge dot color="#1890ff" offset={[-8, 8]}>
        <Avatar 
          size={80} 
          src={user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : undefined}
          style={{ 
            backgroundColor: user ? undefined : "#f0f0f0",
            color: "#999",
            marginBottom: "12px"
          }}
        >
          {!user ? "?" : undefined}
        </Avatar>
      </Badge>
      <div style={{ 
        color: "#999", 
        fontSize: "14px", 
        marginBottom: "4px" 
      }}>
        Hello
      </div>
      <div style={{ 
        fontWeight: "600", 
        fontSize: "18px", 
        color: "#333",
        marginBottom: "16px" 
      }}>
        {user ? user.name : "Loading..."}
      </div>
      <Button 
        type="primary" 
        icon={<BarChartOutlined />} 
        style={{ 
          width: "100%",
          borderRadius: "8px",
          fontWeight: "500"
        }}
      >
        Live metrics
      </Button>
    </div>
  );
};

export default UserSection
