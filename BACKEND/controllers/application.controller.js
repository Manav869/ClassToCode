import {Application} from '../models/application.model.js';
import { Project } from '../models/project.model.js';

export const applyProject = async(req,res)=>{
    try {        
        const {userId} = req.body;
        
        const projectId = req.params.id;
        if(!projectId){
            return res.status(400).json({
                message:"Project Id is required",
                success:false
            })
        }
        const alreadyApplied = await Application.findOne({applicant:userId, project:projectId});
        if(alreadyApplied){
            
            return res.status(400).json({
                
                message:"You have already applied for this project",
                success:false
            })
        }
        let project = await Project.findById(projectId);
        if(!project){
            return res.status(400).json({
                message:"Project doesnot exist",
                success:false
            })
        }
    
        const application = await Application.create({
            applicant:userId,
            project:projectId
        })
        project.applications.push(application);
        await project.save();
    
        return res.status(200).json({
            message:"You have successfully Applied for this Project",
            status:true
        })
    } catch (error) {
        console.log(error);        
    }
}

export const getApplicants = async (req,res)=>{
    try {
        
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!project){
            return res.status(400).json({
                message:"project doesnot exist",
                success:false
            })
        }
        return res.status(200).json({
            project,
            success:true
        })
    } catch (error) {
        console.log(error);       
    }
}

export const getAppliedProjects = async(req,res)=>{
    try {
        const {userId} = req.body;
        
        
        const projects = await Application.find({applicant:userId}).populate({
            path:'project',
            options:{sort:{createdAt:-1}},
            populate:{path:'business'}
        })
        if(!projects){
            return res.status(400).json({
                message:"project doesnot exist",
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

export const updateStatus = async (req,res) => {
    try {       
        const applicationId = req.params.id;
        const {status} = req.body;
        const application = await  Application.findById(applicationId).populate({
            path:'project'
        })
        if(!application){
            return res.status(400).json({
                message:"application doesnot exist",
                success:false
            })  
        }
    
        const projectId = application.project._id;
    
        const project = await  Project.findById(projectId);
    
        application.status = status.toLowerCase();
        await application.save();
        if(status.toLowerCase() == 'accepted' )
        {
            project.status = 'assigned';
            await project.save();
        }
        return res.status(200).json({
            message:'status successfully updated',
            success:true
        })
    } catch (error) {
        console.log(error);        
    }
}
