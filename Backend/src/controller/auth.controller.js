const express=require('express');

const User=require('../models/user.model');


function register(req,res){
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    User.findOne({email}).then(user=>{
        if(user){
            return res.status(400).json({message:"Email already exists"});
        }   
        const newUser=new User({email,name,password});
        newUser.save().then(user=>{
            const token=user.generateAuthToken();
            return res.status(201).json({token});
        }).catch(err=>{
            return res.status(500).json({message:"Error registering user",error:err.message});
        })
    }
    ).catch(err=>{
        return res.status(500).json({message:"Error registering user",error:err.message});
    })
}
module.exports={register};