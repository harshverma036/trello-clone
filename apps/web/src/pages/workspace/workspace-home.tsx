import WorkspaceItem from "@/components/system/workspace/workspace-items"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const WorkspaceHome = () => {
  return (
    <div className="grid h-screen w-full grid-cols-8">
      <div className="flex flex-row p-4">
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="px-2.5 text-lg font-bold">My Workspace</p>
            <Button variant={"outline"} size={"icon-sm"}>
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
      <div className="col-span-6 p-4">asdf</div>
    </div>
  )
}

export { WorkspaceHome as Component }
