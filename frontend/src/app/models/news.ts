import { User } from "./user.model";

export interface News {
    id: number;
    title: string;
    content: string;
    imgUrl: string;
    author: User;
}
