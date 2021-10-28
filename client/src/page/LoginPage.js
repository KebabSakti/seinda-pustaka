import React, { useState } from "react";
import { Layout, Card, Col, Row, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import background from "../asset/image/background.jpg";
import logo from "../asset/image/mahakam_ulu.png";

export default function LoginPage() {
  const { Content } = Layout;
  const [loading] = useState(false);

  return (
    <Layout
      style={{
        backgroundColor: "#fafafa",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Content>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col xs={22} sm={18} md={14} lg={10} xl={6}>
            <Card style={{ padding: "15px 10px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  alt="Logo Kabupaten Mahakam Ulu"
                  src={logo}
                  style={{ width: "150px", marginBottom: "20px" }}
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
              <Form
              // form={}
              // name="login"
              // initialValues={{ remember: true }}
              // // onFinish={submitForm}
              >
                <Form.Item
                  name="username"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Username tidak boleh kosong" },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined
                        style={{ paddingRight: "5px", color: "#d9d9d9" }}
                      />
                    }
                    placeholder="Username"
                    size="large"
                    type="text"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Password tidak boleh kosong" },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined
                        style={{ paddingRight: "5px", color: "#d9d9d9" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
