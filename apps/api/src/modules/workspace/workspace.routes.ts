import { Router } from "express";
import { WorkspaceController } from "./workspace.controller";

const workspaceRoutes: Router = Router();

workspaceRoutes.post("/create", WorkspaceController.create);
workspaceRoutes.put("/:id", WorkspaceController.update);
workspaceRoutes.delete("/:id", WorkspaceController.deleteById);
workspaceRoutes.get("/mine", WorkspaceController.getAllByUser);

export default workspaceRoutes