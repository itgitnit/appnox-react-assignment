import React from "react";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";

interface UserActionsProps {
  user: User;
  favoriteStatus: boolean;
  toggleFavorite: (userId: number) => void;
  handleEdit: (user: User) => void;
  deleteCard: (userId: number) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  avatarUrl: string;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  favoriteStatus,
  toggleFavorite,
  handleEdit,
  deleteCard,
}) => {
  return (
    <div className="user-actions">
      {favoriteStatus ? (
        <HeartFilled
          className="action-button"
          style={{
            color: "red",
            transition: "color 0.3s",
          }}
          onClick={() => toggleFavorite(user.id)}
        />
      ) : (
        <HeartOutlined
          className="action-button"
          style={{
            color: "red",
            transition: "color 0.3s",
          }}
          onClick={() => toggleFavorite(user.id)}
        />
      )}
      <EditOutlined
        className="action-button"
        style={{
          color: "black",
        }}
        onMouseEnter={({ currentTarget }) => {
          currentTarget.style.color = "blue";
        }}
        onMouseLeave={({ currentTarget }) => {
          currentTarget.style.color = "black";
        }}
        onClick={() => handleEdit(user)}
      />
      <DeleteFilled
        className="action-button"
        style={{
          color: "black",
        }}
        onMouseEnter={({ currentTarget }) => {
          currentTarget.style.color = "blue";
        }}
        onMouseLeave={({ currentTarget }) => {
          currentTarget.style.color = "black";
        }}
        onClick={() => deleteCard(user.id)}
      />
    </div>
  );
};

export default UserActions;
