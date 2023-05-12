import React,{ useState, createContext } from 'react';
import { ITask } from 'interfaces/Task';
import message from 'antd/lib/message';
import { fetchAllTasks } from 'services/task';

type TaskContent = {
    tasks: ITask[];
    setTasks: (t: ITask[]) => void;
    loading: boolean;
    setLoading: (l: boolean) => void;
    fetchTasks: () => Promise<void>;
}

const initialState = {
    tasks: [],
    setTasks: () => {},
    loading: false,
    setLoading: () => {},
    fetchTasks: () => Promise.resolve()
}

export const TaskContext = createContext<TaskContent>(initialState);


export const TaskProvider = ({ children }: {children: any;}) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async (): Promise<void> => {
        try {
          setLoading(true);
          const data = await fetchAllTasks();
          setTasks(data);
        } catch (error: any) {
          message.error(error.response?.data?.message);
        } finally {
          setLoading(false);
        }
      };

    const value = {
        tasks,
        setTasks,
        loading,
        setLoading,
        fetchTasks
    }

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
}