import { Student } from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;
    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({
        message: "some fields are missing",
        success: false,
      });
    }
    const student = await Student.findOne({ email });
    
    if (student) {
      return res.status(400).json({
        message: "Student already exist",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.create({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      profile:{
        profilePhoto: cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Profile successfully created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req,res) => {
    try {        
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(400).json({
                message: "some fields are missing",
                success: false,
            });
        }
        let student = await Student.findOne({email});
        if(!student){
            return res.status(400).json({
                message: "Student doesn't exist",
                success: false,
              });
        }
    
        const isPasswordMatch = await bcrypt.compare(password,student.password);
    
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'Password is incorrect',
                success:false
            })
        }
    
        const tokenData = {
            userId: student._id
        }
        
    
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
                
        student = {
            _id:student._id,
            fullName:student.fullName,
            phoneNumber:student.phoneNumber,
            email:student.email,
            profile:student.profile
        }
    
        return res.status(200).cookie('token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`welcome ${student.fullName}`,
            student,
            success:true
        })
    } catch (error) {
        console.log(error);     
    }
}

export const logout = async(req,res)=>{
    try {
       res.status(200).cookie('token',"",{maxAge:0}).json({
        message:"Logged Out successfully",
        success:true
       }) 
    } catch (error) {
       console.log(error);        
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullName, phoneNumber, email, bio, skills, projectsLink,id} = req.body;        
        console.log(projectsLink);
        
        let skillsArray;
        if(skills){
            skillsArray=skills.split(",").map(skills=>skills.trim()).filter(skills=>skills);
        }
        let projectLinksArray;
        if(projectsLink)
        {
          projectLinksArray=projectsLink.split(",").map(projectsLink=>projectsLink.trim()).filter(projectsLink=>projectsLink);
        }
        console.log(id);

        let cloudResponse;


        const file = req.file;


        if(file){

        const fileUri = getDataUri(file);
       cloudResponse = await cloudinary.uploader.upload(fileUri.content);}
        
    
        let student = await Student.findById(id);
        if(!student)
        {
            return res.status(400).json({
                message:"Student not found.",
                success:false
            })
        }
    
        if(fullName){student.fullName=fullName};
        if(phoneNumber){student.phoneNumber=phoneNumber};
        if(email){student.email=email};
        if(bio){student.profile.bio=bio};
        if(skills){student.profile.skills=skillsArray};
        if(projectsLink){student.profile.projectsLink=projectLinksArray};
        if(cloudResponse){
          student.profile.resume = cloudResponse.secure_url;
          student.profile.resumeOriginalName = file.originalname;
      }
    
        await student.save();
    
        student = {
            _id:student._id,
            fullName:student.fullName,
            phoneNumber:student.phoneNumber,
            email:student.email,
            profile:student.profile
        }
    
        return res.status(200).json({
            message:"Profile Updated Successfully",
            student,
            success:true
        })
        
    } catch (error) {
        console.log(error);        
    }

}