import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/// new user register
/// public route
/// post req
/// api/user/

export const userRegister = ('/', asyncHandler(async(req, res) =>{
    const {name,email} = req.body
 
   
const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash(req.body.password, salt);

const user= await User.create({name,email, password})

if (user) {
    const token = jwt.sign({ id: user._id , email: user.email, role: user.role}, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                });
    res.json({
                    id: user._id,
                    name,
                    email,
                    image: user.image,
                    isAdmin: user.isAdmin,
                    role: user.role,
                    token : token
                    
                })
    
}

   
}))

/// user login auth 
/// public route
/// api/user/login
export const userAuth= ('/login', asyncHandler(async (req, res)=> {
    const {email, password} = req.body
    try {
        const user=await User.findOne({email})
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
    
                if (user) {
                    const token = jwt.sign({ id: user._id , email: user.email, role: user.role,}, process.env.JWT_SECRET, {
                        expiresIn: '30d'
                    });
                    res.json({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        isAdmin: user.isAdmin,
                        role: user.role,
                        level: user.level,
                        token : token
                        
                    })
                    
                }else{
                    throw new Error('Invalid email or password')
                    
                }
            }else{
                res.status(401)
                console.error('Invalid email or password')
                res.json('invalid email or password')
                

            }
         }) 
        
        
    } catch (error) {
        throw new Error('invalid email or password')
    }
    
    
}))


/// get logged in user profile
/// private route
/// api/user/profile

export const getUser = ('/profile', asyncHandler(async(req, res) =>{

    const user= await User.findById(req.user._id, '-password')
   
    if (user) {
       
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get users list by admin
/// private route
/// get req
/// api/user/

export const getUsersList = ('/', asyncHandler(async(req, res) =>{
if (!req.user.isAdmin) {
    res.statusCode(401).json({success:false})
    return
}
    const users= await User.find({isAdmin: {$ne: req.user.isAdmin}}).select('-password')
   
    if (users) {
       
        res.json(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// logged in user profile update
/// private route
/// api/user/profile/update

export const updateMyProfile = ('/profile/update', asyncHandler(async(req, res) =>{
 
    const user= await User.findOneAndUpdate({_id:req.user._id}, req.body.changedField )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


///  user profile update by admin
/// private route
/// api/user/roleupdate

export const userUpdate = ('/roleupdate/:id', asyncHandler(async(req, res) =>{
 
    const user= await User.findOneAndUpdate({_id:req.params.id}, {role: req.body.role} )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get  user profile by id
/// public route
/// api/user/:id

export const getProfileById = ('/:id', asyncHandler(async(req, res) =>{
    
    const user= await User.findById(req.params.id,'-password');
   
    if (user) {
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))