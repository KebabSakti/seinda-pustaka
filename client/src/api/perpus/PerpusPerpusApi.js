import Network from "../../module/NetworkModule";

export async function perpusPerpusIndex(params) {
  return await Network().post("/perpustakaan/perpus/index", params, {
    params: { page: params.page },
  });
}

export async function perpusPerpusAdd(params) {
  return await Network().post("/perpustakaan/perpus/add", params);
}

export async function perpusPerpusStore(params) {
  return await Network().post("/perpustakaan/perpus/store", params);
}

export async function perpusPerpusUpdate(params) {
  return await Network().post("/perpustakaan/perpus/update", params);
}

export async function perpusPerpusDelete(params) {
  return await Network().post("/perpustakaan/perpus/delete", params);
}
