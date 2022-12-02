import { API } from 'utils/api';

export const fetchAllTasks = async (): Promise<any> => {
    try {
        const res = await API.get("/tasks/");
        return res;
    } catch (error) {
        return error;
    }
}

export const fetchTaskById = async (id: string): Promise<any> => {
    try {
        const res = await API.get(`/tasks/${id}`);
        return res;
    } catch (error:any) {
        return error;
    }
}

export const createTask = async (data: Object): Promise<any> => {
    try {
        const res = await API.post('/tasks/', data);
        return res;
    } catch (error:any) {
        return error;
    }
}

export const updateTaskById = async (id: string, data: Object): Promise<any> => {
    try {
        const res = await API.put(`/tasks/${id}`, data);
        return res;
    } catch (error:any) {
        return error;
    }
}

export const deleteTaskById = async (id: string): Promise<any> => {
    try {
        const res = await API.delete(`/tasks/${id}`);
        return res;
    } catch (error) {
        return error;    
    }
}