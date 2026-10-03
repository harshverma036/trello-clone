import { useRef, useState } from "react"
import { useParams } from "react-router"
import { DragDropProvider } from "@dnd-kit/react"
import { move } from "@dnd-kit/helpers"
import SortableStatus from "@/components/system/project/sortable-status"
import { dummyProjectStatusData } from "@/components/system/project/dummy-data"

type UrlParam = {
  projectId: string
}

type Task = (typeof dummyProjectStatusData)[number]["tasks"][number]
type TaskMap = Record<string, Task[]>

// recompute each task's sequence from its position in its column
const resequence = (map: TaskMap): TaskMap =>
  Object.fromEntries(
    Object.entries(map).map(([columnId, list]) => [
      columnId,
      list.map((task, i) => ({ ...task, sequence: i + 1 })),
    ])
  )

const Project = () => {
  const params = useParams<UrlParam>()

  // column order. Ignore column.tasks after this: render tasks from the `tasks` state below
  const [columns, setColumns] = useState(() =>
    [...dummyProjectStatusData].sort((a, b) => a.sequence - b.sequence)
  )

  // { [columnId]: Task[] }: the shape `move` expects; keys must match each task's `group`
  const [tasks, setTasks] = useState<TaskMap>(() =>
    Object.fromEntries(dummyProjectStatusData.map((c) => [c.id, c.tasks ?? []]))
  )

  // tasks as they were when the drag started, restored if the drag is cancelled (Esc)
  const snapshot = useRef(tasks)

  return (
    <div className="h-screen md:p-4">
      <div className="flex h-full flex-row items-start gap-3 overflow-x-auto">
        <DragDropProvider
          onDragStart={() => {
            snapshot.current = tasks
          }}
          onDragOver={(event) => {
            // tasks move live so they can jump between columns; columns wait for the drop
            if (event.operation.source?.type === "column") return
            setTasks((prev) => move(prev, event))
          }}
          onDragEnd={(event) => {
            const { source } = event.operation

            if (event.canceled) {
              if (source?.type === "task") setTasks(snapshot.current)
              return
            }

            if (source?.type === "column") {
              setColumns((prev) =>
                move(prev, event).map((col, i) => ({ ...col, sequence: i + 1 }))
              )
            } else {
              setTasks(resequence)
            }
          }}
        >
          {columns.map((column, index) => (
            <SortableStatus
              key={column.id}
              id={column.id}
              index={index}
              title={column.title}
              taskCount={tasks[column.id]?.length ?? 0}
              sequence={column.sequence}
              tasks={tasks[column.id] ?? []}
            />
          ))}
        </DragDropProvider>
      </div>
    </div>
  )
}

export { Project as Component }
