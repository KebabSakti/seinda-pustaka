import React, { useRef } from "react";
import { Button, Table, Typography, Space, Divider, Image, Tag } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";

export default function PerpusPinjamBukuExportAll({ payload }) {
  const componentRef = useRef();
  const { Title } = Typography;

  const columns = [
    {
      title: "Perpustakaan",
      dataIndex: "perpustakaans.nama",
    },
    {
      title: "Buku",
      dataIndex: "bukus.judul",
    },
    {
      title: "Sampul",
      dataIndex: "bukus.sampul",
      render: (text, record) => {
        return text === "" ? "-" : <Image height={50} src={text} />;
      },
    },
    // {
    //   title: "Operator",
    //   dataIndex: ["operator", "nama"],
    //   responsive: ["sm"],
    // },
    {
      title: "Peminjam",
      dataIndex: "user_profils.nama",
      render: (text, record) => {
        return (
          <div>
            <div>{text}</div>
            <div>{record.member?.no_hp}</div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status_bukus.status",
      render: (text, record) => {
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
      dataIndex: "status_bukus.created_at",
      render: (text, record) => {
        if (text === null) {
          return "-";
        }

        return moment(text).format("DD MMM YYYY");
      },
    },
    {
      title: "Jatuh Tempo",
      dataIndex: "status_bukus.jatuh_tempo",
      render: (text, record) => {
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
