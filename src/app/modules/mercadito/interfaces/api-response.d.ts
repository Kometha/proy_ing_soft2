export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  count: number;
  data: T;
  errorCode?: string;
}
