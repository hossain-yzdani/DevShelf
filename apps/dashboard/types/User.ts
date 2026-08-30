export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "user";
  status: "active" | "inactive" | "banned";
  createdAt: string;
  lastLogin: string;
  updatedAt?: string;
}

// export interface UserFormData {
//   username: string;
//   email: string;
//   fullName: string;
//   role: "admin" | "editor" | "user";
//   status: "active" | "inactive" | "banned";
//   password?: string;
// }

// export interface UserFormErrors {
//   username?: string;
//   email?: string;
//   fullName?: string;
//   role?: string;
//   status?: string;
//   password?: string;
// }

// export interface UserResponse {
//   id: string;
//   username: string;
//   email: string;
//   fullName: string;
//   role: "admin" | "editor" | "user";
//   status: "active" | "inactive" | "banned";
//   createdAt: string;
//   lastLogin: string;
//   updatedAt?: string;
// }

// export interface UsersListResponse {
//   data: User[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// export interface CreateUserDto {
//   username: string;
//   email: string;
//   fullName: string;
//   password: string;
//   role?: "admin" | "editor" | "user";
//   status?: "active" | "inactive" | "banned";
// }

// export interface UpdateUserDto {
//   username?: string;
//   email?: string;
//   fullName?: string;
//   role?: "admin" | "editor" | "user";
//   status?: "active" | "inactive" | "banned";
//   password?: string;
// }

// export interface UserFilters {
//   search?: string;
//   role?: "admin" | "editor" | "user";
//   status?: "active" | "inactive" | "banned";
//   sortBy?: "username" | "createdAt" | "lastLogin";
//   sortOrder?: "asc" | "desc";
// }

// export interface UserStats {
//   total: number;
//   active: number;
//   inactive: number;
//   banned: number;
//   admins: number;
//   editors: number;
//   users: number;
//   newToday: number;
//   newThisWeek: number;
//   newThisMonth: number;
// }

// export interface UserActivity {
//   date: string;
//   count: number;
// }

// export interface UserRoleDistribution {
//   role: string;
//   count: number;
//   percentage: number;
// }