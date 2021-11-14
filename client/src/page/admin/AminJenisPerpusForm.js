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

export default function AdminJenisPerpusForm({
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
      form.setFieldsValue(payload.data);
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
                Data Jenis Perpustakaan
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item
            label="Jenis Perpustakaan"
            name="nama_jenis_perpustakaan"
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Status" name="aktif">
            <Radio.Group>
              <Radio value={1}>Aktif</Radio>
              <Radio value={0}>Non Aktif</Radio>
            </Radio.Group>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}
