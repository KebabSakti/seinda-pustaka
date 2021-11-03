import Network from "../module/NetworkModule";

export async function perpusIndex(params) {
  return await Network().post("/admin/perpus/index", params, {
    params: { page: params.page },
  });
}
