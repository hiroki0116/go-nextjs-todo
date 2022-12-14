import { useState, useContext } from "react";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import { TaskContext } from "context/TaskContext";
// services
import { createTask } from "services/task";

const CreateTask = () => {
  const { loading, setLoading, tasks, setTasks } =
    useContext(TaskContext);
  const [task, setTask] = useState("");

  const handleCreateTask = async () => {
    try {
      if (task == "") {
        message.error("Task cannot be empty");
        return;
      }
      setLoading(true);
      const data = await createTask({ title: task.trim() });
      setTasks([...tasks, data]);
      message.success("Task created successfully");
      setTask("");
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-5">
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Add a task here"
          className="bg-cyan-900/80 border border-slate-200/10 rounded py-1 px-3  shadow w-full text-primary focus:shadow-outline text-16"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          type="primary"
          className="bg-slate-900 border border-slate-200/10"
          onClick={handleCreateTask}
          loading={loading}
          disabled={loading}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
