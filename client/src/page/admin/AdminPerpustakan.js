import { Row, Col, Button, DatePicker, Space, Input } from "antd";
import { SearchOutlined, BarsOutlined } from "@ant-design/icons";

export default function AdminPerpustakaan() {
  const { RangePicker } = DatePicker;

  return (
    <div>
      <Row justify="space-between" align="middle" gutter={[0, 8]}>
        <Col>
          <RangePicker />
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="Cari di sini"
              suffix={<SearchOutlined style={{ color: "grey" }} />}
            />
            <Button icon={<BarsOutlined />}>Menu Tabel</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
