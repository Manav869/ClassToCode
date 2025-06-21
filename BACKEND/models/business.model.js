import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    companyName:{
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
    website:{
        type:String
    },
    profile:{
        description:{
            type:String,
        },
        location:{
            type:String,
        },
        logo:{
            type:String,
            default:''
        }
    }

},{timestamps:true})

export const Business = mongoose.model('Business',businessSchema);