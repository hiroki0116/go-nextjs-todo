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
  const { loading, setLoading,setTasks,tasks } = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);

  const handleCompleteTask = async () => {
    try {
      setLoading(true);
      setTasks([...tasks.map(curr => curr._id === task._id ? {...curr,completed:!curr.completed} : curr)])
      await updateTaskById(task._id, {
        ...task,
        completed: !task.completed,
      });
      message.success("Updated successfully");
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (e) => {
    try {
      setLoading(true);
      setTasks([...tasks.filter(curr => curr._id !== task._id)])
      const data = await deleteTaskById(task._id);
      message.success(data);
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-between rounded border px-3 py-2 mr-3 text-primary relative ${
        task.completed ? "bg-slate-900 border-none" : "hover:bg-slate-800/90 transition duration-300 transform ease-in-out"
      }`}
    >
      <div className={`text-left ${!task.completed && "animate-pulse"}`}>{task.title}</div>
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
