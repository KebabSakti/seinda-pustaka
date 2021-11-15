import { useEffect, useCallback, useReducer, useState, useRef } from "react";
import {
  perpusBukuDelete,
  perpusBukuIndex,
  perpusBukuStore,
  perpusBukuUpdate,
} from "../../api/perpus/PerpusBukuApi";
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
import { getUser } from "../../module/AuthModule";
import PerpusBukuForm from "./PerpusBukuForm";

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

export default function PerpusBuku() {
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
    sort_key: "bukus.id",
    sort_mode: "desc",
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
      title: "Judul",
      dataIndex: "bukus.judul",
      sorter: true,
    },
    {
      title: "Sampul",
      dataIndex: "sampul",
      responsive: ["sm"],
      render: (text, record) => {
        return text == "" ? "-" : <Image height={50} src={text} />;
      },
    },
    {
      title: "Nomor",
      dataIndex: "nomor",
      responsive: ["sm"],
    },
    {
      title: "Ebook",
      dataIndex: "download",
      responsive: ["md"],
      render: (text, record) => {
        return (
          <a href={text} target="_blank" rel="noreferrer">
            Download
          </a>
        );
      },
    },
    {
      title: "Stok",
      dataIndex: "stok",
      responsive: ["md"],
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "bukus.aktif",
      responsive: ["md"],
      sorter: true,
      render: (text, record) => {
        return text > 0 ? (
          <Tag color="success">Aktif</Tag>
        ) : (
          <Tag color="error">Tidak Aktif</Tag>
        );
      },
    },
    {
      title: "",
      dataIndex: "buku.id",
      render: (text, record) => {
        return (
          <Dropdown
            arrow
            trigger={["click"]}
            placement="topCenter"
            disabled={
              getUser()?.perpustakaan_role?.perpustakaan_id !=
              record.perpustakaan_id
            }
            overlay={
              <Menu onClick={(event) => tableMenuEvent(event, record)}>
                <Menu.Item key="edit">Edit / Detail</Menu.Item>
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

      await perpusBukuIndex(params).then((response) => {
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

            await perpusBukuDelete({ id: payload.id }).then((_) => {
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
          <PerpusBukuForm
            loading={state.loading}
            form={form}
            payload={modalPayload}
            tableModalOnOk={tableModalOnOk}
          />
        );

      case "exportAll":
        return <perpusBukuExportAll payload={modalPayload} />;

      // case "exportOne":
      //   return <perpusPerpusExportOne form={form} payload={modalPayload} />;

      default:
    }
  }

  //CRUD==================================================================//

  async function tableModalOnOk() {
    try {
      await form.validateFields();

      let params = form.getFieldValue();

      let formData = new FormData();

      Object.keys(params).forEach(function (key) {
        if (params[key] != null) {
          formData.set(key, params[key]);
        }
      });

      if (params?.sampul != null) {
        formData.set("sampul", params.sampul.target.files[0]);
      }

      if (params?.download != null) {
        formData.set("download", params.download.target.files[0]);
      }

      switch (params["mode"]) {
        case "add":
          dispatch({ type: "loading", loading: true });

          await perpusBukuStore(formData).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di simpan");
          });

          break;

        case "edit":
          dispatch({ type: "loading", loading: true });

          await perpusBukuUpdate(formData).then((_) => {
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

  //CRUD==================================================================//

  //======================================================================//

  useEffect(() => {
    fetchDatas(filter);
  }, [filter, fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Modal {...modal}>{tableModalPage(modalPayload.page)}</Modal>
      <Title level={4}>Daftar Buku</Title>
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
                    <Menu.Item
                      key="add"
                      disabled={getUser()?.perpustakaan_role === null}
                    >
                      Tambah Data
                    </Menu.Item>
                    <Menu.Divider style={{ margin: "0px" }} />
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
          // scroll={state.payload.datas.length > 0 && { x: true, y: false }}
        />
      </div>
    </div>
  );
}
