import express from "express"
import projectsController from "./projects_controller.js"

const projectsRoute = express.Router()

projectsRoute.post("/projects", projectsController.createProjects)
projectsRoute.get("/projects", projectsController.getAllProjects)
projectsRoute.get("/projects/:id", projectsController.getOneProjects)
projectsRoute.put("/projects/:id", projectsController.updateProjectById)
projectsRoute.delete("/projects/:id", projectsController.deleteProjectById)

export default projectsRoute