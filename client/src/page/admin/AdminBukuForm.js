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
import { adminBukuAdd, adminBukuStore } from "../../api/admin/AdminBukuApi";

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

export default function AdminBukuForm({
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
    try {
      dispatch({ type: "loading", loading: true });

      await adminBukuAdd().then((response) => {
        dispatch({
          type: "complete",
          payload: response.data,
        });
      });

      form.setFieldsValue({
        mode: payload.mode,
        aktif: 1,
      });

      if (payload.data != null) {
        form.setFieldsValue({
          id: payload.data.id,
          perpustakaan_id: parseInt(payload.data.perpustakaan_id),
          judul: payload.data.judul,
          nomor: payload.data.nomor,
          stok: payload.data.stok,
          catatan: payload.data.catatan,
          aktif: parseInt(payload.data.aktif),
        });
      }
    } catch (e) {
      dispatch({
        type: "error",
      });

      notification.error({ title: "Error", description: e.message });
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
                Data Buku
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item
            label="Perpustakaan"
            name="perpustakaan_id"
            rules={[{ required: true, message: "Pilih salah satu" }]}
          >
            <Select placeholder="Pilihan" loading={state.loading}>
              {state.payload != null &&
                state.payload.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.nama}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Judul Buku"
            name="judul"
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Nomor" name="nomor">
            <Input />
          </Form.Item>
          <Form.Item label="Stok" name="stok">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Sampul" name="sampul" valuePropName="file">
            {payload.data?.sampul == null ? (
              <div>
                <Input type="file" />
                <div>* jpg, jpeg, png, gif</div>
              </div>
            ) : (
              <div>
                <Popover
                  placement="topLeft"
                  content={<Image height={100} src={payload.data?.sampul} />}
                >
                  <Input type="file" />
                </Popover>
                <div>* jpg, jpeg, png, gif</div>
                <div>* Kosongkan jika tidak mengganti file</div>
              </div>
            )}
          </Form.Item>
          <Form.Item label="Ebook" name="download" valuePropName="file">
            {payload.data?.download == null ? (
              <div>
                <Input type="file" />
                <div>* pdf</div>
              </div>
            ) : (
              <div>
                <Input type="file" />
                <div>* pdf</div>
                <div>
                  * Kosongkan jika tidak mengganti file{" "}
                  <a
                    href={payload.data?.download}
                    target="_blank"
                    rel="noreferrer"
                  >
                    (Detail)
                  </a>
                </div>
              </div>
            )}
          </Form.Item>
          <Form.Item label="Catatan" name="catatan">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Status" name="aktif">
            <Radio.Group>
              <Radio value={1}>Aktif</Radio>
              <Radio value={0}>Tidak Aktif</Radio>
            </Radio.Group>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button>Batal</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}
