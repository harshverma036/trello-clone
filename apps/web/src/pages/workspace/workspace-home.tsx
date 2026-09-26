import ProjectCard from "@/components/system/project/project-card"
import WorkspaceItem from "@/components/system/workspace/workspace-items"
import { Button } from "@/components/ui/button"
import { Home, Plus, Settings } from "lucide-react"

const WorkspaceHome = () => {
  return (
    <div className="grid h-screen w-full grid-cols-8">
      <div className="flex flex-row p-4">
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="px-2.5 text-2xl font-bold">Workspace</p>
            <Button variant={"outline"} size={"icon"}>
              <Plus />
            </Button>
          </div>
          <div className="mt-2">
            {Array.from({ length: 10 })?.map((item) => (
              <WorkspaceItem
                workspaceId={item as string}
                workspaceName="Testing workspace"
                status={true}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-7 p-4">
        <div className="mb-4 flex flex-row items-center justify-between">
          <p className="px-2.5 text-3xl font-bold">Projects</p>
          <Button variant={"outline"}>
            <Plus /> Add Project
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {Array.from({
            length: 10,
          })?.map((item, index) => (
            <ProjectCard
              id={item as string}
              key={item as string}
              name={`project_${index}`}
              active={true}
              description="This is description of the curent project"
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 border rounded-4 p-2 bg-card rounded-xl flex flex-row gap-1">
          <Button size='icon-lg' variant={'secondary'}>
            <Home />
          </Button>
          <Button size='icon-lg' variant={'ghost'}>
            <Settings />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { WorkspaceHome as Component }
