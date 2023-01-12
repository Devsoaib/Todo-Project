const express = require('express');
const todoModel = require('../models/todoModel');


//create TODO
exports.createTodo = async (req, res)=>{
    const username = req.username;
    const { todoTitle, todoDescription, status, createdAt, updatedAt } = req.body;

    try {
        const createTodo = new todoModel({
            username:  username,
            todoTitle: todoTitle,
            todoDescription : todoDescription,
            status: status,
            createdAt: createdAt,
            updatedAt: updatedAt
        });
            const  todoCreated = await createTodo.save();
       
        res.status(201).send(todoCreated)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}; 

//Select Todo

exports.selectTodo =  (req,res)=>{
    const username = req.username;
    todoModel.find({username: username}, (err, data)=>{
        if(err){
            res.status(500).send({error: err})
        }else{
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
    
}

//Update Todo

exports.updateTodo = async (req,res)=>{
    
    const { todoTitle, todoDescription, _id } = req.body;

        todoModel.updateOne({_id: _id}, {$set:{
        todoTitle: todoTitle,
        todoDescription: todoDescription,
        updatedAt: Date.now()
    }}, {upsert: true}, (err, data)=>{
        if (err) {
            res.status(401).json({
                success: false,
                message: "TodoList is not updated"
            })
        }else{
            res.status(201).json({
                success: true,
                message: "TodoList updated successfully",
                data: data
            })
        }
    })
};


//UpdateStatus
exports.updateStatusTodo = (req,res)=>{
    
    const { status, _id } = req.body;

        todoModel.updateOne({_id: _id}, {$set:{
        status: status,
        updatedAt: Date.now()
    }},{upsert: true}, (err, data)=>{
        if (err) {
            res.status(401).json({
                success: false,
                message: "status is not updated"
            })
        }else{
            res.status(201).json({
                success: true,
                message: "status updated successfully",
                data: data
            })
        }
    })
};


//Remove Todo
exports.deleteTodo = (req,res)=>{
    
    const _id  = req.body;

        todoModel.remove({_id: _id},(err, data)=>{
        if (err) {
            res.status(401).json({
                success: false,
                message: "todo is not deleted"
            })
        }else{
            res.status(201).json({
                success: true,
                message: "Todo has been deleted successfully",
                data: data
            })
        }
    })
};

//Select Todo By status

exports.selectTodoByStatus =  (req,res)=>{
    const username = req.username;
    const status = req.body.status;
    todoModel.find({username: username, status: status}, (err, data)=>{
        if(err){
            res.status(500).send({error: err})
        }else{
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
    
}


//Select Todo By DateRange

exports.selectTodoByDate =  (req,res)=>{
    const username = req.username;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    
    todoModel.find({username: username, createdAt: {$gte:new Date(fromDate), $lte:new Date(toDate)}}, (err, data)=>{
        if(err){
            res.status(500).send({error: err})
        }else{
            res.status(200).json({
                success: true,
                data: data
            }) 
        }
    })
}