import React from "react";
import { Card, Avatar } from "antd";
import UserInfoGroup from "./UserInfoGroup";
import UserActions from "./UserActions";

interface UserCardProps {
  user: User;
  favoriteStatus: { [key: number]: boolean };
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

const UserCard: React.FC<UserCardProps> = ({
  user,
  favoriteStatus,
  toggleFavorite,
  handleEdit,
  deleteCard,
}) => {
  const AvatarContainer = () => (
    <div className="avatar-container">
      <Avatar className="user-avatar" size={180} src={user.avatarUrl} />
    </div>
  );

  return (
    <Card
      key={user.id}
      hoverable
      className="user-card"
      cover={<AvatarContainer />}
    >
      <div className="user-details">
        <h3>{user.name}</h3>
        <UserInfoGroup user={user} />
        <UserActions
          user={user}
          favoriteStatus={favoriteStatus[user.id]}
          toggleFavorite={toggleFavorite}
          handleEdit={handleEdit}
          deleteCard={deleteCard}
        />
      </div>
    </Card>
  );
};

export default UserCard;
