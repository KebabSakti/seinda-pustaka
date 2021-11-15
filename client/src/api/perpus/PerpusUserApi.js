import Network from "../../module/NetworkModule";

export async function perpusUserIndex(params) {
  return await Network().post("/perpustakaan/user/index", params, {
    params: { page: params.page },
  });
}

export async function perpusUserAdd(params) {
  return await Network().post("/perpustakaan/user/add", params);
}

export async function perpusUserStore(params) {
  return await Network().post("/perpustakaan/user/store", params);
}

export async function perpusUserUpdate(params) {
  return await Network().post("/perpustakaan/user/update", params);
}

export async function perpusUserDelete(params) {
  return await Network().post("/perpustakaan/user/delete", params);
}
