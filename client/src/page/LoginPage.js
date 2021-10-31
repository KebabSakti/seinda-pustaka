import React, { useReducer } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import background from "../asset/image/background.jpg";
import logo from "../asset/image/mahakam_ulu.png";
import { loginUser } from "../module/AuthModule";
import { useHistory } from "react-router";
import {
  Layout,
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  notification,
} from "antd";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: action.loading,
      };

    case "complete":
      return {
        ...state,
        loading: false,
        payload: action.data,
      };

    case "error":
      return {
        ...state,
        loading: false,
        payload: null,
      };

    default:
      throw new Error("Terjadi kesalahan, cobalah beberapa saat lagi");
  }
}

export default function LoginPage() {
  const key = "auth";
  const { Content } = Layout;
  const [loginForm] = Form.useForm();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
  });

  async function submitForm(fields) {
    try {
      dispatch({ type: "loading", loading: true });

      await loginUser(fields.username, fields.password).then((user) => {
        let page;

        if (user.role === "admin") {
          page = "/admin";
        } else if (user.role === "perpustakaan") {
          page = "/perpus";
        } else {
          page = "/public";
        }

        history.push(page);
      });
    } catch (e) {
      notification.error({
        key: key,
        message: "Error",
        description:
          e.response.data ??
          "Terjadi kesalahan, harap coba beberapa saat lagi. [" +
            e.message +
            "]",
      });

      dispatch({ type: "error" });
    }
  }

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
              <Form name="login" form={loginForm} onFinish={submitForm}>
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
                    loading={state.loading}
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
