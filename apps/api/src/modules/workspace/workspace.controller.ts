import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@repo/schema/workspace";
import type { Request, Response } from "express";
import { WorkspaceService } from "./workspace.service";

export class WorkspaceController {
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const validatePayload = createWorkspaceSchema.safeParse(req?.body);

      if (!validatePayload?.success) {
        return res.status(422).json({
          success: false,
          message: JSON.parse(validatePayload?.error as any),
          data: validatePayload?.data,
        });
      }

      const execute = await WorkspaceService.create(
        validatePayload?.data,
        req.user.user_id,
      );

      return res.status(201).json(execute);
    } catch (error) {
      console.error(error);
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const validatePayload = updateWorkspaceSchema.safeParse(req?.body);

      if (!validatePayload?.success) {
        return res.status(422).json({
          success: false,
          message: JSON.parse(validatePayload?.error as any),
          data: validatePayload?.data,
        });
      }

      //   todo: define and check any string type not working.
      const id: any = req?.params?.id;

      const execute = await WorkspaceService.updateById(
        id,
        validatePayload?.data,
      );

      return res.status(201).json(execute);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteById(req: Request, res: Response): Promise<any> {
    try {
      //   todo: define and check any string type not working.
      const id: any = req?.params?.id;

      const execute = await WorkspaceService.deleteById(id);

      return res.status(200).json(execute);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllByUser(req: Request, res: Response): Promise<any> {
    try {
      const execute = await WorkspaceService.getAllByUser(req?.user?.user_id);

      return res.status(200).json(execute);
    } catch (error) {
      console.error(error);
    }
  }
}
