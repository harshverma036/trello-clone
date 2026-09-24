import { type LoginSchema } from "@repo/schema/auth"
import api from "../api"

// interface iAuthApis {
//     login: () =>
// }

const authApis = {
  login: async (data: LoginSchema) => {
    const respo_data = await api.post("/api/auth/login", data)

    return respo_data;
  },
}

export default authApis
