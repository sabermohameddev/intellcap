import { User } from './user.model';

export interface Poster {
    id: number;
    imgUrl: string;
    creator: User;
}
