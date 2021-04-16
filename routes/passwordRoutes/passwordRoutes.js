import express from 'express'
const router = express.Router()

import Password from '../../models/dbPasswords.js'
import User from '../../models/dbUser.js'
import {isAuth} from '../../util.js'

router.get("/:id/",isAuth, async (req,res)=>{
    const owner = await User.findOne({_id:req.params.id});
    if(owner){
        const passwords = await Password.find({owner:owner.username})

        res.send(passwords);
    }
    else{
        res.status(404).send("No such user using this platform")
    }
});

router.post("/",async(req,res)=>{
    const newPassword = new Password({
        title: req.body.title,
        owner: req.body.activeUser.username,
        password: req.body.password

    });
    const newPasswordCreated = await newPassword.save(function(err, password){
        if(err){
            res.status(400).send({message:"Unable to store new password"+err})
        } else{
            res.status(201).send({message:"New Password Created", data:newPasswordCreated})
        }
    })
})

router.put("/:id", async (req,res)=>{
    const passwordId = req.params.id;
    const password = await Password.findOne({_id:passwordId})
    if(password){
        password.title=req.body.title;
        password.password= req.body.password;
        const updatedPassword = await password.save();
        if (updatedPassword){
            return res.status(200).send({
                message:"password updated", data: updatedPassword
            })
        }
    }
    return res.status(500).send({message:'Error updating password'})
})

router.route("/:id").delete(async(req,res)=>{
    const passwordId = req.params.id;
    const deletedPassword = await Password.findById(passwordId);
    if(deletedPassword) {
        await deletedPassword.remove();
        res.send({message:'password deleted'})
    } else{
        res.send("Error deleting password")
    }
    
})
export default router