import { useState, useContext, useEffect } from "react";
// components
import { TaskContext } from "context/TaskContext";
// services
import { fetchTaskById, updateTaskById } from "services/task";
// types
import { ITask } from "interfaces/Task";
// third party
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import message from "antd/lib/message";

const UpdateTaskModal = ({
  showModal,
  setShowModal,
  task,
}: {
  showModal: boolean;
  setShowModal: (boolean) => void;
  task: ITask;
}) => {
  const { loading, setLoading, tasks } = useContext(TaskContext);
  const [newTitle, setNewTitle] = useState<string>(task.title);

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const data = await updateTaskById(task._id, {
        ...task,
        title: newTitle.trim(),
      });
      message.success("Updated successfully");
      tasks[tasks.findIndex((curr) => curr._id === task._id)] = data;
      setShowModal(false);
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      title={`Edit your task`}
      centered
      width="500px"
      zIndex={1000}
      footer={null}
    >
      <div className="flex gap-3 py-5">
        <input
          type="text"
          placeholder="Edit title"
          className="bg-slate-900 rounded py-1 px-3  shadow w-full text-primary focus:outline-none focus:shadow-outline text-16"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Button
          type="primary"
          className="bg-slate-900"
          onClick={handleUpdateTask}
          loading={loading}
          disabled={loading}
          size="large"
        >
          Edit
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateTaskModal;
