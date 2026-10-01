import { useDroppable } from "@dnd-kit/react"

type DroppableProps = {
  id: string
  children: React.ReactElement
}

const Droppable = (props: DroppableProps) => {
  const { ref } = useDroppable({
    id: props?.id,
  })

  return <div ref={ref}>{props?.children}</div>
}

export default Droppable
