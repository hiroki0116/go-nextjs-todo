import React,{ useState, useEffect, createContext } from 'react';
import { ITask } from 'interfaces/Task';

type TaskContent = {
    tasks: ITask[];
    setTasks: (t: ITask[]) => void;
}

const initialState = {
    tasks: [],
    setTasks: () => {}
}

export const TaskContext = createContext<TaskContent>(initialState);


export const TaskProvider = ({ children }: {children: any;}) => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const value = {
        tasks,
        setTasks
    }

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
}