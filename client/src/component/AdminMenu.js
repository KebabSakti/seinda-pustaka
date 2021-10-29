import React from "react";
import { Menu } from "antd";
import {
  ContactsOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  AuditOutlined,
  ApartmentOutlined,
  BlockOutlined,
  KeyOutlined,
} from "@ant-design/icons";

export default function AdminMenu() {
  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["/salary"]}
      mode="inline"
      onClick={(event) => {
        console.log(event);
      }}
    >
      <Menu.Item
        key="/salary"
        icon={<ContactsOutlined style={{ fontSize: "18px" }} />}
      >
        Perpustakaan
      </Menu.Item>
      <Menu.Item
        key="/employee"
        icon={<UserSwitchOutlined style={{ fontSize: "18px" }} />}
      >
        User
      </Menu.Item>
      <Menu.Item
        key="/department"
        icon={<AuditOutlined style={{ fontSize: "18px" }} />}
      >
        Buku
      </Menu.Item>

      <Menu.Item
        key="/position"
        icon={<ApartmentOutlined style={{ fontSize: "18px" }} />}
      >
        Master Data
      </Menu.Item>

      <Menu.Item
        key="/status"
        icon={<BlockOutlined style={{ fontSize: "18px" }} />}
      >
        Status
      </Menu.Item>

      <Menu.Item
        key="/password"
        icon={<KeyOutlined style={{ fontSize: "18px" }} />}
      >
        Password
      </Menu.Item>

      <Menu.Item
        key="/logout"
        icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}
