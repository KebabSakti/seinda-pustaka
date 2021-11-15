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
  Radio,
  Button,
  Space,
  Spin,
  message,
} from "antd";
import { perpusUserAdd } from "../../api/perpus/PerpusUserApi";
import { debounce } from "../../module/UtilityModule";
import { userExist } from "../../api/UtilityApi";
import { getUser } from "../../module/AuthModule";

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

export default function PerpusUserForm({
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

      await perpusUserAdd().then((response) => {
        dispatch({
          type: "complete",
          payload: response.data,
        });
      });

      form.setFieldsValue({
        mode: payload.mode,
        role: "public",
        perpustakaan_id: getUser()?.perpustakaan_role.perpustakaan_id,
      });

      if (payload.data != null) {
        form.setFieldsValue({
          id: payload.data["users.id"],
          username: payload.data["users.username"],
          aktif: payload.data["users.aktif"],
          role: payload.data["users.role"],
          nama: payload.data.nama,
          no_identitas: payload.data.no_identitas,
          npsn: payload.data.npsn,
          email: payload.data.email,
          no_hp: payload.data.no_hp,
          alamat: payload.data.alamat,
          perpustakaan_id: payload.data.perpustakaan_id,
          sekolah: payload.data.sekolah,
          kelas: payload.data.kelas,
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

  function formSubmit() {
    tableModalOnOk();
  }

  async function usernameOnChange(e) {
    try {
      await userExist({ username: e.target.value });
    } catch (e) {
      message.error(e.response.data.message);

      form.setFieldsValue({
        username: "",
      });

      form.getFieldInstance("username").focus();
    }
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
                Info Login
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
          >
            <Input
              disabled={payload.data != null}
              onChange={debounce((e) => usernameOnChange(e))}
            />
          </Form.Item>
          {payload.data == null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Field tidak boleh kosong",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : (
            <Form.Item label="Password" name="password">
              <div>
                <Input.Password />
                <div>* Kosongkan jika tidak mengganti password</div>
              </div>
            </Form.Item>
          )}
          <Form.Item
            label="Status"
            name="aktif"
            rules={[{ required: true, message: "Pilih salah satu" }]}
          >
            <Radio.Group>
              <Radio value={1}>Aktif</Radio>
              <Radio value={0}>Non Aktif</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Pilih salah satu" }]}
          >
            <Radio.Group disabled={payload.data != null}>
              {/* <Radio value="perpustakaan">Operator</Radio> */}
              <Radio value="public">Member</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider style={{ margin: "15px 0px" }} />
          <Row>
            <Col span={24}>
              <Title level={4} style={{ textAlign: "center" }}>
                Data Umum
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item
            label="Nama"
            name="nama"
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="No Identitas" name="no_identitas">
            <Input />
          </Form.Item>
          <Form.Item label="NPSN" name="npsn">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="No Hp" name="no_hp">
            <Input />
          </Form.Item>
          <Form.Item label="Alamat" name="alamat">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Perpustakaan" name="perpustakaan_id">
            <Select placeholder="Pilihan" loading={state.loading} disabled>
              {state.payload != null &&
                state.payload.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.nama}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Divider style={{ margin: "15px 0px" }} />
          <Row>
            <Col span={24}>
              <Title level={4} style={{ textAlign: "center" }}>
                Data Pelajar
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item label="Nama Sekolah" name="sekolah">
            <Input />
          </Form.Item>
          <Form.Item label="Kelas" name="kelas">
            <Input />
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
