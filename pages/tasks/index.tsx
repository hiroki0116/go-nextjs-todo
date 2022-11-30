import dynamic from "next/dynamic"
import AuthWrapper from "components/Auth/AuthWrapper"
import { TaskProvider } from "context/TaskContext"
const TaskMain = dynamic(() => import("components/Task/TaskMain"), { ssr: false })

const index = () => {
  return (
      <TaskProvider>
        <TaskMain />
      </TaskProvider>
  )
}

export default index