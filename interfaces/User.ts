import {Dayjs} from 'dayjs'

export interface IUser {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    updated_at: Dayjs;
    created_at: Dayjs;
}