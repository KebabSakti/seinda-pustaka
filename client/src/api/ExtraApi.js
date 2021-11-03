import Network from "../module/NetworkModule";

export async function extraIndex() {
  return await Network().post("/global/index");
}
