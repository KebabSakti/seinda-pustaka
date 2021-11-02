import React from "react";
import { Form, Input, Select } from "antd";

export default function PerpusModal() {
  const { Option } = Select;

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.Item
          label="Nama Perpustakaan"
          name="nama"
          rules={[{ required: true, message: "Field tidak boleh kosong" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Jenis Perpustakaan"
          name="jenis_perpustakaan_id"
          rules={[{ required: true, message: "Field tidak boleh kosong" }]}
        >
          <Select placeholder="Pilihan">
            <Option key="SD" value="Perpustakaan SD">
              Perpustakaan SD
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
