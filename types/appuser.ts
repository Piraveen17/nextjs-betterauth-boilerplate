export type Role = "user" | "admin";

export interface IAppUser {
  userId: string;
  email: string;
  name?: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
