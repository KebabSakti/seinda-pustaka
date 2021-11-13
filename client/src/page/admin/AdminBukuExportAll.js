import React, { useRef } from "react";
import { Button, Table, Typography, Space, Divider, Tag, Image } from "antd";
import ReactToPrint from "react-to-print";
import ReactExport from "react-export-excel";
import { PrinterOutlined, FileExcelOutlined } from "@ant-design/icons";

export default function AdminBukuExportAll({ payload }) {
  const componentRef = useRef();
  const { Title } = Typography;

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const columns = [
    {
      title: "Perpustakaan",
      dataIndex: ["perpustakaan", "nama"],
    },
    {
      title: "Judul",
      dataIndex: "judul",
    },
    {
      title: "Sampul",
      dataIndex: "sampul",
      render: (text, record) => {
        return text == "" ? "-" : <Image height={50} src={text} />;
      },
    },
    {
      title: "Nomor",
      dataIndex: "nomor",
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
        <ExcelFile
          filename="Data Buku"
          element={<Button icon={<FileExcelOutlined />}>Excel</Button>}
        >
          <ExcelSheet data={payload.data} name="Data Buku">
            {columns.map((item, index) => {
              return (
                <ExcelColumn
                  key={index}
                  label={item.title}
                  value={item.dataIndex}
                />
              );
            })}
          </ExcelSheet>
        </ExcelFile>
      </Space>
      <div ref={componentRef} style={{ margin: "20px", textAlign: "center" }}>
        <Title level={3}>Data Buku</Title>
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
