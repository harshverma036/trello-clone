import { useDraggable } from "@dnd-kit/react"

type DraggableProps = {
  id: string
  children: React.ReactElement
}

const Dragabble = (props: DraggableProps) => {
  const { ref } = useDraggable({
    id: props?.id,
  })

  return <button ref={ref}>{props?.children}</button>
}

export default Dragabble
