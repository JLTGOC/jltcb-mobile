export interface ApiResponse<TData> {
  code: number;
  data: TData;
  error: boolean;
  message: string;
};

export type ApiLoginResponse = ApiResponse<string>