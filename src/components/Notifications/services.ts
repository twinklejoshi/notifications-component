import { useApi } from "../../utils";
import { notificationsMockData } from "./helpers";
import { Notification } from "./types";

/*
 * Custom service hooks that makes call to the endpoints to get or manipulate the data
 * These are formatted based on useApi custom hook which will keep the response consistent through out the app
 */

export const useAllCustomerRecords = (orgId: number) => {
  return useApi<Notification>(`/api/anamoly-service/${orgId}`, {
    method: "GET",
  });
};

export const useAllCustomerUnreadRecords = (orgId: number) => {
  // return useApi<Notification>(`/api/anamoly-service/${orgId}/unread`, {method: 'GET'});
  //  In realtime above statement will be executed
  // For now just return the mock data
  return {
    data: notificationsMockData,
    isLoading: false,
    error: null,
  };
};

export const useMarkAllCustomerRecordsRead = (orgId: number) => {
  useApi<Notification>(`/api/anamoly-service/${orgId}/mark-read`, {
    method: "POST",
  });
};

export const useMarkProvidedCustomerRecordsRead = (
  orgId: number,
  recordId: number
) => {
  useApi<Notification>(
    `/api/anamoly-service/${orgId}/mark-read?messageId=${recordId}`,
    {
      method: "POST",
    }
  );
};
