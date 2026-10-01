type PropsProjectStatusCard = {
  projectStatusId: string
  text: string
  tasksCount: number
  sequence: number;
}

const ProjectStatusCard = (props: PropsProjectStatusCard) => {
  return (
    <div className="w-[200px] shrink-0 border border-gray-600">
      {props?.text}
    </div>
  )
}

export default ProjectStatusCard
