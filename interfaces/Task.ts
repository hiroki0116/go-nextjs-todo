import {Dayjs} from 'dayjs'

export interface ITask {
    _id: string;
    title: string;
    completed: boolean;
    complated_date: Dayjs;
    updated_at: Dayjs;
    created_at: Dayjs;
    user_id: string;
}
