import Projects from "../projects/models/projects.js";
import Tasks from "./models/projects_tasks.js";
import { parse } from "date-fns"

const projectsTasksController = {}

const getOneProjectById = async(projectId) => {
    const project = await Projects.findById(projectId)
        if (!project){
           return false
        }
    return true
}

const getTasksProjectBetweenDate = async(projectId, id, startDate, endDate) => {
    try {
        const query = {
            projectId, 
            $or: [
                { startTime: { $lt: endDate }, endTime: { $gt: startDate } }
              ]
        }

        //if the id exist then find except the id that given
        if (id && id !== ""){
            query._id =  { $ne: id };
        }

        const getProjectTask = await Tasks.find(query)
        return getProjectTask
    } catch (error) {
        throw error
    }
}

const getOneTasksById = async(id) => {
    try {
        const task = await Tasks.findById(id);
        if (!task){
            return ""
        }

        return task
    } catch (error) {
        throw error
    }
    
}

projectsTasksController.createProjectsTask = async(req, res) => {
    try {
        const {projectId} = req.params
        const { title, description, startTime, endTime } = req.body;

        if (!title || !startTime || !endTime) {
            let property = !title ? "title" : !startTime ? "startTime" : !endTime ? "endTime" : ""
            
            return res.status(400).json({
                code: 400, 
                message: `${property} is required`
            })
        }

        //validation projectId is exist 
        const isExistProject = await getOneProjectById(projectId)
        if (!isExistProject){
            return res.status(404).json({
                code: 404, 
                message: "project id not found"
            })
        }

        //convert start_time and date_time with format yyyy-MM-dd HH:mm to ISO
        const parsedStartTime = parse(startTime, 'yyyy-MM-dd HH:mm', new Date());
        const parsedEndTime = parse(endTime, 'yyyy-MM-dd HH:mm', new Date());

        //validation start date is less than end date
        if (parsedStartTime >= parsedEndTime) {
            return res.status(400).json({ 
                code: 400,
                message: 'start time must be less than end time' 
            });
        }


        //validation the task within the project is not overlapping
        const tasksProjectBetweenDate = await getTasksProjectBetweenDate(projectId, "", parsedStartTime, parsedEndTime)
        if (tasksProjectBetweenDate.length > 0){
            return res.status(400).json({
                code: 400, 
                message: `task at startTime and Endtime in the same project already exist`
            })
        }

        const task = new Tasks({
            projectId,
            title,
            description,
            startTime: parsedStartTime,
            endTime: parsedEndTime
        })
  
        const createTask = await task.save();
        return res.status(201).json({
            code: 201, 
            message: "success create",
            data: createTask
        })
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: error.message 
        });
        
    }
}

projectsTasksController.getTasksByProjectId = async(req, res) => {
    try {
        const {projectId} = req.params

        //validation projectId is exist 
        const isExistProject = await getOneProjectById(projectId)
        if (!isExistProject){
            res.status(404).json({
                code: 404, 
                message: "project id not found"
            })
            return
        }

        const tasks = await Tasks.find({ projectId: projectId });
        res.status(200).json({
            code: 200, 
            message: "success",
            data: tasks
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

projectsTasksController.updateTaskById = async(req, res) => {
    try {
        const {id} = req.params
        const { title, description, startTime, endTime } = req.body;

        if (!title || !startTime || !endTime) {
            let property = !title ? "title" : !startTime ? "startTime" : !endTime ? "endTime" : ""
            
            res.status(400).json({
                code: 400, 
                message: `${property} is required`
            })
            return
        }

        //convert start_time and date_time with format yyyy-MM-dd HH:mm to ISO
        const parsedStartTime = parse(startTime, 'yyyy-MM-dd HH:mm', new Date());
        const parsedEndTime = parse(endTime, 'yyyy-MM-dd HH:mm', new Date());
    
        //validation start date is less than end date
        if (parsedStartTime >= parsedEndTime) {
            return res.status(400).json({ 
                code: 400,
                message: 'start time must be less than end time' 
            });
        }


        //validation task id exist to get the project id
        const task = await getOneTasksById(id)
        if(!task){
            return res.status(404).json({
                code: 404, 
                message: "data not found",
            })
        }

        //validation the task within the project is not overlapping
        const tasksProjectBetweenDate = await getTasksProjectBetweenDate(task.projectId, id, parsedStartTime, parsedEndTime)
        if (tasksProjectBetweenDate.length > 0){
            return res.status(400).json({
                code: 400, 
                message: `task at startTime and Endtime in the same project already exist`
            })
        }

        const updateTask = await Tasks.findByIdAndUpdate(
            id,
            { title, description, startTime: parsedStartTime, endTime: parsedEndTime },
            { new: true }
        );

        if(!updateTask){
            return res.status(404).json({
                code: 404, 
                message: "data not found",
            })
        }

        return res.status(200).json({
            code: 200, 
            message: "success update",
            data: updateTask
        })
    } catch (error) {
        return res.status(500).json({ 
            code: 500,
            message: error.message 
        });
    }
}

projectsTasksController.deleteTaskById = async(req, res) => {
    try {
        const {id} = req.params
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask){
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

export default projectsTasksController