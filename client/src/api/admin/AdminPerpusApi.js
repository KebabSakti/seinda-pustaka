import Network from "../../module/NetworkModule";

export async function adminPerpusIndex(params) {
  return await Network().post("/admin/perpus/index", params, {
    params: { page: params.page },
  });
}

export async function adminPerpusAdd(params) {
  return await Network().post("/admin/perpus/add", params);
}

export async function adminPerpusStore(params) {
  return await Network().post("/admin/perpus/store", params);
}

export async function adminPerpusUpdate(params) {
  return await Network().post("/admin/perpus/update", params);
}

export async function adminPerpusDelete(params) {
  return await Network().post("/admin/perpus/delete", params);
}
