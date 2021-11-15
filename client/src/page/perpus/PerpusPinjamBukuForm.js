import React, { useReducer, useCallback, useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  notification,
  Button,
  Space,
  Spin,
  Radio,
  InputNumber,
  Image,
  Popover,
} from "antd";
import moment from "moment";

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
        payload: action.payload,
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

export default function PerpusPinjamBukuForm({
  form,
  payload,
  tableModalOnOk,
  loading,
}) {
  const { Option } = Select;
  const { Title } = Typography;

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const fetchDatas = useCallback(async () => {
    form.setFieldsValue({
      mode: payload.mode,
    });

    if (payload.data != null) {
      form.setFieldsValue({
        id: payload.data["status_bukus.id"],
        perpustakaan: payload.data["perpustakaans.nama"],
        buku: payload.data["bukus.judul"],
        peminjam: payload.data["user_profils.nama"],
        status: payload.data["status_bukus.status"],
        tanggal_post: moment(payload.data["status_bukus.created_at"]).format(
          "DD MMM YYYY"
        ),
        jatuh_tempo:
          payload.data["status_bukus.jatuh_tempo"] != null
            ? moment(payload.data["status_bukus.jatuh_tempo"]).format(
                "DD MMM YYYY"
              )
            : moment(payload.data["status_bukus.created_at"])
                .add(3, "days")
                .format("DD MMM YYYY"),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function formSubmit() {
    tableModalOnOk();
  }

  //======================================================================//

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Spin spinning={loading}>
        <Form
          layout="horizontal"
          preserve={false}
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          onFinish={formSubmit}
        >
          <Form.Item hidden name="mode">
            <Input />
          </Form.Item>
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Row>
            <Col span={24}>
              <Title level={4} style={{ textAlign: "center" }}>
                Data Pinjam Buku
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item label="Perpustakaan" name="perpustakaan">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Buku" name="buku">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Peminjam" name="peminjam">
            <Input readOnly />
          </Form.Item>

          <Form.Item label="Tanggal Ajuan" name="tanggal_post">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Jatuh Tempo" name="jatuh_tempo">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Pilih salah satu" }]}
          >
            <Radio.Group
              disabled={payload.data["status_bukus.status"] == "Dikembalikan"}
            >
              <Radio value="Pengajuan">Pengajuan</Radio>
              <Radio value="Dipinjam">Dipinjam</Radio>
              <Radio value="Dikembalikan">Dikembalikan</Radio>
            </Radio.Group>
          </Form.Item>
          {payload.data["status_bukus.status"] != "Dikembalikan" && (
            <Row justify="center">
              <Col>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Col>
            </Row>
          )}
        </Form>
      </Spin>
    </div>
  );
}
