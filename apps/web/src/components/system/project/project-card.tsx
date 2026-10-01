import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, EllipsisVertical, Trash, UserPlus } from "lucide-react"
import { useNavigate } from "react-router"

type ProjectCardProps = {
  id: string
  name: string
  active: boolean
  description?: string
}

const ProjectCard = (props: ProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <Card
      className="w-full cursor-pointer hover:bg-gray-900"
      key={props?.id}
      onClick={() =>
        navigate(`/dashboard/project/1`, {
          replace: true,
        })
      }
    >
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <p>{props?.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="icon" variant={"outline"}>
                  <EllipsisVertical />
                </Button>
              }
            ></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPlus /> Invite
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>{props?.description || "-"}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
