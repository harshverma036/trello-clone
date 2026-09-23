import { useRouteError, isRouteErrorResponse } from "react-router"

const RootError = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error?.status} - {error?.statusText}
      </div>
    )
  } else if (error instanceof Error) {
    return <div>{error?.message}</div>
  } else {
    ;<div>Something went wrong, unknown error...</div>
  }
}

export default RootError
