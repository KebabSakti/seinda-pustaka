import { Menu } from "antd";
import {
  BookOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  ColumnWidthOutlined,
  UserOutlined,
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
        <Link to="/perpus/home">Beranda</Link>
      </Menu.Item>

      <Menu.Item
        key="/perpus"
        icon={<BookOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/perpus/perpus">Perpustakaan</Link>
      </Menu.Item>

      <Menu.Item
        key="/buku"
        icon={<CopyOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/perpus/buku">Buku</Link>
      </Menu.Item>

      <Menu.Item
        key="/pinjam"
        icon={<ColumnWidthOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/perpus/pinjam">Pinjam Buku</Link>
      </Menu.Item>

      <Menu.Item
        key="/user"
        icon={<UserOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/perpus/user">User</Link>
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
