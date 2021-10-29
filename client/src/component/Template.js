import React, { useState } from "react";
import {
  Button,
  Layout,
  Drawer,
  Divider,
  PageHeader,
  Space,
  Row,
  Col,
  Popover,
  Badge,
} from "antd";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import logo from "../asset/image/mahakam_ulu.png";

export default function Template({ children, menu, notif }) {
  const { Header, Content, Sider, Footer } = Layout;

  const [drawer, toggleDrawer] = useState(false);
  const [sider, toggleSider] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider={true}>
      <Drawer
        style={{ position: "absolute", minHeight: "100%" }}
        maskClosable={() => toggleDrawer(!drawer)}
        placement="left"
        closable={true}
        visible={drawer}
        getContainer={false}
        bodyStyle={{ padding: "0px", margin: "0px" }}
        onClose={() => toggleDrawer(!drawer)}
      >
        <div style={{ paddingTop: "50px" }}>{menu}</div>
      </Drawer>
      <Sider
        style={{ minHeight: "100%", backgroundColor: "#fff" }}
        collapsible
        collapsedWidth="0"
        width="250"
        breakpoint="lg"
        trigger={null}
        collapsed={sider}
        onBreakpoint={(broken) => {
          toggleSider(broken);
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            alt="Logo Kabupaten Mahakam Ulu"
            src={logo}
            style={{ width: "150px", margin: "20px 0px" }}
          />
          <div
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            SEINDAPUSTAKA
          </div>
        </div>
        <Divider />
        {menu}
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#FBFBFB", padding: "0px 18px" }}>
          <Row justify="end">
            <Col>
              <Space>
                {sider && (
                  <Button
                    shape="circle"
                    onClick={() => {
                      toggleDrawer(!drawer);
                    }}
                  >
                    <MenuOutlined />
                  </Button>
                )}
                {notif && (
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={notif}
                  >
                    <Badge offset={[-2, 5]} size="small" count={2}>
                      <Button shape="circle" icon={<BellOutlined />} />
                    </Badge>
                  </Popover>
                )}
              </Space>
            </Col>
          </Row>
        </Header>
        <PageHeader
          style={{ padding: "0xp", margin: "0px" }}
          backIcon={false}
          title="Perpustakaan"
          // subTitle="This is a subtitle"
        />
        <Content style={{ margin: "0px 16px 16px 16px" }}>
          <div
            style={{ padding: 24, minHeight: "100%", backgroundColor: "#fff" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#FBFBFB" }}>
          Software Provided by{" "}
          <a href="https://vjtechsolution.com" target="_blank" rel="noreferrer">
            https://vjtechsolution.com
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
}
