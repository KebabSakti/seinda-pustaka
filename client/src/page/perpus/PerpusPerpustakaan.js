import { useEffect, useCallback, useReducer, useState, useRef } from "react";
import {
  perpusPerpusDelete,
  perpusPerpusIndex,
  perpusPerpusStore,
  perpusPerpusUpdate,
} from "../../api/perpus/PerpusPerpusApi";
import { debounce } from "../../module/UtilityModule";
import { getUser, saveUser } from "../../module/AuthModule";
import PerpusPerpusForm from "../perpus/PerpusPerpusForm";
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
} from "antd";
import { BarsOutlined, ExportOutlined } from "@ant-design/icons";
import PerpusPerpusExportAll from "./PerpusPerpusExportAll";
import PerpusPerpusExportOne from "./PerpusPerpusExportOne";

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

export default function PerpusPerpustakaan() {
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
    paging_size: 5,
    sort_key: "id",
    sort_mode: "desc",
    // user_id: getUser()?.id,
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
            disabled={getUser()?.id != record.user_id}
            overlay={
              <Menu onClick={(event) => tableMenuEvent(event, record)}>
                <Menu.Item key="edit">Edit / Detail</Menu.Item>
                <Menu.Item key="delete">
                  <Text type="danger">Hapus</Text>
                </Menu.Item>
                <Menu.Divider style={{ margin: "0px" }} />
                <Menu.Item key="exportOne" icon={<ExportOutlined />}>
                  Export Data
                </Menu.Item>
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

      await perpusPerpusIndex(params).then((response) => {
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
              showSizeChanger: response.data.total > 5 ? true : false,
              pageSizeOptions: ["5", response.data.total],
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
            await perpusPerpusDelete({ id: payload.id }).then((_) => {
              setFilter({ ...filter });

              message.success("Data berhasil di hapus");
            });
          }
        } catch (e) {
          console.log(e);
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
          <PerpusPerpusForm
            form={form}
            payload={modalPayload}
            tableModalOnOk={tableModalOnOk}
          />
        );

      case "exportAll":
        return <PerpusPerpusExportAll payload={modalPayload} />;

      case "exportOne":
        return <PerpusPerpusExportOne form={form} payload={modalPayload} />;

      default:
    }
  }

  //CRUD==================================================================//

  async function tableModalOnOk() {
    try {
      let params = form.getFieldValue();

      switch (params["mode"]) {
        case "add":
          await form.validateFields();

          await perpusPerpusStore({
            ...params,
            tahun_berdiri_perpustakaan:
              params.tahun_berdiri_perpustakaan?.format("YYYY"),
            senin_kamis: params.senin_kamis?.format("HH:mm:ss"),
            jummat: params.jummat?.format("HH:mm:ss"),
            sabtu: params.sabtu?.format("HH:mm:ss"),
            user_id: getUser().id,
          }).then((response) => {
            saveUser({
              ...getUser(),
              perpustakaan_role: { perpustakaan_id: response.data.id },
            });

            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di simpan");
          });

          break;

        case "edit":
          await form.validateFields();

          await perpusPerpusUpdate({
            ...params,
            tahun_berdiri_perpustakaan:
              params.tahun_berdiri_perpustakaan?.format("YYYY"),
            senin_kamis: params.senin_kamis?.format("HH:mm:ss"),
            jummat: params.jummat?.format("HH:mm:ss"),
            sabtu: params.sabtu?.format("HH:mm:ss"),
            user_id: getUser().id,
          }).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di edit");
          });

          break;

        default:
      }
    } catch (e) {
      console.log(e);
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
                      disabled={
                        state.payload?.datas.filter(
                          (item) => getUser()?.id == item.user_id
                        ).length > 0
                      }
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
        />
      </div>
    </div>
  );
}
