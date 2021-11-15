import Network from "../../module/NetworkModule";

export async function perpusBukuIndex(params) {
  return await Network().post("/perpustakaan/buku/index", params, {
    params: { page: params.page },
  });
}

export async function perpusBukuAdd(params) {
  return await Network().post("/perpustakaan/buku/add", params);
}

export async function perpusBukuStore(params) {
  return await Network().post("/perpustakaan/buku/store", params);
}

export async function perpusBukuUpdate(params) {
  return await Network().post("/perpustakaan/buku/update", params);
}

export async function perpusBukuDelete(params) {
  return await Network().post("/perpustakaan/buku/delete", params);
}
