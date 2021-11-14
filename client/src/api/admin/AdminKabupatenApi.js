import Network from "../../module/NetworkModule";

export async function adminKabupatenIndex(params) {
  return await Network().post("/admin/kabupaten/index", params, {
    params: { page: params.page },
  });
}

export async function adminKabupatenAdd(params) {
  return await Network().post("/admin/kabupaten/add", params);
}

export async function adminKabupatenStore(params) {
  return await Network().post("/admin/kabupaten/store", params);
}

export async function adminKabupatenUpdate(params) {
  return await Network().post("/admin/kabupaten/update", params);
}

export async function adminKabupatenDelete(params) {
  return await Network().post("/admin/kabupaten/delete", params);
}
