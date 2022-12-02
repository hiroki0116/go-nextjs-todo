import { useContext, useEffect, useState } from "react";
// components
import { TaskContext } from "context/TaskContext";
import TaskCard from './TaskCard'
// utils
import { isAuth } from "utils/auth";
// third party
import Empty from "antd/lib/empty";
import Skeleton from 'antd/lib/skeleton';

const ListTask = () => {
  const { tasks, fetchTasks, loading } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [isAuth()]);

  if (loading) return (
    <div className='grid grid-cols-1 justify-items-center items-center'>
      <Skeleton active />
      <Skeleton active />
    </div>
  )

  if (!tasks.length)
    return (
      <Empty
        description={<span className="text-primary">No Task Yet</span>}
        className="py-3"
      />
   );

  return (
    <div className="py-5 flex flex-col gap-3">
      {tasks.map((task,index) => (
        <TaskCard key={index} task={task} />
      ))}
    </div>
  );
};

export default ListTask;
