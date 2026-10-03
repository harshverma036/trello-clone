import type { ReactNode } from "react"
import {
  CalendarDays,
  CheckSquare,
  MessageSquare,
  Paperclip,
  Pencil,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/react/sortable"

export type CardMember = { id: string; name: string; avatarUrl?: string }

export type ProjectTask = {
  id: string
  name: string
  members: CardMember[]
  attachmentsCount: number
  commentsCount: number
  completedTaskCount: number
  totalTaskCount: number
  createdAt: string | Date
  sequence: number
}

export interface ProjectCardStatusProps extends ProjectTask {
  maxAvatars?: number
  onClick?: () => void
  onEdit?: () => void
  className?: string
}

// "Oct 3" for this year, "Oct 3, 2025" for older dates
function formatDate(date: Date, withYear = false) {
  const showYear = withYear || date.getFullYear() !== new Date().getFullYear()
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: showYear ? "numeric" : undefined,
  })
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// Small icon + text chip used in the card footer
function MetaBadge({
  icon: Icon,
  label,
  className,
  children,
}: {
  icon: LucideIcon
  label: string
  className?: string
  children?: ReactNode
}) {
  return (
    <Badge
      variant="outline"
      title={label}
      aria-label={label}
      className={cn(
        "h-6 gap-1 rounded-sm border-0 px-1 text-xs font-normal text-inherit [&>svg]:size-3.5",
        className
      )}
    >
      <Icon aria-hidden />
      {children}
    </Badge>
  )
}

const ProjectTask = ({
  name,
  members,
  attachmentsCount,
  commentsCount,
  completedTaskCount,
  totalTaskCount,
  createdAt,
  maxAvatars = 3,
  onClick,
  onEdit,
  id,
  index,
  className,
}: ProjectCardStatusProps) => {
  const created = new Date(createdAt)
  const hasCreatedAt = !Number.isNaN(created.getTime())

  const hasTasks = totalTaskCount > 0
  const allTasksDone = hasTasks && completedTaskCount >= totalTaskCount

  const visibleMembers = members.slice(0, maxAvatars)
  const hiddenMembers = members.length - visibleMembers.length

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "task",
    accept: "task",
    group: id,
  })

  return (
    <div ref={ref} className={isDragging ? "opacity-60" : undefined}>
      <Card
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onClick()
          }
        }}
        className={cn(
          "group relative w-full cursor-pointer gap-0 overflow-hidden rounded-lg border-0 py-0",
          "bg-white text-[#172b4d] shadow-[0_1px_1px_#091e4240,0_0_1px_#091e424f]",
          "dark:bg-[#22272b] dark:text-[#b6c2cf]",
          "hover:ring-2 hover:ring-[#388bff]",
          "focus-visible:ring-2 focus-visible:ring-[#388bff] focus-visible:outline-none",
          className
        )}
      >
        {onEdit && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Edit card"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className={cn(
              "absolute top-1 right-1 z-10 h-7 w-7 rounded-full",
              "bg-white/90 text-[#44546f] hover:bg-[#f1f2f4] hover:text-[#172b4d]",
              "dark:bg-[#22272b]/90 dark:text-[#9fadbc] dark:hover:bg-[#2c333a] dark:hover:text-[#b6c2cf]",
              "opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            )}
          >
            <Pencil className="size-3.5" />
          </Button>
        )}

        <CardContent className="flex flex-col gap-1.5 px-3 py-2">
          <p className={cn("text-sm leading-5 break-words", onEdit && "pr-6")}>
            {name}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex flex-wrap items-center gap-0.5 text-[#44546f] dark:text-[#9fadbc]">
              {hasCreatedAt && (
                <MetaBadge
                  icon={CalendarDays}
                  label={`Created ${formatDate(created, true)}`}
                >
                  {formatDate(created)}
                </MetaBadge>
              )}

              {commentsCount > 0 && (
                <MetaBadge
                  icon={MessageSquare}
                  label={`${commentsCount} comments`}
                >
                  {commentsCount}
                </MetaBadge>
              )}

              {attachmentsCount > 0 && (
                <MetaBadge
                  icon={Paperclip}
                  label={`${attachmentsCount} attachments`}
                >
                  {attachmentsCount}
                </MetaBadge>
              )}

              {hasTasks && (
                <MetaBadge
                  icon={CheckSquare}
                  label={`${completedTaskCount} of ${totalTaskCount} tasks completed`}
                  className={
                    allTasksDone ? "bg-[#1f845a] text-white" : undefined
                  }
                >
                  {completedTaskCount}/{totalTaskCount}
                </MetaBadge>
              )}
            </div>

            {members.length > 0 && (
              <div className="ml-auto flex -space-x-1.5">
                {visibleMembers.map((member) => (
                  <Avatar
                    key={member.id}
                    title={member.name}
                    className="size-6 ring-2 ring-white dark:ring-[#22272b]"
                  >
                    {member.avatarUrl && (
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                    )}
                    <AvatarFallback className="bg-[#dfe1e6] text-[10px] font-semibold text-[#172b4d] dark:bg-[#454f59] dark:text-[#b6c2cf]">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}

                {hiddenMembers > 0 && (
                  <Avatar
                    title={members
                      .slice(maxAvatars)
                      .map((m) => m.name)
                      .join(", ")}
                    className="size-6 ring-2 ring-white dark:ring-[#22272b]"
                  >
                    <AvatarFallback className="bg-[#dfe1e6] text-[10px] font-semibold text-[#172b4d] dark:bg-[#454f59] dark:text-[#b6c2cf]">
                      +{hiddenMembers}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectTask
