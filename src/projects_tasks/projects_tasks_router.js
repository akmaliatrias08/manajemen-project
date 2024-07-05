import express from "express"
import projectsTasksController from "./projects_tasks_controller.js"

const projectsTasksRoute = express.Router()

projectsTasksRoute.post("/projects/:projectId/tasks", projectsTasksController.createProjectsTask)
projectsTasksRoute.get("/projects/:projectId/tasks", projectsTasksController.getTasksByProjectId)
projectsTasksRoute.put("/tasks/:id", projectsTasksController.updateTaskById)
projectsTasksRoute.delete("/tasks/:id", projectsTasksController.deleteTaskById)


export default projectsTasksRoute