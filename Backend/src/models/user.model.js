const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password must be at least 6 characters long"]
    },
},{
    timestamps:true

    
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const hash=await bcrypt.hash(this.password,12);
    this.password=hash;
    return next();
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.method.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}
const User=mongoose.model('User',userSchema);

module.exports=User;