import { Layout, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "100px",
                lineHeight: "100px",
              }}
            >
              404
            </div>
            <div>Halaman Tidak Ditemukan</div>
            <Link to="/">
              <Button type="primary" size="small">
                Kembali ke halaman login
              </Button>
            </Link>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
