export type UserRole =
  | "Client"
  | "Account Specialist"
  | "Marketing"
  | "Human Resource";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
};
