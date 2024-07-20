import { Request,Response } from "express";

import User from "../models/user"

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const  createCurrentUser = async (req:Request,res:Response) =>  {
    //1)check if user exist
    //2)create a user if doesn't exist 
    //3)return the user object to the calling client


      try{
        const {auth0Id} = req.body;

        const existingUser =  await User.findOne({auth0Id});
    
        if(existingUser){
            return res.status(200).send()
        }
        //Saving the new user 
        const newUser = new User(req.body)
        await newUser.save()
        // const new = req.body
       // const newUser = new User.create(new);
       res.status(201).json(newUser.toObject());//The 201 status code indicates that a resource has been successfully created on the server.
       //The newUser.toObject() method likely converts the newUser object (presumably a database record or model) into a plain JavaScript object (POJO) that can be safely serialized to JSON.
      }catch(error){
        return res.status(500).send("Interrnal error")
      }
  

}

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};


export default {
   getCurrentUser, createCurrentUser, updateCurrentUser
}



