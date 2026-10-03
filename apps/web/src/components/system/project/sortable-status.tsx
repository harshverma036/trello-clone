import { useSortable } from "@dnd-kit/react/sortable"
import { CollisionPriority } from "@dnd-kit/abstract"
import ProjectStatusCard from "./project-status-card"
import type { ProjectTask } from "./project-task"

type Props = {
  id: string
  index: number
  title: string
  taskCount: number
  sequence: number
  tasks: ProjectTask[]
}

export default function SortableStatus({
  id,
  index,
  title,
  taskCount,
  sequence,
  tasks,
}: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "column",
    accept: ["column", "task"],
    collisionPriority: CollisionPriority.Low,
  })

  return (
    <div ref={ref} className={isDragging ? "opacity-60" : undefined}>
      <ProjectStatusCard
        sequence={sequence}
        projectStatusId={id}
        tasksCount={taskCount}
        text={`${title}-${id}`}
        tasks={tasks}
      />
    </div>
  )
}
