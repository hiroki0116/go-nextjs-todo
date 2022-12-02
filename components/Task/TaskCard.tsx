import dynamic from "next/dynamic";
import { useState, useContext } from "react";
// types
import { ITask } from "interfaces/Task";
// third party
import CheckSquareFilled from "@ant-design/icons/CheckSquareFilled";
import CheckSquare from "@ant-design/icons/CheckSquareOutlined";
import EditFilled from "@ant-design/icons/EditFilled";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import message from "antd/lib/message";
// components
import { TaskContext } from "context/TaskContext";
const UpdateTaskModal = dynamic(() => import("./UpdateTaskModal"), {
  ssr: false,
});
// services
import { updateTaskById, deleteTaskById } from "services/task";

const TaskCard = ({ task }: { task: ITask }) => {
  const { fetchTasks, loading, setLoading,setTasks,tasks } = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);

  const handleCompleteTask = async () => {
    try {
      setLoading(true);
      const { data } = await updateTaskById(task._id, {
        ...task,
        completed: !task.completed,
      });
      if (data?.success) {
        message.success(data.data);
        fetchTasks();
      }
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const { data } = await deleteTaskById(task._id);
      if (data?.success)message.success(data.data);
      setTasks([...tasks.filter(curr => curr._id !== task._id)])
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-between rounded border px-3 py-2 mr-3 text-primary relative ${
        task.completed ? "bg-slate-900" : ""
      }`}
    >
      <div className="text-left">{task.title}</div>
      <div className="flex items-center gap-4 text-lg">
        <EditFilled
          className="cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out"
          onClick={() => setShowModal(true)}
        />
        {task.completed ? (
          <CheckSquareFilled
            className="cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out"
            onClick={handleCompleteTask}
          />
        ) : (
          <CheckSquare
            className="cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out"
            onClick={handleCompleteTask}
          />
        )}
      </div>
      <CloseOutlined
        className="absolute text-sm top-3 -right-6 cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out"
        onClick={handleDeleteTask}
        disabled={loading}
      />
      <UpdateTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        task={task}
      />
    </div>
  );
};

export default TaskCard;
