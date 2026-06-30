interface User {
  id: number;
  username: string;
  full_name: string;
}

type ReassignmentReason =
  | "WORKLOAD"
  | "EMERGENCY / LEAVE"
  | "CLIENT REQUEST"
  | string;

export interface ReassignmentRequestEnumsFullApiResponseData {
  reassignment_reasons: ReassignmentReason[];
  account_specialists: User[];
  operations: User[];
}

export interface ReassignmentRequestEnumsQueryParams {
  ops?: true;
  as?: true;
  reasons?: true;
}

type MapParamsToKeys<T extends ReassignmentRequestEnumsQueryParams> =
  | (T["reasons"] extends true ? "reassignment_reasons" : never)
  | (T["as"] extends true ? "account_specialists" : never)
  | (T["ops"] extends true ? "operations" : never);

export type ReassignmentRequestEnumsApiResponse<
  T extends ReassignmentRequestEnumsQueryParams,
> = Pick<ReassignmentRequestEnumsFullApiResponseData, MapParamsToKeys<T>>;
