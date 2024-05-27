export enum NotificationTypes {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  WARNING = "WARNING",
}

export enum MetricTypes {
  INGEST = "ingest",
  RETAIN = "retain",
  QUERY = "query",
}

export interface Notification {
  recordId: number;
  type: NotificationTypes;
  metrics: MetricTypes;
  title: string;
  description: string;
  isRead: boolean;
}
