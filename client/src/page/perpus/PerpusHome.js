import { Col, Row } from "antd";
import logo from "../../asset/image/mahakam_ulu.png";

export default function PerpusHome() {
  return (
    <Row justify="center" align="middle" style={{ height: "70vh" }}>
      <Col>
        <div style={{ textAlign: "center", padding: "0px 20px" }}>
          <img
            alt="Logo Kabupaten Mahakam Ulu"
            src={logo}
            style={{ width: "200px", marginBottom: "20px" }}
          />
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            SEINDAPUSTAKA DAN DJAMAN BUPER
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            "SISTEM INFORMASI DATA PERPUSTAKAAN DAN PENDAFTAR PEMINJAMAN BUKU
            PERPUSTAKAAN SEKOLAH"
          </div>
        </div>
      </Col>
    </Row>
  );
}
