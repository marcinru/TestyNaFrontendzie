import originalAxios, { AxiosRequestConfig } from "axios";

import { EndpointType } from "./endpoints";
import { getCurrentUser } from "../authentication/getCurrentUser";

export const API_URL = "http://localhost:3030";

export const axios = <T>(
  endpoint: EndpointType,
  config?: AxiosRequestConfig,
) => {
  const user = getCurrentUser();

  return originalAxios.request<T>({
    method: endpoint.method,
    baseURL: API_URL,
    url: endpoint.url,
    headers: {
      Authorization: `Bearer ${user}`,
    },
    ...config,
  });
};
