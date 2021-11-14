import Network from "../../module/NetworkModule";

export async function adminProvinsiIndex(params) {
  return await Network().post("/admin/provinsi/index", params, {
    params: { page: params.page },
  });
}

export async function adminProvinsiAdd(params) {
  return await Network().post("/admin/provinsi/add", params);
}

export async function adminProvinsiStore(params) {
  return await Network().post("/admin/provinsi/store", params);
}

export async function adminProvinsiUpdate(params) {
  return await Network().post("/admin/provinsi/update", params);
}

export async function adminProvinsiDelete(params) {
  return await Network().post("/admin/provinsi/delete", params);
}
