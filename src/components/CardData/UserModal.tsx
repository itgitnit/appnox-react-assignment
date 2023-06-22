import React from "react";
import { Modal, Form, Input } from "antd";

interface UserModalProps {
  visible: boolean;
  user: User | null;
  form: any;
  onCancel: () => void;
  onSave: (values: any) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  user,
  form,
  onCancel,
  onSave,
}) => {
  const handleSave = () => {
    form.validateFields().then((values: any) => {
      onSave(values);
    });
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
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
  );
};

export default UserModal;
