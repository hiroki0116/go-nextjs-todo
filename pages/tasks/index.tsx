import dynamic from "next/dynamic"
import AuthWrapper from "components/Auth/AuthWrapper"
const TaskMain = dynamic(() => import("components/Task/TaskMain"), { ssr: false })

const index = () => {
  return (
    <AuthWrapper>
      <TaskMain />
    </AuthWrapper>
  )
}

export default index