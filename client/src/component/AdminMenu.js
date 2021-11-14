import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UserOutlined,
  DatabaseOutlined,
  ExceptionOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";

export default function AdminMenu({ logout, path }) {
  const { SubMenu } = Menu;

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
        key="/pinjam"
        icon={<ColumnWidthOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/pinjam">Pinjam Buku</Link>
      </Menu.Item>

      <Menu.Item
        key="/user"
        icon={<UserOutlined style={{ fontSize: "18px" }} />}
      >
        <Link to="/admin/user">User</Link>
      </Menu.Item>

      <SubMenu
        key="sub1"
        icon={<DatabaseOutlined style={{ fontSize: "18px" }} />}
        title="Data"
      >
        <Menu.Item key="/kabupaten">
          <Link to="/admin/kabupaten">Kabupaten</Link>
        </Menu.Item>
        <Menu.Item key="/kecamatan">
          <Link to="/admin/kecamatan">Kecamatan</Link>
        </Menu.Item>
        <Menu.Item key="/kelurahan">
          <Link to="/admin/kelurahan">Kelurahan</Link>
        </Menu.Item>
        <Menu.Item key="/provinsi">
          <Link to="/admin/provinsi">Provinsi</Link>
        </Menu.Item>
        <Menu.Item key="/jenis_perpus">
          <Link to="/admin/jenis_perpus">Jenis Perpustakaan</Link>
        </Menu.Item>
      </SubMenu>

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
