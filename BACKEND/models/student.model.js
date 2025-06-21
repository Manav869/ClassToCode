import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        rating:{
            type:Number,
            min:0,
            max:5,
            default:0
        },
        bio:{
            type:String
        },
        skills:[{
            type:String
        }],
        resume:{
            type:String
        },
        resumeOriginalName:{
            type:String
        },
        projectsLink:[{
            type:String
        }],
        profilePhoto:{
            type:String,
            default:""
        }

    },
},{timestamps:true})

export const Student = mongoose.model('Student', studentSchema);