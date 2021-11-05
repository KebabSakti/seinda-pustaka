import { Menu } from "antd";
import {
  BookOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UserOutlined,
  DatabaseOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
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
        key="/buku"
        icon={<CopyOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/buku">Buku</Link>
      </Menu.Item>

      <Menu.Item
        key="/user"
        icon={<UserOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/user">User</Link>
      </Menu.Item>

      <Menu.Item
        key="/data"
        icon={<DatabaseOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/master">Data</Link>
      </Menu.Item>

      <Menu.Item
        key="/config"
        icon={<ExceptionOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/config">Setting</Link>
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
