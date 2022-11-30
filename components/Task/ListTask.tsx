import { useState, useContext, useEffect } from "react";
import { TaskContext } from "context/TaskContext";
import { API, APIWithoutAuth } from "utils/api";
import { isAuth } from "utils/auth";
import message from "antd/lib/message";
import Empty from "antd/lib/empty";
import CheckSquareFilled from "@ant-design/icons/CheckSquareFilled";
import EditFilled from "@ant-design/icons/EditFilled";
import { getCookie } from "utils/auth";

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
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getCookie("token")?.toString()}`},
      };
      // const { data } = await API.get("/tasks");
      const response = await fetch("http://localhost:8000/api/v1/tasks", options);
      const data = await response.json();
      console.log(data);
      if (data?.data?.tasks) {
        setTasks(data.data.tasks);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
            this is task title asdf asdf asdf asdf asdf asdf{" "}
          </div>
          <div className="flex items-center gap-4 text-lg">
            <EditFilled className="cursor-pointer" />
            <CheckSquareFilled className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTask;
