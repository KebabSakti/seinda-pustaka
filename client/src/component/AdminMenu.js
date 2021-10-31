import { Menu } from "antd";
import { BookOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function AdminMenu({ logout, path }) {
  return (
    <Menu
      theme="light"
      selectable={false}
      defaultSelectedKeys={[path]}
      selectedKeys={[path]}
      mode="inline"
    >
      <Menu.Item
        key="/home"
        icon={<HomeOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/home">Beranda</Link>
      </Menu.Item>

      <Menu.Item
        key="/perpus"
        icon={<BookOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/perpus">Perpustakaan</Link>
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
