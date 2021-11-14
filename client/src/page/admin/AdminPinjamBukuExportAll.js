import React, { useRef } from "react";
import { Button, Table, Typography, Space, Divider, Image, Tag } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";

export default function AdminPinjamBukuExportAll({ payload }) {
  const componentRef = useRef();
  const { Title } = Typography;

  const columns = [
    {
      title: "Perpustakaan",
      dataIndex: ["perpustakaan", "nama"],
    },
    {
      title: "Buku",
      dataIndex: ["buku", "judul"],
    },
    {
      title: "Sampul",
      dataIndex: ["buku", "sampul"],
      render: (text) => {
        return text === "" ? "-" : <Image height={50} src={text} />;
      },
    },
    {
      title: "Operator",
      dataIndex: ["operator", "nama"],
      responsive: ["sm"],
    },
    {
      title: "Peminjam",
      dataIndex: ["member", "nama"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        let tag;

        if (text === "Pengajuan") {
          tag = "blue";
        }

        if (text === "Dipinjam") {
          tag = "green";
        }

        if (text === "Dikembalikan") {
          tag = "magenta";
        }

        return <Tag color={tag}>{text}</Tag>;
      },
    },
    {
      title: "Tgl Post",
      dataIndex: "created_at",
      responsive: ["sm"],
      render: (text) => {
        if (text === null) {
          return "-";
        }

        return moment(text).format("DD MMM YYYY");
      },
    },
    {
      title: "Jatuh Tempo",
      dataIndex: "jatuh_tempo",
      responsive: ["sm"],
      render: (text) => {
        if (text === null) {
          return "-";
        }

        return moment(text).format("DD MMM YYYY");
      },
    },
  ];

  return (
    <div>
      <Space style={{ marginLeft: "20px" }}>
        <ReactToPrint
          trigger={() => (
            <Button icon={<PrinterOutlined />}>Print / PDF</Button>
          )}
          content={() => componentRef.current}
        />
      </Space>
      <div ref={componentRef} style={{ margin: "20px", textAlign: "center" }}>
        <Title level={3}>Data Pinjaman Buku</Title>
        <Divider />
        <Table
          bordered
          size="small"
          pagination={false}
          columns={columns}
          dataSource={payload.data}
        />
      </div>
    </div>
  );
}
