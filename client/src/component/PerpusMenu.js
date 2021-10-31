import { Menu } from "antd";
import { BookOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

export default function AdminMenu({ logout }) {
  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["/home"]}
      mode="inline"
      onClick={(event) => {}}
    >
      <Menu.Item
        key="/home"
        icon={<HomeOutlined style={{ fontSize: "18px" }} />}
      >
        Beranda
      </Menu.Item>

      <Menu.Item
        key="/book"
        icon={<BookOutlined style={{ fontSize: "18px" }} />}
      >
        Buku
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
