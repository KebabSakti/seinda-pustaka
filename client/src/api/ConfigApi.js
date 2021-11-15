import Network from "../module/NetworkModule";

export async function configIndex(params) {
  return await Network().post("/global/konfigurasi/index", params);
}

export async function configShow(params) {
  return await Network().post("/global/konfigurasi/add", params);
}

export async function configUpdate(params) {
  return await Network().post("/global/konfigurasi/update", params);
}
