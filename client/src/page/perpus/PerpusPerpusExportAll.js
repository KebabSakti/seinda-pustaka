import React, { useRef } from "react";
import { Button, Table, Typography, Space, Divider } from "antd";
import ReactToPrint from "react-to-print";
import ReactExport from "react-export-excel";
import { PrinterOutlined, FileExcelOutlined } from "@ant-design/icons";

export default function PerpusPerpusExportAll({ payload }) {
  const componentRef = useRef();
  const { Title } = Typography;

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
    },
    {
      title: "Jenis",
      dataIndex: ["jenis_perpustakaan", "nama_jenis_perpustakaan"],
      responsive: ["sm"],
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      responsive: ["sm"],
    },
    {
      title: "Kelurahan",
      dataIndex: "kelurahan",
      responsive: ["sm"],
    },
    {
      title: "Provinsi",
      dataIndex: "provinsi",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status_perpustakaan",
      responsive: ["md"],
    },
    {
      title: "NPSN",
      dataIndex: "npsn",
      responsive: ["lg"],
    },
    {
      title: "K.Perpus",
      dataIndex: "nama_kepala_perpustakaan",
      responsive: ["lg"],
    },
    {
      title: "K.Inst. Indek",
      dataIndex: "nama_kepala_instansi_induk",
      responsive: ["xl"],
    },
    {
      title: "Thn.Berdiri",
      dataIndex: "tahun_berdiri_perpustakaan",
      responsive: ["xl"],
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      responsive: ["xl"],
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
          filename="Data Perpustakaan"
          element={<Button icon={<FileExcelOutlined />}>Excel</Button>}
        >
          <ExcelSheet data={payload.data} name="Data Perpustakaan">
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
        <Title level={3}>Data Perpustakaan</Title>
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
