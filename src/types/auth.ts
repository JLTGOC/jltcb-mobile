type Role = "Client" | "Account Specialist" | "Marketing";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  role: Role;
};
