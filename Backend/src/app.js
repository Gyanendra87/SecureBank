const express=require('express');
const app=express();
const connectiondb=require('./config/db');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth.routes');
app.use("/api/auth",authRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
// Connect to the database
connectiondb();




module.exports=app;