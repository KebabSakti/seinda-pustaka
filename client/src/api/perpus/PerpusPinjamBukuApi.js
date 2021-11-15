import Network from "../../module/NetworkModule";

export async function perpusPinjamBukuIndex(params) {
  return await Network().post("/perpustakaan/pinjam/index", params, {
    params: { page: params.page },
  });
}

export async function perpusPinjamBukuAdd(params) {
  return await Network().post("/perpustakaan/pinjam/add", params);
}

export async function perpusPinjamBukuStore(params) {
  return await Network().post("/perpustakaan/pinjam/store", params);
}

export async function perpusPinjamBukuUpdate(params) {
  return await Network().post("/perpustakaan/pinjam/update", params);
}

export async function perpusPinjamBukuDelete(params) {
  return await Network().post("/perpustakaan/pinjam/delete", params);
}
