import { useState, useContext } from "react";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import { API } from 'utils/api';
import { TaskContext } from "context/TaskContext";
// services
import { createTask } from 'services/task';

const CreateTask = () => {
  const { fetchTasks, loading, setLoading } = useContext(TaskContext);
  const [task, setTask] = useState("");


  const handleCreateTask = async () => {
    try {
        if(task == ""){
          message.error("Task cannot be empty");
          return;
        }
        setLoading(true);
        const { data } = await createTask({ title: task.trim()});
        if (data?.success){
            message.success(data.data);
            setTask("");
            fetchTasks();
        }
    } catch (error: any) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-5">
      <div className='flex gap-5'>
        <input
          type="text"
          placeholder="Add a task"
          className="bg-slate-900 rounded py-1 px-3  shadow w-full text-primary focus:outline-none focus:shadow-outline"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          type="primary"
          className="bg-slate-900"
          onClick={handleCreateTask}
          loading={loading}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
