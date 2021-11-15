import { useEffect, useCallback, useReducer, useState, useRef } from "react";
import {
  adminUserDelete,
  adminUserIndex,
  adminUserStore,
  adminUserUpdate,
} from "../../api/admin/AdminUserApi";
import { debounce } from "../../module/UtilityModule";
import { getUser } from "../../module/AuthModule";
import AdminPerpusForm from "../admin/AdminPerpusForm";
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
} from "antd";
import { BarsOutlined, ExportOutlined } from "@ant-design/icons";
import AdminPerpusExportAll from "./AdminPerpusExportAll";
import AdminPerpusExportOne from "./AdminPerpusExportOne";
import AdminUserForm from "./PerpusUserForm";

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

export default function PerpusUser() {
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
    sort_key: "users.id",
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
      title: "Perpus",
      dataIndex: "perpustakaans.nama",
      sorter: true,
    },
    {
      title: "Nama",
      dataIndex: "user_profils.nama",
      sorter: true,
    },
    {
      title: "Username",
      dataIndex: "users.username",
      sorter: true,
      responsive: ["sm"],
    },
    {
      title: "Role",
      dataIndex: "users.role",
      sorter: true,
      responsive: ["sm"],
      render: (text, record) => {
        if (text === "admin") {
          return "Admin";
        }

        return text === "perpustakaan" ? "Operator" : "Member";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["md"],
    },
    {
      title: "No. Hp",
      dataIndex: "no_hp",
      responsive: ["md"],
    },
    {
      title: "No. ID",
      dataIndex: "no_identitas",
      responsive: ["md"],
    },
    {
      title: "NPSN",
      dataIndex: "npsn",
      responsive: ["lg"],
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      ellipsis: true,
      responsive: ["lg"],
    },
    {
      title: "Aktif",
      dataIndex: "users.aktif",
      responsive: ["sm"],
      render: (text, record) => {
        return text > 0 ? (
          <Tag color="success">Aktif</Tag>
        ) : (
          <Tag color="error">Non Aktif</Tag>
        );
      },
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
            disabled={record.role === "admin"}
            overlay={
              <Menu onClick={(event) => tableMenuEvent(event, record)}>
                <Menu.Item key="edit">Edit / Detail</Menu.Item>
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

      await adminUserIndex(params).then((response) => {
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
            dispatch({ type: "loading", loading: true });

            await adminUserDelete({ id: payload.id }).then((_) => {
              setFilter({ ...filter });

              message.success("Data berhasil di hapus");
            });
          }
        } catch (e) {
          dispatch({
            type: "error",
          });

          notification.error({ title: "Error", description: e.message });
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
          <AdminUserForm
            form={form}
            payload={modalPayload}
            tableModalOnOk={tableModalOnOk}
            loading={state.loading}
          />
        );

      case "exportAll":
        return <AdminPerpusExportAll payload={modalPayload} />;

      case "exportOne":
        return <AdminPerpusExportOne form={form} payload={modalPayload} />;

      default:
    }
  }

  //CRUD==================================================================//

  async function tableModalOnOk() {
    try {
      await form.validateFields();

      dispatch({ type: "loading", loading: true });

      let params = form.getFieldValue();

      switch (params["mode"]) {
        case "add":
          await adminUserStore(params).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di simpan");
          });

          break;

        case "edit":
          await adminUserUpdate(params).then((_) => {
            setModal({ ...modal, visible: false });

            setFilter({ ...filter });

            message.success("Data berhasil di edit");
          });

          break;

        default:
      }
    } catch (e) {
      dispatch({
        type: "error",
      });

      notification.error({ title: "Error", description: e.message });
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
      <Title level={4}>Daftar User</Title>
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
                    <Menu.Item key="add">Tambah Data</Menu.Item>
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
