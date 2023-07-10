import { Role } from './role.enum';

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    isActive!: boolean;
    role!: Role;
    phoneNumber!: string;
    address!: string;
    birthdate!: Date;
    profession!: string;
    joinDate!: string;
}