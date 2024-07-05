import express from 'express';
import bodyParser from "body-parser"
import 'dotenv/config'
import { db } from "./src/config/db.js"

//import route
import projectsRoute from "./src/projects/projects_router.js"
import projectsTasksRoute from './src/projects_tasks/projects_tasks_router.js';

const app = express();
const PORT = process.env.APP_PORT; 

//middleware
app.use(bodyParser.json());

//route declare
app.use('/', projectsRoute)
app.use('/', projectsTasksRoute)


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
