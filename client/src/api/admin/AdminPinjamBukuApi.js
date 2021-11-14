import Network from "../../module/NetworkModule";

export async function adminPinjamBukuIndex(params) {
  return await Network().post("/admin/pinjam/index", params, {
    params: { page: params.page },
  });
}

export async function adminPinjamBukuAdd(params) {
  return await Network().post("/admin/pinjam/add", params);
}

export async function adminPinjamBukuStore(params) {
  return await Network().post("/admin/pinjam/store", params);
}

export async function adminPinjamBukuUpdate(params) {
  return await Network().post("/admin/pinjam/update", params);
}

export async function adminPinjamBukuDelete(params) {
  return await Network().post("/admin/pinjam/delete", params);
}
