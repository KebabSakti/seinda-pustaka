import React from "react";
import { Button, Layout, Drawer, message, Divider } from "antd";
import { Footer } from "antd/lib/layout/layout";
import logo from "../asset/image/mahakam_ulu.png";

export default function Template() {
  const { Header, Content, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider={true}>
      <Drawer
        // maskClosable={() => toggleDrawer(!drawerCollapsed)}
        placement="left"
        closable={true}
        visible={true}
        getContainer={false}
        bodyStyle={{ padding: "0px", margin: "0px" }}
        style={{ position: "absolute" }}
        // onClose={() => toggleDrawer(!drawerCollapsed)}
      >
        <div style={{ paddingTop: "50px" }}>
          {/* <MenuMain navigate={navigate} {...props} /> */}
        </div>
      </Drawer>
      <Sider
        collapsible
        collapsedWidth="0"
        width="250"
        breakpoint="lg"
        trigger={null}
        style={{ backgroundColor: "#fff" }}
        // collapsed={collapsed}
        // onBreakpoint={(broken) => {
        //   toggleSidebar(broken);
        // }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={logo} style={{ width: "150px", marginTop: "14px" }} />
        </div>
        <Divider />
        {/* <MenuMain navigate={navigate} {...props} /> */}
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#FBFBFB", padding: "0px 18px" }}>
          {/* {true && (
            <Button
              type="dashed"
              shape="circle"
              //   onClick={() => {
              //     toggleDrawer(!drawerCollapsed);
              //   }}
            >
              <MenuOutlined />
            </Button>
          )} */}
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, minHeight: 360, backgroundColor: "#fff" }}>
            {/* {children} */}
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
