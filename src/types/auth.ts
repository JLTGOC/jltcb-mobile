export type UserRole =
<<<<<<< HEAD
	| "Client"
	| "Lead Account Specialist"
	| "Account Specialist"
	| "Operations"
	| "Finance"
	| "Marketing"
	| "Human Resource";
=======
  | "Client"
  | "Lead Account Specialist"
  | "Account Specialist"
  | "Client Success"
  | "Operations"
  | "Finance"
  | "Marketing"
  | "Human Resource";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  image_path: string;
};
