import Network from "../../module/NetworkModule";

export async function adminUserIndex(params) {
  return await Network().post("/admin/user/index", params, {
    params: { page: params.page },
  });
}

export async function adminUserAdd(params) {
  return await Network().post("/admin/user/add", params);
}

export async function adminUserStore(params) {
  return await Network().post("/admin/user/store", params);
}

export async function adminUserUpdate(params) {
  return await Network().post("/admin/user/update", params);
}

export async function adminUserDelete(params) {
  return await Network().post("/admin/user/delete", params);
}
