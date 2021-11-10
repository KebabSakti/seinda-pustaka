import Network from "../module/NetworkModule";

export async function perpusIndex(params) {
  return await Network().post("/admin/perpus/index", params, {
    params: { page: params.page },
  });
}

export async function perpusAdd(params) {
  return await Network().post("/admin/perpus/add", params);
}

export async function perpusStore(params) {
  return await Network().post("/admin/perpus/store", params);
}

export async function perpusUpdate(params) {
  return await Network().post("/admin/perpus/update", params);
}

export async function perpusDelete(params) {
  return await Network().post("/admin/perpus/delete", params);
}
