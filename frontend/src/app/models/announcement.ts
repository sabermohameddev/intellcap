import { User } from "./user.model";

export interface Announcement {
    id?: number;
    content: string;
    createdAt: Date;
    author: User;
}