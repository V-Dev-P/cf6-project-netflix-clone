import { User } from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

//signup implementation - credentials check
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        // Validation 
        if (!email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" }); 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" }); 
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" }); // Consistent message format
        }

        const existingUserByEmail = await User.findOne({ email }); // Simplified
        if (existingUserByEmail) {
            return res.status(400).json({ message: "User with this email already exists" }); 
        }

        const existingUserByUsername = await User.findOne({ username }); 
        if (existingUserByUsername) {
            return res.status(400).json({ message: "User with this username already exists" }); 
        }

        // Password Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Image Selection random
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Create New User
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        });

        // Save User 
        const savedUser = await newUser.save(); 

        // Generate Token Cookie 
        generateTokenAndSetCookie(savedUser._id, res); 

        // Successful Response 
        res.status(201).json({
            message: "User created successfully", 
            user: {
                ...savedUser._doc, // Send the complete saved user data without password
                password: "",         
            },
        });

    } catch (error) {
        console.error("Signup Error:", error); 

        
        if (error.name === 'ValidationError') { 
            res.status(400).json({ message: error.message });
        } else if (error.code === 11000) { 
            res.status(400).json({ message: "Username or email already exists" });
        }
        else {
            res.status(500).json({ message: "Internal server error" }); 
        }
    }
}
//login implementation - credentials check
export async function login(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({success:false, message:"All fields are required"});
        }

        const user = await User.findOne({email:email})
        if (!user){
            return res.status(404).json({success:false, message:"Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            success:true,
            user:{
                ...user._doc,
                password:"",
            },
        })
    } catch (error) {
      console.log("Error in login controller:", error.message);  
      res.status(500).json({success:false, message:"Internal server error"});
    }
}
//logout implementation
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message:"Logged out successfully"});    
    } catch (error) {
        console.log("Error in logout controller:", error.message); 
        res.status(500).json({success:false, message:"Internal server error"});
        
    }
}
//user authentication check from req.user
export async function authCheck(req, res) {
    try {
        console.log("req.user:", req.user);
        res.status(200).json({success:true, user:req.user});
    } catch (error) {
        console.log("Error in authCheck controller:", error.message); 
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

