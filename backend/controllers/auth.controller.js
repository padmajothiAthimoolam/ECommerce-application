import User from "../models/user.model.js";

export const signup = async (req,res) => {
 const { name, email, password} = req.body;
 try {

    const userExists = User.findOne({email});
    if(userExists) {
        return res.status(400).json({message: "The user already exists"});
    } 
    const user = await User.create({name, password, email});
    res.status(201).json({user, message: " User created successfully"})

 } catch(error) {
    res.status(500).json({message: error.message})
 }
   
}

export const login = async (req,res) => {
    res.send("Login Page")
}

export const logout = async (req,res) => {
    res.send("Logout Page")
}
