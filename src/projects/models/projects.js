import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name : {
        type: String, 
        required: true
    }, 
    description: {
        type: String
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Projects = new mongoose.model('projects', schema)
export default Projects