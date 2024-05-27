/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as React from "react";
import { useEffect } from "react";

/*
 * A helper function to make a call to endpoint using axios
 * It will return response data, if error then error information and isLoading will help in determining the loading state of the endpoint being called
 */
export const useApi = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setData(response.data);
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};
