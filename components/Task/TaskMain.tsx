import CreateTask from './CreateTask';
import ListTask from './ListTask';
const TaskMain = () => {
  return (
    <div className="max-w-lg mx-auto text-center bg-slate-900/80 rounded px-10 pt-5">
      <h2 className="text-primary font-extrabold text-lg">What&apos;s your plan today?</h2>
      <CreateTask />
      <ListTask />
    </div>
  )
}

export default TaskMain