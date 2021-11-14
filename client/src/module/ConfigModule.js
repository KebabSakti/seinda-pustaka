import {
  adminConfigIndex,
  adminConfigUpdate,
} from "../api/admin/AdminConfigApi";

export async function initConfig(params) {
  let response = await adminConfigIndex(params);

  saveConfig(response.data);

  return response.data;
}

export async function updateConfig(params) {
  let response = await adminConfigUpdate(params);

  saveConfig(response.data);

  return response.data;
}

export function getConfig(params) {
  const config = JSON.parse(sessionStorage.getItem(params));

  return config;
}

function saveConfig(params) {
  params.forEach((item) => {
    sessionStorage.setItem(item.nama, item.nilai);
  });
}
