import Network from "../../module/NetworkModule";

export async function adminConfigIndex(params) {
  return await Network().post("/admin/konfigurasi/index", params);
}

export async function adminConfigShow(params) {
  return await Network().post("/admin/konfigurasi/add", params);
}

export async function adminConfigUpdate(params) {
  return await Network().post("/admin/konfigurasi/update", params);
}
