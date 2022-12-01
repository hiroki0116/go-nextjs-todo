import { useState, useContext, useEffect } from "react";
import { TaskContext } from "context/TaskContext";
import { API, APIWithoutAuth } from "utils/api";
import { isAuth } from "utils/auth";
import message from "antd/lib/message";
import Empty from "antd/lib/empty";
import Skeleton from 'antd/lib/skeleton';
import CheckSquare from "@ant-design/icons/CheckSquareOutlined";
import EditFilled from "@ant-design/icons/EditFilled";

const ListTask = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [isAuth()]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks/");
      if (data?.data) {
        setTasks(data.data);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between rounded border px-3 py-2 text-primary"
        >
          <div className="text-left">
            {task.title}
          </div>
          <div className="flex items-center gap-4 text-lg">
            <EditFilled className="cursor-pointer" />
            <CheckSquare className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTask;
