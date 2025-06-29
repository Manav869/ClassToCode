import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});

export const Application = mongoose.model('Application',applicationSchema);