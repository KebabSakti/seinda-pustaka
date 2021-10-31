import { Menu } from "antd";
import { BookOutlined, LogoutOutlined } from "@ant-design/icons";

export default function AdminMenu({ logout }) {
  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["/perpus"]}
      mode="inline"
      onClick={(event) => {}}
    >
      <Menu.Item
        key="/perpus"
        icon={<BookOutlined style={{ fontSize: "18px" }} />}
      >
        Perpustakaan
      </Menu.Item>

      <Menu.Item
        key="/logout"
        icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
        onClick={logout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}
