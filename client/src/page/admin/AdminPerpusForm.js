import React, { useReducer, useCallback, useEffect, useState } from "react";
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
  Button,
  Space,
  Spin,
} from "antd";
import { adminPerpusAdd } from "../../api/admin/AdminPerpusApi";
import moment from "moment";

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

export default function AdminPerpusForm({ form, payload, tableModalOnOk }) {
  const { Option } = Select;
  const { Title } = Typography;

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const fetchDatas = useCallback(async () => {
    try {
      dispatch({ type: "loading", loading: true });

      await adminPerpusAdd().then((response) => {
        dispatch({
          type: "complete",
          payload: response.data,
        });
      });

      form.setFieldsValue({
        mode: payload.mode,
      });

      if (payload.data != null) {
        form.setFieldsValue({
          mode: payload.mode,
          id: payload.data.id,
          jenis_perpustakaan_id: parseInt(payload.data.jenis_perpustakaan_id),
          nama: payload.data.nama,
          alamat: payload.data.alamat,
          kecamatan: payload.data.kecamatan,
          kelurahan: payload.data.kelurahan,
          provinsi: payload.data.provinsi,
          kabupaten_kota: payload.data.kabupaten_kota,
          kode_pos: payload.data.kode_pos,
          telp: payload.data.telp,
          email: payload.data.email,
          website: payload.data.website,
          status_perpustakaan: payload.data.status_perpustakaan,
          npsn: payload.data.npsn,
          nis: payload.data.nis,
          struktur_organisasi: payload.data.struktur_organisasi,
          nama_kepala_perpustakaan: payload.data.nama_kepala_perpustakaan,
          nama_kepala_instansi_induk: payload.data.nama_kepala_instansi_induk,
          tahun_berdiri_perpustakaan:
            payload.data.tahun_berdiri_perpustakaan != null
              ? moment(payload.data.tahun_berdiri_perpustakaan, "YYYY")
              : null,
        });

        if (payload.data.data_gedung != null) {
          let dataGedung = payload.data.data_gedung;

          form.setFieldsValue({
            luas_tanah: dataGedung.luas_tanah,
            luas_gedung: dataGedung.luas_gedung,
            luas_ruang_tamu: dataGedung.luas_ruang_tamu,
            luas_ruang_sirkulasi: dataGedung.luas_ruang_sirkulasi,
            luas_ruang_baca: dataGedung.luas_ruang_baca,
            luas_ruang_koleksi: dataGedung.luas_ruang_koleksi,
            luas_toilet: dataGedung.luas_toilet,
            luas_kantin: dataGedung.luas_kantin,
          });
        }

        if (payload.data.sumber_daya_manusia != null) {
          let sdm = payload.data.sumber_daya_manusia;

          form.setFieldsValue({
            seluruh_pegawai: sdm.seluruh_pegawai,
            pns: sdm.pns,
            pejabat_fungsional: sdm.pejabat_fungsional,
            honorer: sdm.honorer,
            kepala_perpustakaan: sdm.kepala_perpustakaan,
            tenaga_teknis_perpustakaan: sdm.tenaga_teknis_perpustakaan,
            tenaga_administrasi: sdm.tenaga_administrasi,
            sd: sdm.sd,
            smp: sdm.smp,
            diklat: sdm.diklat,
            s1_perpustakaan: sdm.s1_perpustakaan,
            s1_diklat: sdm.s1_diklat,
            s1_non_perpustakaan: sdm.s1_non_perpustakaan,
          });
        }

        if (payload.data.koleksi_materi != null) {
          let koleksi = payload.data.koleksi_materi;

          form.setFieldsValue({
            jumlah_buku_nonfiksi: koleksi.jumlah_buku_nonfiksi,
            jumlah_buku_referensi: koleksi.jumlah_buku_referensi,
            jumlah_buku_fiksi: koleksi.jumlah_buku_fiksi,
            jumlah_sk_lokal: koleksi.jumlah_sk_lokal,
            jumlah_terbitan_pemerintah: koleksi.jumlah_terbitan_pemerintah,
            jumlah_terbitan_daerah: koleksi.jumlah_terbitan_daerah,
            jumlah_peta: koleksi.jumlah_peta,
          });
        }

        if (payload.data.jam_operasional != null) {
          let jam = payload.data.jam_operasional;

          form.setFieldsValue({
            senin_kamis:
              jam.senin_kamis != null
                ? moment(jam.senin_kamis, "HH:mm:ss")
                : null,
            jummat: jam.jummat != null ? moment(jam.jummat, "HH:mm:ss") : null,
            sabtu: jam.sabtu != null ? moment(jam.sabtu, "HH:mm:ss") : null,
          });
        }

        if (payload.data.anggota_otomasi != null) {
          let anggota = payload.data.anggota_otomasi;

          form.setFieldsValue({
            pelajar: anggota.pelajar,
            guru: anggota.guru,
            pengunjung_perbulan: anggota.pengunjung_perbulan,
            pinjaman_perbulan: anggota.pinjaman_perbulan,
            perpustakaan_digital: anggota.perpustakaan_digital,
          });
        }

        if (payload.data.sarana_prasarana != null) {
          let sarana = payload.data.sarana_prasarana;

          form.setFieldsValue({
            operasional_roda_empat: sarana.operasional_roda_empat,
            operasional_roda_dua: sarana.operasional_roda_dua,
            rak_buku: sarana.rak_buku,
            rak_majalah: sarana.rak_majalah,
            rak_surat_kabar: sarana.rak_surat_kabar,
            rak_penitipan_barang: sarana.rak_penitipan_barang,
            filling_kabinet: sarana.filling_kabinet,
            meja_baca: sarana.meja_baca,
            meja_sirkulasi: sarana.meja_sirkulasi,
            meja_kerja: sarana.meja_kerja,
            kursi_kerja: sarana.kursi_kerja,
            kursi_tamu: sarana.kursi_tamu,
            komputer: sarana.komputer,
            sarana_tv: sarana.sarana_tv,
            ac: sarana.ac,
          });
        }

        if (payload.data.fasilitas_anggaraan != null) {
          let fasilitas = payload.data.fasilitas_anggaraan;

          form.setFieldsValue({
            internet: parseInt(fasilitas.internet) > 0,
            fasilitas_tv: parseInt(fasilitas.fasilitas_tv) > 0,
            kantin: parseInt(fasilitas.kantin) > 0,
            mushollah: parseInt(fasilitas.mushollah) > 0,
            apbn: parseInt(fasilitas.apbn) > 0,
            apbd: parseInt(fasilitas.apbd) > 0,
            yayasan: parseInt(fasilitas.yayasan) > 0,
            bantuan: parseInt(fasilitas.bantuan) > 0,
            lainnya: fasilitas.lainnya,
          });
        }

        if (payload.data.mendapat_koleksi != null) {
          let dapat = payload.data.mendapat_koleksi;

          let sk = dapat
            .filter((item) => item.sumber === "sumber_koleksi")
            .map((item) => item.deskripsi);

          let as = dapat
            .filter((item) => item.sumber === "alat_seleksi")
            .map((item) => item.deskripsi);

          let sl = dapat
            .filter((item) => item.sumber === "sistem_layanan")
            .map((item) => item.deskripsi);

          let jl = dapat
            .filter((item) => item.sumber === "jenis_layanan")
            .map((item) => item.deskripsi);

          form.setFieldsValue({
            sumber_koleksi: sk,
            alat_seleksi: as,
            sistem_layanan: sl,
            jenis_layanan: jl,
          });
        }
      }
    } catch (e) {
      dispatch({
        type: "error",
      });

      notification.error({ title: "Error", description: e.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formSubmit() {
    setLoading(true);

    tableModalOnOk();
  }

  //======================================================================//

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  //======================================================================//

  return (
    <div>
      <Spin spinning={loading}>
        <Form
          layout="horizontal"
          preserve={false}
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          onFinish={formSubmit}
        >
          <Form.Item hidden name="mode">
            <Input />
          </Form.Item>
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Row>
            <Col span={24}>
              <Title level={4} style={{ textAlign: "center" }}>
                Data Perpustakaan
              </Title>
              <Divider style={{ margin: "15px 0px" }} />
            </Col>
          </Row>
          <Form.Item
            label="Jenis Perpustakaan"
            name="jenis_perpustakaan_id"
            rules={[{ required: true, message: "Pilih salah satu" }]}
          >
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
            rules={[{ required: true, message: "Field tidak boleh kosong" }]}
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
          <Form.Item label="Kabupaten" name="kabupaten_kota">
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
          <Form.Item
            label="Nama Kep. Instansi"
            name="nama_kepala_instansi_induk"
          >
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
          <Form.Item label="Luas Ruang Baca" name="luas_ruang_baca">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Luas Ruang Koleksi" name="luas_ruang_koleksi">
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
          <Form.Item
            label="Jml. Tenaga Teknis"
            name="tenaga_teknis_perpustakaan"
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Jml. Tenaga Adm" name="tenaga_administrasi">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Jml. Pegawai SD" name="sd">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Jml. Pegawai SMP" name="smp">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Jml. Diklat" name="diklat">
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
          <Form.Item label="Buku Terbitan Daerah" name="jumlah_terbitan_daerah">
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
          <Form.Item
            label="Operasional Roda Empat"
            name="operasional_roda_empat"
          >
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
          <Form.Item label="Jml. TV" name="sarana_tv">
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
              <Col span={24}>
                <Form.Item name="lainnya">
                  <Input placeholder="Lainnya.." style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}
