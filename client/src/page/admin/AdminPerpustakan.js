import { useEffect, useCallback, useReducer, useState } from "react";
import { perpusIndex } from "../../api/AuthPerpus";
import { debounce } from "../../module/UtilityModule";
import PerpusModal from "../../component/PerpusModal";

import {
  Row,
  Col,
  Button,
  DatePicker,
  Input,
  Table,
  Menu,
  Typography,
  Dropdown,
  Divider,
  notification,
  Modal,
} from "antd";
import {
  BarsOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

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

export default function AdminPerpustakaan() {
  const { RangePicker } = DatePicker;
  const { Text, Title } = Typography;
  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    page: 1,
    sort_key: "id",
    sort_mode: "desc",
  });

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    payload: {
      datas: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 5,
        showLessItems: true,
        responsive: true,
        showSizeChanger: false,
        position: ["bottomCenter"],
      },
    },
  });

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      sorter: true,
    },
    {
      title: "Jenis Perpustakaan",
      dataIndex: ["jenis_perpustakaan", "nama_jenis_perpustakaan"],
      responsive: ["sm"],
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      responsive: ["sm"],
      ellipsis: true,
      sorter: true,
    },
    {
      title: "Kelurahan",
      dataIndex: "kelurahan",
      responsive: ["sm"],
      sorter: true,
    },
    {
      title: "Provinsi",
      dataIndex: "provinsi",
      responsive: ["md"],
      sorter: true,
    },
    {
      title: "Status Perpustakaan",
      dataIndex: "status_perpustakaan",
      responsive: ["md"],
      sorter: true,
    },
    {
      title: "NPSN",
      dataIndex: "npsn",
      responsive: ["lg"],
    },
    {
      title: "Kepala Perpustakaan",
      dataIndex: "nama_kepala_perpustakaan",
      responsive: ["lg"],
      sorter: true,
    },
    {
      title: "Kepala Instansi Indek",
      dataIndex: "nama_kepala_instansi_induk",
      responsive: ["xl"],
      sorter: true,
    },
    {
      title: "Tahun Berdiri",
      dataIndex: "tahun_berdiri_perpustakaan",
      responsive: ["xl"],
      sorter: true,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      responsive: ["xl"],
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "id",
      render: (text, record) => {
        return (
          <Dropdown
            arrow
            trigger={["click"]}
            placement="topCenter"
            overlay={
              <Menu onClick={(event) => tableMenuEvent(event, record)}>
                <Menu.Item key="detail">Detail</Menu.Item>
                <Menu.Item key="edit">Edit</Menu.Item>
                <Menu.Item key="hapus">
                  <Text type="danger">Hapus</Text>
                </Menu.Item>
                <Menu.Divider style={{ margin: "0px" }} />
                <Menu.Item key="printData" icon={<PrinterOutlined />}>
                  Print
                </Menu.Item>
                <Menu.Item key="excelData" icon={<FileExcelOutlined />}>
                  Excel
                </Menu.Item>
                <Menu.Item key="pdfData" icon={<FilePdfOutlined />}>
                  PDF
                </Menu.Item>
              </Menu>
            }
          >
            <Button size="small" shape="circle" type="primary">
              <BarsOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const fetchDatas = useCallback(async (params) => {
    try {
      dispatch({ type: "loading", loading: true });

      await perpusIndex(params).then((response) => {
        let results = response.data.data.map((item) => {
          return { ...item, key: item.id };
        });

        dispatch({
          type: "complete",
          payload: {
            datas: results,
            pagination: {
              ...state.payload.pagination,
              current: response.data.current_page,
              total: response.data.total,
              pageSize: response.data.per_page,
            },
          },
        });
      });
    } catch (e) {
      dispatch({
        type: "error",
      });

      notification.error({ title: "Error", description: e.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tableChange(tPagination, _, tSorter) {
    if (tSorter != null) {
      setFilter({
        ...filter,
        page: tPagination.current,
        sort_key: tSorter.field,
        sort_mode: tSorter.order,
      });
    } else {
      setFilter({ ...filter, page: tPagination.current });
    }
  }

  function tableSearch(e) {
    setFilter({ ...filter, keyword: e.target.value });
  }

  function tableDateRange(_, dateStrings) {
    setFilter({ ...filter, d_start: dateStrings[0], d_end: dateStrings[1] });
  }

  function tableMenuEvent(event, payload) {
    switch (event.key) {
      case "add":
        setModal(true);
        break;

      default:
    }
  }

  //======================================================================//

  useEffect(() => {
    fetchDatas(filter);
  }, [filter, fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Modal
        centered
        title="Perpustakaan"
        visible={modal}
        onCancel={() => setModal(false)}
      >
        <PerpusModal />
      </Modal>
      <Title level={4}>Daftar Perpustakaan</Title>
      <Divider style={{ margin: "10px 0px" }} />
      <Row
        justify="space-between"
        align="middle"
        gutter={[0, 8]}
        style={{ marginBottom: "8px" }}
      >
        <Col xs={24} sm={24} md={8} lg={8}>
          <RangePicker
            picker="year"
            style={{ width: "100%" }}
            onChange={tableDateRange}
          />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14}>
          <Row justify="end" gutter={[8, 0]}>
            <Col xs={12} sm={12} md={10} lg={10}>
              <Input
                allowClear
                placeholder="Cari di sini"
                style={{ width: "100%" }}
                onChange={debounce((e) => tableSearch(e))}
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Dropdown
                arrow
                trigger={["click"]}
                placement="bottomCenter"
                overlay={
                  <Menu onClick={tableMenuEvent}>
                    <Menu.Item key="add">Tambah Data</Menu.Item>
                    <Menu.Divider style={{ margin: "0px" }} />
                    <Menu.Item key="printTable" icon={<PrinterOutlined />}>
                      Print
                    </Menu.Item>
                    <Menu.Item key="excelTable" icon={<FileExcelOutlined />}>
                      Excel
                    </Menu.Item>
                    <Menu.Item key="pdfTable" icon={<FilePdfOutlined />}>
                      PDF
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button
                  type="primary"
                  icon={<BarsOutlined />}
                  style={{ width: "100%" }}
                >
                  Menu
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        loading={state.loading}
        dataSource={state.payload?.datas}
        pagination={state.payload?.pagination}
        onChange={tableChange}
        // scroll={state.payload.datas.length > 0 && { x: true, y: false }}
      />
    </div>
  );
}
