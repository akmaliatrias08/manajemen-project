import { query } from "express";
import Projects from "./models/projects.js"; 

const projectsController = {}

projectsController.createProjects = async (req, res) => {
    try {
        const { name, description } = req.body

        //validation name project required
        if (!name) {
            res.status(400).json({
                code: 400, 
                message: "name is required"
            })
            return
        }
    
        const project = new Projects({
            name, 
            description
        })
    
        const createProject = await project.save()
        res.status(201).json({
            code: 201, 
            message: "success create",
            data: createProject
        })
        return
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message 
        });
        return
    }
}

projectsController.getAllProjects = async (req, res) => {
    try {
        const projects = await Projects.find().sort({ createdAt: 1 })
        res.status(200).json({
            code: 200, 
            message: "success",
            data: projects
        })
        return
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        });
        return
    }
}

projectsController.getOneProjects = async(req, res, projectId) => {
    try {
        const {id} = req.params

        const project = await Projects.findById(id)
        if (!project){
            res.status(404).json({
                code: 404, 
                message: "data not found"
            })
            return
        }

        res.status(200).json({
            code: 200, 
            message: "success",
            data: project
        })
        return
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        });
        return
    }
}

projectsController.updateProjectById = async(req, res) => {
    try {
        const {id} = req.params
        const {name, description} = req.body

        //validation name project required
        if (!name) {
            res.status(400).json({
                code: 400, 
                message: "name is required"
            })
            return
        }

        const updateProject = await Projects.findByIdAndUpdate(id, {name, description}, {new: true})
        if (!updateProject){
            res.status(404).json({
                code: 404, 
                message: "data not found"
            })
            return
        }
        res.status(200).json({
            code: 200, 
            message: "success update",
            data: updateProject
        })
        return
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message 
        });
        return
    }
}

projectsController.deleteProjectById = async(req, res) => {
    try {
        const {id} = req.params
        const deletedProject = await Projects.findByIdAndDelete(id);
        if (!deletedProject){
            res.status(404).json({
                code: 404, 
                message: "data not found"
            })
            return
        }

        res.status(200).json({
            code: 200, 
            message: "success delete",
        })
        return
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message 
        });
        return
    }
}

export default projectsController