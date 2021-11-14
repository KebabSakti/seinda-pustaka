import Network from "../../module/NetworkModule";

export async function adminJenisPerpusIndex(params) {
  return await Network().post("/admin/jenis_perpus/index", params, {
    params: { page: params.page },
  });
}

export async function adminJenisPerpusAdd(params) {
  return await Network().post("/admin/jenis_perpus/add", params);
}

export async function adminJenisPerpusStore(params) {
  return await Network().post("/admin/jenis_perpus/store", params);
}

export async function adminJenisPerpusUpdate(params) {
  return await Network().post("/admin/jenis_perpus/update", params);
}

export async function adminJenisPerpusDelete(params) {
  return await Network().post("/admin/jenis_perpus/delete", params);
}
