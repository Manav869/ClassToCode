import {Business} from '../models/business.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js'
import getDataUri from "../utils/datauri.js";


export const register = async(req,res) =>{
    try {
        
        const {companyName,phoneNumber, email, description ,password, website, location} = req.body;
        if(!companyName || !phoneNumber || !email || !password || !location ||!website || !description){
            return res.status(400).json({
                message:"Some fields are missing",
                success:true
            })
        }

    
        const business = await Business.findOne({email});
        if(business){
            return res.status(400).json({
                message:"Company already registered"
            })
        }
        const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const hashedPassword = await bcrypt.hash(password,10);
    
        await Business.create({
                companyName,
                phoneNumber,
                email,
                password : hashedPassword,
                website,
                profile:{
                    location,
                    description,
                    logo: cloudResponse.secure_url,
                }
        });
    
        return res.status(201).json({
            message:"Business successfully registered",
            success:true
        })
    } catch (error) {
        console.log(error);        
    }
}

export const login = async(req,res) =>{
    try {
        
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Some fields are missing",
                success:false
            })
        
        }
        let business = await Business.findOne({email});
        if(!business){
            return res.status(400).json({
                message:"Business doesn't exist",
                success:false
            })
        }
    
        const isPasswordMatch = await bcrypt.compare(password,business.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"password doesn't match",
                success:false
            })
        }
        const tokenData = {
            userId : business._id
        }
    
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
    
        business = {
            _id:business._id,
            companyName:business.companyName,
            phoneNumber:business.phoneNumber,
            email:business.email,
            website:business.website,
            profile:business.profile
    
        }
        return res.status(200).cookie('token',token,{maxAge:24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`welcome back ${business.companyName}`,
            business,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie('token',"",{maxAge:0}).json({
            message:"Successfully logged out",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {companyName, email , phoneNumber , description, location} = req.body;
        const businessId = req.id;
        let business = await Business.findById(businessId);
        if(!business){
            return res.status(400).json({
                message:"Business not found",
                success:false
            })
        }

        if(companyName){business.companyName = companyName}
        if(email){business.email = email}
        if(phoneNumber){business.phoneNumber = phoneNumber}
        if(description){business.profile.description = description}
        if(location){business.profile.location = location}

        await business.save();

        business = {
            _id:business._id,
            companyName:business.companyName,
            phoneNumber:business.phoneNumber,
            email:business.email,
            website:business.website,
            profile:business.profile
        }

        return res.status(200).json({
            message:"Company Profile Updated Successfully",
            business,
            success:true
        })

    } catch (error) {
        console.log(error);       
    }
}