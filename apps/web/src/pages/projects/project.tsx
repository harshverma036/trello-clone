import ProjectStatusCard from "@/components/system/project/project-status-card"
import { useParams } from "react-router"
import { DragDropProvider } from "@dnd-kit/react"
import Dragabble from "@/components/system/project/draggable"
import Droppable from "@/components/system/project/droppable"
import { useState } from "react"

type UrlParam = {
  projectId: string
}
//   dummy data
const dummyProjectStatusData = [
  {
    id: "1",
    title: "In Progress",
    taskCount: 5,
    sequence: 1,
  },
  {
    id: "2",
    title: "Development",
    taskCount: 3,
    sequence: 2,
  },
  {
    id: "3",
    title: "Testing",
    taskCount: 8,
    sequence: 3,
  },
  {
    id: "4",
    title: "Deployed",
    taskCount: 1,
    sequence: 4,
  },
]

const Project = () => {
  const params = useParams<UrlParam>()

  const [dummyProjectData, setDummyProjectData] = useState(
    dummyProjectStatusData
  )

  return (
    <div className="h-screen bg-green-600">
      <div className="flex h-full flex-row gap-3 overflow-x-auto">
        <DragDropProvider
          onDragEnd={(event) => {
            const dropendid = event?.operation?.target?.id
            const dropstartid = event?.operation?.source?.id

            setDummyProjectData((prev) => {
              const source = prev.find((e) => e?.id === dropstartid)
              const target = prev.find((e) => e?.id === dropendid)

              if (!source || !target) return

              return prev.map((s) => {
                if (s.id === dropstartid)
                  return { ...s, sequence: target?.sequence }
                if (s.id === dropendid)
                  return { ...s, sequence: source?.sequence }

                return s
              })
            })
            // console.log(event?.operation?.target?.id)
            // setDroppedId(event?.operation?.target?.id as string)
            // // update the setdummyprojectsdata;
            // const findStartNode = dummyProjectData?.findIndex(
            //   (e) => e?.id === dropstartid
            // )
            // const findEndNode = dummyProjectData?.findIndex(
            //   (e) => e?.id === dropendid
            // )

            // const final_data = [...dummyProjectData]

            // // final_data[findStartNode].sequence = dummyProjectData?.[findEndNode]?.sequence;
            // final_data[findEndNode].sequence =
            //   dummyProjectData?.[findStartNode].sequence

            // console.log(final_data, dummyProjectData)
          }}
        >
          {dummyProjectData
            ?.sort((a, b) => a.sequence - b.sequence)
            ?.map((item, index) => (
              <Dragabble id={item?.id}>
                <Droppable id={item?.id}>
                  <ProjectStatusCard
                    sequence={item?.sequence}
                    key={index}
                    projectStatusId={item?.id}
                    tasksCount={item?.taskCount}
                    text={`${item?.title}-${item?.id}`}
                  />
                </Droppable>
              </Dragabble>
            ))}
        </DragDropProvider>
      </div>
    </div>
  )
}

export { Project as Component }
