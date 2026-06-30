import type {
  ReassignmentRequestEnumsApiResponse,
  ReassignmentRequestEnumsQueryParams,
} from "@/types/reassignment-requests";
import { apiGet } from "./axiosInstance";

export const fetchReassignmentRequestEnums = async <
  T extends ReassignmentRequestEnumsQueryParams,
>(
  params?: T,
) =>
  apiGet<ReassignmentRequestEnumsApiResponse<T>>(
    "reassignment-requests/enums",
    {
      params,
    },
  );
