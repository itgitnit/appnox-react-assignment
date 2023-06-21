import React, { useEffect, useState } from "react";
import { Card, Avatar, Modal, Form, Input } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
  HeartFilled,
} from "@ant-design/icons";
import "./ImageCard.css";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  avatarUrl: string;
}

function LoadingMessage() {
  return (
    <div className="sk-circle">
      {[...Array(12)].map((_, index) => (
        <div key={index} className={`sk-circle${index + 1} sk-child`} />
      ))}
    </div>
  );
}

function ImageCard() {
  const [userData, setUserData] = useState<User[]>([]);
  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const usersWithAvatars = data.map((user: User) => ({
          ...user,
          avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${getRandomSeed()}`,
        }));
        setUserData(usersWithAvatars);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const getRandomSeed = () => {
    const seeds = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
    ];
    const randomIndex = Math.floor(Math.random() * seeds.length);
    return seeds[randomIndex];
  };

  const toggleFavorite = (userId: number) => {
    setFavoriteStatus((prevState) => {
      const newState = { ...prevState };
      newState[userId] = !newState[userId];
      return newState;
    });
  };

  const deleteCard = (userId: number) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedUser = {
        ...editingUser!,
        name: values.name,
        email: values.email,
        phone: values.phone,
        website: values.website,
      };
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  if (userData.length === 0) {
    return <LoadingMessage />;
  }

  return (
    <div className="image-card">
      {userData.map((user) => (
        <Card
          key={user.id}
          hoverable
          className="user-card"
          cover={
            <div className="avatar-container">
              <Avatar className="user-avatar" size={180} src={user.avatarUrl} />
            </div>
          }
        >
          <div className="user-details">
            <h3>{user.name}</h3>
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
            <div className="user-actions">
              {favoriteStatus[user.id] ? (
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
          </div>
        </Card>
      ))}
      {editingUser && (
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter an email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter a phone number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter a website" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default ImageCard;
