import Network from "../../module/NetworkModule";

export async function adminBukuIndex(params) {
  return await Network().post("/admin/buku/index", params, {
    params: { page: params.page },
  });
}

export async function adminBukuAdd(params) {
  return await Network().post("/admin/buku/add", params);
}

export async function adminBukuStore(params) {
  return await Network().post("/admin/buku/store", params);
}

export async function adminBukuUpdate(params) {
  return await Network().post("/admin/buku/update", params);
}

export async function adminBukuDelete(params) {
  return await Network().post("/admin/buku/delete", params);
}
