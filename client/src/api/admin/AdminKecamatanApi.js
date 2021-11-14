import Network from "../../module/NetworkModule";

export async function adminKecamatanIndex(params) {
  return await Network().post("/admin/kecamatan/index", params, {
    params: { page: params.page },
  });
}

export async function adminKecamatanAdd(params) {
  return await Network().post("/admin/kecamatan/add", params);
}

export async function adminKecamatanStore(params) {
  return await Network().post("/admin/kecamatan/store", params);
}

export async function adminKecamatanUpdate(params) {
  return await Network().post("/admin/kecamatan/update", params);
}

export async function adminKecamatanDelete(params) {
  return await Network().post("/admin/kecamatan/delete", params);
}
