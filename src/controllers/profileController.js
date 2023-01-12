const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const usersModel = require('../models/profileModel');


//register
exports.insertUser = async (req, res)=>{
    const {username, email, password} = req.body;

    try {
      const hashedPass =  await bcrypt.hash(password, saltRounds);
        const insertUser = new usersModel({
            username:  username,
            email: email,
            password : hashedPass
        });
            const  userCreated = await insertUser.save();
       
        res.status(201).send(userCreated)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
};  

//login

exports.loginUser = async (req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await usersModel.findOne({username: username});

        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }, process.env.JWT_SECRET_KEY, { 
                        expiresIn: '1h' 
                    });
                    res.status(200).json({
                        token: token,
                        message: "user logged in successfully"
                    })
                }
                else{
                    res.status(401).json({
                        message: "wrong password"
                    })
                }
            });
        }
        else{
            res.status(401).json({
                message: "You are not a valid user"
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

//Select Profile
exports.getProfile =  (req,res)=>{
    const username = req.username;
    const id = req.id;
    const email = req.email;

    res.send({
        id: id,
        username: username,
        email: email
    })
}

//Update profile

exports.updateProfile =  async (req, res)=>{

  
        const username = req.username;
        const { email, password } = req.body;
        const hashedPass =  await bcrypt.hash(password, saltRounds);
        const updatedUser = usersModel.updateOne({username: username}, {$set: {
            email: email,
            password: hashedPass
        }}, {upsert: true}, (err, data)=>{
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Profile not found"
                })
            }else{
                res.status(201).json({
                    success: true,
                    message: "profile updated successfully",
                    data: data
                })
            }
        }); 
}