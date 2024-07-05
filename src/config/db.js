import mongoose from "mongoose";
import 'dotenv/config'

const dbConfigUrl = process.env.DB_URL
export const db = mongoose.connect(dbConfigUrl, {
    useNewUrlParser: true
})
.then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});