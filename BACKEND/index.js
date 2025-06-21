import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import studentRoute from "./routes/student.route.js"
import businessRoute from "./routes/business.route.js"
import projectRoute from "./routes/project.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

app.use('/api/v1/student',studentRoute);
app.use('/api/v1/business',businessRoute);
app.use('/api/v1/project',projectRoute);
app.use('/api/v1/application',applicationRoute);

let PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connectDb();
    console.log(`server is listening at port ${PORT}`);
    
})