import React, { useState } from "react";
import logo from "../asset/image/mahakam_ulu.png";
import LazyLoad from "react-lazy-load";
import { limitText } from "../core/Helper";
import {
  BellOutlined,
  UserOutlined,
  KeyOutlined,
  PoweroffOutlined,
  BookOutlined,
  MailOutlined,
  SnippetsOutlined,
  MenuOutlined,
  SendOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Input,
  Pagination,
  Button,
  Space,
  Popover,
  Divider,
  Badge,
  Dropdown,
  Menu,
  Drawer,
  Tooltip,
} from "antd";

export default function BookPage() {
  const { Header, Content, Footer } = Layout;

  const [drawer, toggleDrawer] = useState(false);

  const notif = (
    <div style={{ width: "250px" }}>
      <Divider>22 Oktober 2024</Divider>
      <p>
        Buku <strong style={{ color: "green" }}>Mencari Cinta Sejati</strong>{" "}
        yang anda pinjam jatuh tempo pada{" "}
        <strong style={{ color: "red" }}>24 Oktober 2024</strong>
      </p>
      <Divider>24 Oktober 2024</Divider>
      <p>
        Buku <strong style={{ color: "green" }}>Mencari Cinta Sejati</strong>{" "}
        yang anda sewa telah jatuh tempo, harap segera mengembalikan buku
        tersebut
      </p>
      <Divider>
        <a href="#">Semua Notifikasi</a>
      </Divider>
    </div>
  );

  const user = (
    <Menu>
      <Menu.Item>
        <PoweroffOutlined />
        <a style={{ marginLeft: "10px" }} href="#">
          Keluar
        </a>
      </Menu.Item>
    </Menu>
  );

  function menu(mode = "horizontal") {
    return (
      <Menu mode={mode} defaultSelectedKeys={["/buku"]}>
        <Menu.Item key="/buku">
          <BookOutlined />
          <a style={{ marginLeft: "10px" }} href="#">
            Koleksi Buku
          </a>
        </Menu.Item>
        <Menu.Item key="/pinjam">
          <SnippetsOutlined />
          <a style={{ marginLeft: "10px" }} href="#">
            Riwayat Pinjam
          </a>
        </Menu.Item>
        <Menu.Item key="/pesan">
          <MailOutlined />
          <a style={{ marginLeft: "10px" }} href="#">
            Pesan Masuk
          </a>
        </Menu.Item>
        <Menu.Item>
          <KeyOutlined />
          <a style={{ marginLeft: "10px" }} href="#">
            Ganti Password
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Drawer
        style={{ position: "absolute", minHeight: "100%" }}
        placement="left"
        closable={true}
        visible={drawer}
        getContainer={false}
        bodyStyle={{ padding: "0px", margin: "0px" }}
        maskClosable={() => toggleDrawer(!drawer)}
        onClose={() => toggleDrawer(!drawer)}
      >
        <div style={{ paddingTop: "50px" }}>{menu("vertical")}</div>
      </Drawer>
      <Header style={{ backgroundColor: "#ffffff", padding: "0px 24px" }}>
        <Row justify="space-between">
          <Col>
            <img
              alt="Logo Kabupaten Mahakam Ulu"
              src={logo}
              style={{ width: "40px" }}
            />
            <span
              style={{
                marginLeft: "16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              SEINDAPUSTAKA
            </span>
          </Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={8}>
            {menu()}
          </Col>
          <Col>
            <Space>
              <Col lg={0}>
                <Button
                  shape="circle"
                  icon={<MenuOutlined />}
                  onClick={() => toggleDrawer(!drawer)}
                />
              </Col>
              <Popover trigger="click" placement="bottomRight" content={notif}>
                <Badge offset={[-2, 5]} size="small" count={2}>
                  <Button shape="circle" icon={<BellOutlined />} />
                </Badge>
              </Popover>
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                overlay={user}
              >
                <Button shape="circle" icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: "24px" }}>
        <div style={{ minHeight: "100%" }}>
          <Row justify="center" align="middle" gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <div
                style={{
                  backgroundColor: "#fff",
                  marginBottom: "24px",
                  borderRadius: "4px",
                }}
              >
                <Input
                  style={{ width: "100%" }}
                  bordered={false}
                  placeholder="Cari di sini"
                  allowClear
                  size="large"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} justify="center">
            {new Array(24).fill(24).map((e, i) => {
              return (
                <Col key={i} xs={12} md={8} lg={3}>
                  <Badge.Ribbon
                    text="Terbaru"
                    color="red"
                    style={i == 0 ? { display: "block" } : { display: "none" }}
                  >
                    <div
                      style={{
                        height: "250px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div style={{ height: "200px" }}>
                        <LazyLoad height={200}>
                          <img
                            alt="Programming For Dummy Long Word From Home Very Looong"
                            src={
                              "https://loremflickr.com/200/200/book_cover?random=" +
                              i
                            }
                            style={{
                              objectFit: "cover",
                              height: "200px",
                              width: "100%",
                              borderRadius: "4px",
                              backgroundColor: "#ddd",
                            }}
                          />
                        </LazyLoad>
                        <Row
                          justify="center"
                          style={{ position: "relative", bottom: 40 }}
                        >
                          <Col>
                            <Space>
                              <Tooltip
                                title="Pinjam Buku"
                                trigger={["click", "hover"]}
                              >
                                <Button
                                  shape="circle"
                                  icon={<SendOutlined />}
                                  style={{
                                    backgroundColor: "#242424",
                                    color: "white",
                                    border: "none",
                                  }}
                                />
                              </Tooltip>
                              <Tooltip
                                title="Download Ebook"
                                trigger={["click", "hover"]}
                              >
                                <Button
                                  shape="circle"
                                  icon={<DownloadOutlined />}
                                  style={{
                                    backgroundColor: "white",
                                    color: "#242424",
                                    border: "none",
                                  }}
                                />
                              </Tooltip>
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <div
                        style={{
                          padding: "4px 0px",
                        }}
                      >
                        <p
                          title="Programming For Dummy Long Word From Home Very Looong"
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            lineHeight: "20px",
                          }}
                        >
                          {limitText(
                            "Programming For Dummy Long Word From Home Very Looong",
                            30
                          ) + ".."}
                        </p>
                      </div>
                    </div>
                  </Badge.Ribbon>
                </Col>
              );
            })}
          </Row>
          <Row justify="center" align="middle" gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <div
                style={{
                  marginTop: "24px",
                  textAlign: "center",
                }}
              >
                <Pagination
                  responsive={true}
                  showSizeChanger={false}
                  defaultCurrent={6}
                  total={500}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
        Software Provided by{" "}
        <a href="https://vjtechsolution.com" target="_blank" rel="noreferrer">
          https://vjtechsolution.com
        </a>
      </Footer>
    </Layout>
  );
}
