import Network from "../module/NetworkModule";

export async function perpusIndex(page = 1, params) {
  return await Network().post("/admin/perpus/index", params, {
    params: { page: page },
  });
}
