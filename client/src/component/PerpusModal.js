import React, { useReducer, useCallback, useEffect } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  notification,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
} from "antd";
import { extraIndex } from "../api/ExtraApi";

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

export default function PerpusModal({ form }) {
  const { Option } = Select;
  const { Title } = Typography;

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const fetchDatas = useCallback(async () => {
    try {
      dispatch({ type: "loading", loading: true });

      await extraIndex().then((response) => {
        dispatch({
          type: "complete",
          payload: response.data,
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

  //======================================================================//

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Form
        layout="horizontal"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
      >
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Data Perpustakaan
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Jenis Perpustakaan" name="jenis_perpustakaan_id">
          <Select placeholder="Pilihan" loading={state.loading}>
            {state.payload != null &&
              state.payload.jenis_perpustakaan.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nama_jenis_perpustakaan} (Level : {item.level})
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Nama"
          name="nama"
          rules={[{ required: false, message: "Field tidak boleh kosong" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Alamat" name="alamat">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Kecamatan" name="kecamatan">
          <Select placeholder="Pilihan" loading={state.loading}>
            {state.payload != null &&
              state.payload.kecamatan.map((item) => (
                <Option key={item.id} value={item.nama_kecamatan}>
                  {item.nama_kecamatan}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kelurahan" name="kelurahan">
          <Select placeholder="Pilihan" loading={state.loading}>
            {state.payload != null &&
              state.payload.kelurahan.map((item) => (
                <Option key={item.id} value={item.nama_kelurahan}>
                  {item.nama_kelurahan}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Provinsi" name="provinsi">
          <Select placeholder="Pilihan" loading={state.loading}>
            {state.payload != null &&
              state.payload.provinsi.map((item) => (
                <Option key={item.id} value={item.nama_provinsi}>
                  {item.nama_provinsi}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kabupaten" name="kabupaten">
          <Select placeholder="Pilihan" loading={state.loading}>
            {state.payload != null &&
              state.payload.kabupaten.map((item) => (
                <Option key={item.id} value={item.nama_kabupaten}>
                  {item.nama_kabupaten}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kode Pos" name="kode_pos">
          <Input />
        </Form.Item>
        <Form.Item label="Telp" name="telp">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status_perpustakaan">
          <Select placeholder="Pilihan">
            <Option key="negeri" value="Negeri">
              Negeri
            </Option>
            <Option key="swasta" value="Swasta">
              Swasta
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="NPSN" name="npsn">
          <Input />
        </Form.Item>
        <Form.Item label="NIS" name="nis">
          <Input />
        </Form.Item>
        <Form.Item label="Struktur Organisasi" name="struktur_organisasi">
          <Input />
        </Form.Item>
        <Form.Item label="Nama Kep. Perpus" name="nama_kepala_perpustakaan">
          <Input />
        </Form.Item>
        <Form.Item label="Nama Kep. Instansi" name="nama_kepala_instansi_induk">
          <Input />
        </Form.Item>
        <Form.Item label="Tahun Berdiri" name="tahun_berdiri_perpustakaan">
          <DatePicker picker="year" style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Data Gedung
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Luas Tanah" name="luas_tanah">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Luas Gedung" name="luas_gedung">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Luas Ruang Tamu" name="luas_ruang_tamu">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Luas Ruang Sirkulasi" name="luas_ruang_sirkulasi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Luas Toilet" name="luas_toilet">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Luas Kantin" name="luas_kantin">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Sumber Daya Manusia
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Jml. Seluruh Pegawai" name="seluruh_pegawai">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. PNS" name="pns">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Pejabat Fungsional" name="pejabat_fungsional">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Honorer" name="honorer">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Kep. Perpus" name="kepala_perpustakaan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Tenaga Teknis" name="tenaga_teknis_perpustakaan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Tenaga Adm" name="tenaga_administrasi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Pegawai SD" name="sd">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Pegawai SMD" name="smp">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. S1 Perpus" name="s1_perpustakaan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. S1 Diklat" name="s1_diklat">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. S1 Non Perpus" name="s1_non_perpustakaan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Koleksi Materi
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Jml. Buku Non Fiksi" name="jumlah_buku_nonfiksi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Buku Referensi" name="jumlah_buku_referensi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Buku Fiksi" name="jumlah_buku_fiksi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Surat Kabar Lokal" name="jumlah_sk_lokal">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Buku Terbitan Pemerintah"
          name="jumlah_terbitan_pemerintah"
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Buku Terbitan Daerah"
          name="jumlah_terbitan_pemerintah"
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Peta" name="jumlah_peta">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Cara Mendapat Koleksi Dan Layanan
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Sumber Koleksi" name="sumber_koleksi">
          <Checkbox.Group>
            <Row>
              <Col>
                <Checkbox value="Pembelian">Pembelian</Checkbox>
              </Col>
              <Col>
                <Checkbox value="Hadiah">Hadiah</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Alat Seleksi" name="alat_seleksi">
          <Checkbox.Group>
            <Row>
              <Col>
                <Checkbox value="Bibliografi">Bibliografi</Checkbox>
              </Col>
              <Col>
                <Checkbox value="Daftar Buku Toko Buku">
                  Daftar Buku Toko Buku
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Sistem Layanan" name="sistem_layanan">
          <Checkbox.Group>
            <Row>
              <Col>
                <Checkbox value="Terbuka">Terbuka</Checkbox>
              </Col>
              <Col>
                <Checkbox value="Tertutup">Tertutup</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Jenis Layanan" name="jenis_layanan">
          <Checkbox.Group>
            <Row>
              <Col>
                <Checkbox value="Referensi">Referensi</Checkbox>
              </Col>
              <Col>
                <Checkbox value="Internet">Internet</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Jam Buka Perpustakaan
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Senin sd Kamis" name="senin_kamis">
          <DatePicker picker="time" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jummat" name="jummat">
          <DatePicker picker="time" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Sabtu" name="sabtu">
          <DatePicker picker="time" style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Anggota Dan Sistem Otomatis
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Jml. Anggota Pelajar" name="pelajar">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Anggota GUru" name="guru">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Pengunjung Perbulan" name="pengunjung_perbulan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Pinjaman Perbulan" name="pinjaman_perbulan">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Perpustakaan Digital" name="perpustakaan_digital">
          <Radio.Group>
            <Radio value="Sudah">Sudah</Radio>
            <Radio value="Belum">Belum</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Sarana Dan Prasana
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Operasional Roda Empat" name="operasional_roda_empat">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Operasional Roda Dua" name="operasional_roda_dua">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Rak Buku" name="rak_buku">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Rak Majalah" name="rak_majalah">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Rak Surat Kabar" name="rak_surat_kabar">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Rak Titip Barang" name="rak_penitipan_barang">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Filling Kabinet" name="filling_kabinet">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Meja Baca" name="meja_baca">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Meja Sirkulasi" name="meja_sirkulasi">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Meja Kerja" name="meja_kerja">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Kursi Kerja" name="kursi_kerja">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Kursi Tamu" name="kursi_tamu">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. Komputer" name="komputer">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. TV" name="tv">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Jml. AC" name="ac">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Divider style={{ margin: "15px 0px" }} />
        <Row>
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              Fasilitas Umum Dan Anggaran
            </Title>
            <Divider style={{ margin: "15px 0px" }} />
          </Col>
        </Row>
        <Form.Item label="Pilihan">
          <Row>
            <Col>
              <Form.Item name="internet" valuePropName="checked">
                <Checkbox>Internet</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="fasilitas_tv" valuePropName="checked">
                <Checkbox>TV</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="kantin" valuePropName="checked">
                <Checkbox>Kantin</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="mushollah" valuePropName="checked">
                <Checkbox>Mushollah</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="apbn" valuePropName="checked">
                <Checkbox>APBN</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="apbd" valuePropName="checked">
                <Checkbox>APBD</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="yayasan" valuePropName="checked">
                <Checkbox>Yayasan</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="bantuan" valuePropName="checked">
                <Checkbox>Bantuan</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Lainnya" name="lainnya">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
