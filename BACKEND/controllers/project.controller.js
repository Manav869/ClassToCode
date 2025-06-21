import {Project} from '../models/project.model.js'

export const postProject = async(req,res) => {
    try {
        
        const {title, description , duration, budget, specificTechStack} = req.body;
        const {businessId} = req.body;
        if(!title || !description || !duration || !budget ){
            return res.status(400).json({
                message:"Some field is missing",
                success:false
            })
        }
        let specificTechStackArray;
        if(specificTechStack){
            specificTechStackArray=specificTechStack.split(",").map(specificTechStack=>specificTechStack.trim()).filter(specificTechStack=>specificTechStack);
        }
    
        let project = await Project.create({
            title,
            description,
            duration,
            budget,
            business:businessId
        })
    
        if(specificTechStack){
            project.specificTechStack=specificTechStackArray;
        }
    
        await project.save();

        project = {
            title:project.title,
            _id:project._id,
            description:project.description,
            duration:project.duration,
            budget:project.budget,
            business:project.business
        }
    
        return res.status(200).json({
            message:"Project posted successfully",
            project,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllProjects = async(req,res)=>{
    try {        
        const projects = await Project.find().populate({
            path:'business'
        });
        if(!projects){
            return res.status(400).json({
                message:"No projects found",
                success:false
            })
        }
        return res.status(200).json({
            projects,
            success:true
        })
    } catch (error) {
        console.log(error);        
    }
}

export const getSpecificBusinessProjects = async(req,res)=>{
    try {
        const {businessId} = req.body;
        const projects = await Project.find({business:businessId});
        if(!projects){
            return res.status(404).json({
                message:"No projects found",
                success:false
            })
        }
        return res.status(200).json({
            projects,
            success:true
        })
    } catch (error) {
        console.log(error);        
    }
}

export const getProjectById = async(req,res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:'applications'
        });
        if(!project){
            return res.status(400).json({
                message:"Project not found.",
                success:false
            })
        }
        return res.status(200).json({project,success:true});
    } catch (error) {
        console.log(error);        
    }
}
