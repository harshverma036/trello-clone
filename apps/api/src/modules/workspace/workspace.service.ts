import db from "@repo/db";
import {
  type CreateWorkspaceSchema,
  type UpdateWorkspaceSchema,
} from "@repo/schema/workspace";

export class WorkspaceService {
  static async create(
    data: CreateWorkspaceSchema,
    user_id: string,
  ): Promise<any> {
    try {
      // check for name duplication
      const isNameExists = await db.workspace.findFirst({
        where: {
          user_id: user_id,
          name: {
            equals: data?.name,
            mode: "insensitive",
          },
        },
      });

      if (isNameExists) {
        throw new Error("This workspace already exists!");
      }

      //   create workspace
      const nWorkspace = await db.workspace.create({
        data: {
          ...data,
          description: data?.description ?? null,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });

      return {
        success: true,
        data: nWorkspace,
        message: "Workspace created sucessfully",
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteById(id: string): Promise<any> {
    try {
      const fWorkspace = await db.workspace.findUnique({
        where: {
          id,
        },
      });

      if (!fWorkspace) {
        throw new Error("Workspace does not exists!");
      }

      // deactive the workspace
      const dWorkspace = await db.workspace.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });

      return {
        success: true,
        data: dWorkspace,
        message: `${fWorkspace?.name} deleted successfully`,
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async updateById(
    id: string,
    data: UpdateWorkspaceSchema,
  ): Promise<any> {
    try {
      const fWorkspace = await db.workspace.findUnique({
        where: {
          id,
        },
      });

      if (!fWorkspace) {
        throw new Error("Workspace does not exists!");
      }

      // deactive the workspace
      const dWorkspace = await db.workspace.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });

      return {
        success: true,
        data: dWorkspace,
        message: `${fWorkspace?.name} deleted successfully`,
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllByUser(user_id: string): Promise<any> {
    try {
      const fWorkspaces = await db.workspace.findMany({
        where: {
          user_id,
          active: true,
        },
      });

      return {
        success: true,
        data: fWorkspaces,
        message: `Workspaces fetched!`,
      };
    } catch (error) {}
  }
}
