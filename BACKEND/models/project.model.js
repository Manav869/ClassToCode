import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    specificTechStack:[{
        type:String
    }],
    budget:{
        type:Number,
        required:true,
        min: [0, 'Budget must be positive']
    },
    status:{
        type:String,
        enum:['not assigned','assigned','in development','delivered'],
        default:'not assigned'
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps:true});

export const Project = mongoose.model('Project', projectSchema);