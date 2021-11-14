import { useEffect, useCallback, useReducer } from "react";
import { debounce } from "../../module/UtilityModule";
import { initConfig, updateConfig } from "../../module/ConfigModule";
import {
  Row,
  Col,
  Input,
  Table,
  Typography,
  Divider,
  notification,
  Form,
  message,
  InputNumber,
  Switch,
} from "antd";

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

export default function AdminKonfigurasi() {
  const { Title } = Typography;

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    payload: {
      datas: [],
    },
  });

  const columns = [
    {
      title: "Nama Konfig",
      dataIndex: "nama",
      sorter: true,
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      render: (text, record) => {
        switch (record.type) {
          case "number":
            return (
              <InputNumber
                size="small"
                defaultValue={text}
                style={{ width: "50%" }}
                onChange={(value) => {
                  tableConfigChange(value, record);
                }}
              />
            );

          case "text":
            return (
              <Input
                size="small"
                defaultValue={text}
                style={{ width: "50%" }}
                onChange={(value) => {
                  tableConfigChange(value, record);
                }}
              />
            );

          case "boolean":
            return (
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
                defaultChecked={text > 0}
                onChange={debounce((value) => tableConfigChange(value, record))}
              />
            );

          default:
            return text;
        }
      },
    },
  ];

  const fetchDatas = useCallback(async (params) => {
    try {
      dispatch({ type: "loading", loading: true });

      await initConfig(params).then((response) => {
        let results = response.map((item) => {
          return { ...item, key: item.id };
        });

        dispatch({
          type: "complete",
          payload: {
            datas: results,
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

  async function tableConfigChange(value, payload) {
    if (value != null) {
      try {
        dispatch({ type: "loading", loading: true });

        await updateConfig({
          id: payload.id,
          nama: payload.nama,
          nilai: value,
        });

        dispatch({
          type: "complete",
          payload: {
            datas: state.payload?.datas,
          },
        });
      } catch (e) {
        dispatch({
          type: "error",
        });

        notification.error({ title: "Error", description: e.message });
      }
    }
  }

  //======================================================================//

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Title level={4}>Setting</Title>
      <Divider style={{ margin: "10px 0px" }} />
      <Table
        bordered
        showHeader={false}
        pagination={false}
        columns={columns}
        loading={state.loading}
        dataSource={state.payload?.datas}
      />
    </div>
  );
}
