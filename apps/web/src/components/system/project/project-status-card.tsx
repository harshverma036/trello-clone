import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus } from "lucide-react"
import { useState } from "react"
import ProjectTask, {
  type ProjectTask as ProjectTaskType,
} from "./project-task"

type PropsProjectStatusCard = {
  projectStatusId: string
  text: string
  tasksCount: number
  sequence: number
  tasks: ProjectTaskType[]
}

const ProjectStatusCard = (props: PropsProjectStatusCard) => {
  const [statusName, setStatusName] = useState<string>(props.text)

  return (
    <div className="flex max-h-full w-[272px] shrink-0 flex-col self-start rounded-xl bg-[#f1f2f4] pb-2 shadow-sm dark:bg-[#101204]">
      {/* Header */}
      <div className="flex items-center gap-1 px-2 pt-2 pb-1">
        <Input
          type="text"
          name="project-status-name"
          id="project-status-name"
          value={statusName}
          onChange={(e) => setStatusName(e.target.value)}
          onBlur={() => setStatusName((s) => s.trim())}
          className="h-8 min-w-0 flex-1 rounded-md border-0 bg-transparent px-2 text-sm font-semibold text-[#172b4d] shadow-none hover:bg-black/5 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none dark:bg-transparent dark:text-[#b6c2cf] dark:hover:bg-white/10"
        />
        <button
          type="button"
          aria-label="List actions"
          className="grid size-8 shrink-0 place-items-center rounded-md text-[#44546f] hover:bg-black/10 dark:text-[#9fadbc] dark:hover:bg-white/10"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {/* Cards: no provider, no local state, just render what the parent gives */}
      <ol className="flex flex-col gap-2 overflow-y-auto px-2 py-1">
        {props.tasks.map((task, index) => (
          <ProjectTask key={task.id} {...task} />
        ))}
      </ol>

      {/* Footer */}
      <button
        type="button"
        className="mx-2 mt-1 flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium text-[#44546f] hover:bg-black/10 dark:text-[#9fadbc] dark:hover:bg-white/10"
      >
        <Plus className="size-4" />
        Add a card
      </button>
    </div>
  )
}

export default ProjectStatusCard
