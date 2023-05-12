import dynamic from "next/dynamic";
import { TaskProvider } from "features/task/store/TaskContext";
const TaskMain = dynamic(() => import("features/task/components/TaskMain"), {
  ssr: false,
});

const index = () => {
  return (
    <TaskProvider>
      <TaskMain />
    </TaskProvider>
  );
};

export default index;
