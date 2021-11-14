import Network from "../../module/NetworkModule";

export async function adminKelurahanIndex(params) {
  return await Network().post("/admin/kelurahan/index", params, {
    params: { page: params.page },
  });
}

export async function adminKelurahanAdd(params) {
  return await Network().post("/admin/kelurahan/add", params);
}

export async function adminKelurahanStore(params) {
  return await Network().post("/admin/kelurahan/store", params);
}

export async function adminKelurahanUpdate(params) {
  return await Network().post("/admin/kelurahan/update", params);
}

export async function adminKelurahanDelete(params) {
  return await Network().post("/admin/kelurahan/delete", params);
}
