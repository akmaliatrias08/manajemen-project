import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    projectId : {
        type: Schema.Types.ObjectId, 
        ref: "Projects", 
        required: true
    }, 
    title : {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
    }, 
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Tasks = new mongoose.model('projects_tasks', schema)
export default Tasks

