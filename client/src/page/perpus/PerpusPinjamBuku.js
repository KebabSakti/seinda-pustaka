import { useEffect, useCallback, useReducer, useState, useRef } from "react";
import {
  perpusPinjamBukuDelete,
  perpusPinjamBukuIndex,
  perpusPinjamBukuStore,
  perpusPinjamBukuUpdate,
} from "../../api/perpus/PerpusPinjamBukuApi";
import { debounce } from "../../module/UtilityModule";
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
  Form,
  message,
  Tag,
  Image,
} from "antd";
import { BarsOutlined, ExportOutlined } from "@ant-design/icons";
import PerpusPinjamBukuForm from "./PerpusPinjamBukuForm";
import moment from "moment";
import PerpusPinjamBukuExportAll from "./PerpusPinjamBukuExportAll";
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
        error: action.error,
      };

    default:
      throw new Error("Terjadi kesalahan, cobalah beberapa saat lagi");
  }
}

export default function PerpusPinjamBuku() {
  const componentRef = useRef();

  const { RangePicker } = DatePicker;
  const { Text, Title } = Typography;

  const [form] = Form.useForm();

  const [modalPayload, setModalPayload] = useState({
    page: "form",
  });

  const [modal, setModal] = useState({
    width: 600,
    centered: true,
    visible: false,
    maskClosable: false,
    keyboard: true,
    destroyOnClose: true,
    footer: false,
    onOk: tableModalOnOk,
    onCancel: () => {
      setModal({ ...modal, visible: false });
    },
  });

  const [filter, setFilter] = useState({
    page: 1,
    paging_size: 10,
    sort_key: "status_bukus.id",
    sort_mode: "desc",
    perpustakaan_id: getUser()?.perpustakaan_role.perpustakaan_id,
  });

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    payload: {
      datas: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 10,
        showLessItems: true,
        responsive: true,
        showSizeChanger: false,
        position: ["bottomCenter"],
      },
    },
  });

  const columns = [
    {
      title: "Perpustakaan",
      dataIndex: "perpustakaans.nama",
      responsive: ["sm"],
      sorter: true,
    },
    {
      title: "Buku",
      dataIndex: "bukus.judul",
      sorter: true,
    },
    {
      title: "Sampul",
      dataIndex: "bukus.sampul",
      responsive: ["sm"],
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
      responsive: ["sm"],
      sorter: true,
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
      responsive: ["md"],
      sorter: true,
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
      responsive: ["sm"],
      sorter: true,
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
      responsive: ["sm"],
      sorter: true,
      render: (text, record) => {
        if (text === null) {
          return "-";
        }

        return moment(text).format("DD MMM YYYY");
      },
    },
    {
      title: "",
      dataIndex: "status_bukus.id",
      render: (text, record) => {
        return (
          <Dropdown
            arrow
            trigger={["click"]}
            placement="topCenter"
            overlay={
              <Menu onClick={(event) => tableMenuEvent(event, record)}>
                <Menu.Item key="edit">Detail</Menu.Item>
                {/* <Menu.Item key="delete">
                  <Text type="danger">Hapus</Text>
                </Menu.Item> */}
                {/* <Menu.Divider style={{ margin: "0px" }} />
                <Menu.Item key="exportOne" icon={<ExportOutlined />}>
                  Export Data
                </Menu.Item> */}
              </Menu>
            }
          >
            <Button size="small" shape="circle" type="dashed">
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

      await perpusPinjamBukuIndex(params).then((response) => {
        console.log(response.data.data);

        let results = response.data.data.map((item, index) => {
          return { ...item, key: index };
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
              showSizeChanger: response.data.total > 10 ? true : false,
              pageSizeOptions: ["10", response.data.total],
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

  function tableChange(tPagination, _, tSorter, tExtra) {
    switch (tExtra.action) {
      case "paginate":
        setFilter({
          ...filter,
          page: tPagination.current,
          paging_size: tPagination.pageSize,
        });
        break;

      case "sort":
        setFilter({
          ...filter,
          page: tPagination.current,
          sort_key: tSorter.field,
          sort_mode: tSorter.order,
        });
        break;

      default:
    }
  }

  function tableSearch(e) {
    setFilter({ ...filter, keyword: e.target.value, page: 1 });
  }

  function tableDateRange(_, dateStrings) {
    setFilter({ ...filter, d_start: dateStrings[0], d_end: dateStrings[1] });
  }

  async function tableMenuEvent(event, payload) {
    switch (event.key) {
      case "add":
        setModalPayload({
          ...modalPayload,
          mode: "add",
          page: "form",
          data: null,
        });

        setModal({
          ...modal,
          visible: true,
          width: 600,
        });
        break;

      case "edit":
        setModalPayload({
          mode: "edit",
          page: "form",
          data: payload,
        });

        setModal({
          ...modal,
          visible: true,
          width: 600,
        });
        break;

      case "delete":
        try {
          if (
            window.confirm(
              "Data akan dihapus, proses ini tidak dapat dikembalikan, lanjutkan ?"
            )
          ) {
            dispatch({ type: "loading", loading: true });

            await perpusPinjamBukuDelete({ id: payload.id }).then((_) => {
              setFilter({ ...filter });

              message.success("Data berhasil di hapus");
            });
          }
        } catch (e) {
          dispatch({ type: "error", error: e });

          notification.error({
            message: "Error",
            description: e.message,
          });
        }
        break;

      case "exportAll":
        setModalPayload({
          ...modalPayload,
          page: "exportAll",
          data: state.payload.datas,
        });

        setModal({
          ...modal,
          visible: true,
          width: 1200,
          footer: false,
        });
        break;

      case "exportOne":
        setModalPayload({
          ...modalPayload,
          page: "exportOne",
          data: payload,
        });

        setModal({
          ...modal,
          visible: true,
          footer: false,
        });
        break;

      default:
    }
  }

  function tableModalPage(page) {
    switch (page) {
      case "form":
        return (
          <PerpusPinjamBukuForm
            loading={state.loading}
            form={form}
            payload={modalPayload}
            tableModalOnOk={tableModalOnOk}
          />
        );

      case "exportAll":
        return <PerpusPinjamBukuExportAll payload={modalPayload} />;

      // case "exportOne":
      //   return <perpusPerpusExportOne form={form} payload={modalPayload} />;

      default:
    }
  }

  //CRUD===================================================================================================//

  async function tableModalOnOk() {
    try {
      await form.validateFields();

      dispatch({ type: "loading", loading: true });

      let params = form.getFieldValue();

      switch (params["mode"]) {
        case "add":
          await perpusPinjamBukuStore(params).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di simpan");
          });

          break;

        case "edit":
          await perpusPinjamBukuUpdate({
            ...params,
            jatuh_tempo: moment(params.jatuh_tempo).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          }).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di update");
          });

          break;

        default:
      }
    } catch (e) {
      dispatch({ type: "error", error: e });

      notification.error({
        message: "Error",
        description: e.message,
      });
    }
  }

  //CRUD===================================================================================================//

  //=========================================================================================================//

  useEffect(() => {
    fetchDatas(filter);
  }, [filter, fetchDatas]);

  //=========================================================================================================//

  return (
    <div>
      <Modal {...modal}>{tableModalPage(modalPayload.page)}</Modal>
      <Title level={4}>Daftar Pinjaman Buku</Title>
      <Divider style={{ margin: "10px 0px" }} />
      <Row
        justify="space-between"
        align="middle"
        gutter={[0, 8]}
        style={{ marginBottom: "8px" }}
      >
        <Col xs={24} sm={24} md={8} lg={8}>
          <RangePicker
            picker="date"
            style={{ width: "100%" }}
            onChange={tableDateRange}
          />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14}>
          <Row justify="end" gutter={[8, 0]}>
            <Col xs={16} sm={16} md={10} lg={10}>
              <Input
                allowClear
                placeholder="Cari di sini"
                style={{ width: "100%" }}
                onChange={debounce((e) => tableSearch(e))}
              />
            </Col>
            <Col xs={8} sm={8} md={6} lg={6}>
              <Dropdown
                arrow
                trigger={["click"]}
                placement="bottomCenter"
                overlay={
                  <Menu onClick={tableMenuEvent}>
                    {/* <Menu.Item key="add">Tambah Data</Menu.Item>
                    <Menu.Divider style={{ margin: "0px" }} /> */}
                    <Menu.Item key="exportAll" icon={<ExportOutlined />}>
                      Export Data
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
      <div ref={componentRef}>
        <Table
          bordered
          columns={columns}
          loading={state.loading}
          dataSource={state.payload?.datas}
          pagination={state.payload?.pagination}
          onChange={tableChange}
        />
      </div>
    </div>
  );
}
