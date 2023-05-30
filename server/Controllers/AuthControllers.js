const UserModel = require("../Models/UserModel");
const AdminModel = require("../Models/AdminModel")
const jwt = require("jsonwebtoken")
const fs =  require('fs')
const maxAge = 3 * 24 * 60 * 60;
const path = require("path")

const createToken = (id) => {
    return jwt.sign({ id },"Secret Key", {
        expiresIn: maxAge,
    })
}

const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.message === "incorrect Email")
        errors.email = "Email is not registered"
    
        if (err.message === "incorrect Password")
        errors.email = "Password is incorrect"

    if (err.code === 11000) {
        errors.email = "Email is already registered"
        return errors
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.create({email,password})
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge:maxAge * 1000
        })
        res.status(201).json({user:user,created:true})
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
};

module.exports.login = async (req, res, next) => { 
    try {
        const { email, password } = req.body
        const user = await UserModel.login(email,password)
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge:maxAge * 1000
        })
        res.status(200).json({user:user,created:true})
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
};

module.exports.updateImage = async (req, res, next) => {
    try {
        const userId = req.body.userId
        const imageUrl = req.file.filename
        const alreadyImage = await UserModel.findOne({ _id: userId })
        if(alreadyImage.image !== undefined) {
            fs.unlink(path.join(__dirname, "../..public/public/images/", alreadyImage.image), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("image deleted")
                }
            })
        }

        const image = await UserModel.updateOne({ _id: userId }, { $set: { image: imageUrl } }).then((res) => {
        }).catch((err) => {
            console.log(err);
        })
        res.status(201).json({ updated: true, imageUrl: imageUrl,user:alreadyImage })

    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
}

module.exports.adminLogin = async (req,res,next)=>{
    try {
        const {email,password} = req.body
        const admin = await AdminModel.findOne({email:email})
        if(!admin){
            res.json({message:"Incorrect email"})
        }else{
            if (admin.password === password) {
                const token = createToken(admin._id)
                res.cookie("adminjwt",token,{
                    withcredential:true,
                    httpOnly:false,
                    maxAge:maxAge*1000,
                })
                res.status(200).json({adminId:admin._id,token})
            }else{
                console.log("password is wrong");
                res.json({message:"Incorrect password"})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllUsers = async (req,res,next)=>{
    try {
       const allUser = await UserModel.find({})
       res.status(200).json({data:allUser})
    } catch (error) {
       console.log(error);
    }
}

module.exports.deleteUser = async(req,res,next) =>{
    try {
        const userId = req.params.id
        await UserModel.deleteOne({_id:userId}).then(()=>{
            res.status(200).json({deleted:true})
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.editUser = async(req,res,next)=>{
    try {
        const {id,email} = req.body
        await UserModel.updateOne({_id:id},{$set:{email:email}})
        res.status(200).json({updated:true})
    } catch (error) {
       console.log(error); 
    }
}