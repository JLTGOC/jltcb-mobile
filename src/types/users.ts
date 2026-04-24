import type { UserRole } from "@/src/types/auth";

export interface User {
	id: number;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	full_name: string;
	role: UserRole;
	username: string;
	email: string;
	address: string;
	contact_number: string;
	company_name: string;
	company_address: string;
	business_type: string;
	image_path: string;
	id_image_path: string;
	created_at: string;
	updated_at: string;
}

export interface UserAs {
	id: number;
	username: string;
	full_name: string;
}
