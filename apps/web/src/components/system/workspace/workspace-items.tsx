import { Button } from "@/components/ui/button"

type WorkspaceItemProps = {
  workspaceId: string
  workspaceName: string
  status: boolean
}

const WorkspaceItem = (props: WorkspaceItemProps) => {
  return (
    <Button
      id={props?.workspaceId}
      disabled={!props?.status}
      variant={"ghost"}
      className={"my-1 w-full justify-start font-light text-lg"}
      size={"lg"}
    >
      {props?.workspaceName}
    </Button>
  )
}

export default WorkspaceItem
