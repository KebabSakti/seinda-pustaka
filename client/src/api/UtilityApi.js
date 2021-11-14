import Network from "../module/NetworkModule";

export async function userExist(params) {
  return await Network().post("/global/user_exist", params);
}
