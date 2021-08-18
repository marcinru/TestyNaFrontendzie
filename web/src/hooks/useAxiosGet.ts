import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { axios } from "../api/axios";
import { EndpointType } from "../api/endpoints";

export function useAxiosGet<T>(
  endpoint: EndpointType,
): [T | undefined, boolean, any, Dispatch<SetStateAction<T | undefined>>] {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = undefined; // getCurrentUser();
      let config: AxiosRequestConfig = {};
      if (accessToken) {
        config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      if (!loading) setLoading(true);
      await axios(endpoint, config)
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    };
    fetchData();
  }, [endpoint.url, endpoint.method]);

  // @ts-ignore
  return [data, loading, error, setData];
}
