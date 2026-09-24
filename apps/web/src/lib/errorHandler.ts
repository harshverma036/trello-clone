import { isAxiosError } from "axios"

export const getErrorMessage = (e: Error): string => {
  const msg = isAxiosError(e) ? e?.response?.data?.error?.message : e?.message

  return msg
}
