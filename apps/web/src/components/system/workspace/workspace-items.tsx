import { Button } from "@/components/ui/button"

type WorkspaceItemProps = {
  workspaceId: string
  workspaceName: string
  status: boolean
}

const WorkspaceItem = (props: WorkspaceItemProps) => {
  return (
    <Button id={props?.workspaceId} disabled={!props?.status} variant={'ghost'} className={"w-full justify-start my-1 font-light"}>
      {props?.workspaceName}
    </Button>
  )
}

export default WorkspaceItem
