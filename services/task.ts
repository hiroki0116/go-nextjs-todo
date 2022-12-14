import { ITask } from 'interfaces/Task';
import { API } from 'utils/api';

export const fetchAllTasks = async (): Promise<ITask[]> => {
    try {
        const {data} = await API.get("/tasks/");
        return data.data as ITask[];
    } catch (error: any) {
        return error;
    }
}

export const fetchTaskById = async (id: string): Promise<ITask> => {
    try {
        const {data} = await API.get(`/tasks/${id}`);
        return data.data as ITask;
    } catch (error:any) {
        return error;
    }
}

export const createTask = async (task: Object): Promise<ITask> => {
    try {
        const {data} = await API.post('/tasks/', task);
        return data.data as ITask;
    } catch (error:any) {
        return error;
    }
}

export const updateTaskById = async (id: string, task: Object): Promise<ITask> => {
    try {
        const {data} = await API.put(`/tasks/${id}`, task);
        return data.data as ITask;
    } catch (error:any) {
        return error;
    }
}

export const deleteTaskById = async (id: string): Promise<string> => {
    try {
        const {data} = await API.delete(`/tasks/${id}`);
        return data.data as string;
    } catch (error:any) {
        return error;    
    }
}