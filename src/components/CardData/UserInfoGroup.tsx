import React from "react";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

interface UserInfoGroupProps {
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  avatarUrl: string;
}

const UserInfoGroup: React.FC<UserInfoGroupProps> = ({ user }) => {
  return (
    <div className="info-group">
      <p>
        <MailOutlined />
        <span>{user.email}</span>
      </p>
      <p>
        <PhoneOutlined />
        <span>{user.phone}</span>
      </p>
      <p>
        <GlobalOutlined />
        <span>{"http://" + user.website}</span>
      </p>
    </div>
  );
};

export default UserInfoGroup;
