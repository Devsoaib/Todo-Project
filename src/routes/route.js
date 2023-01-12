const express = require('express');
const { insertUser, loginUser, getProfile, updateProfile } = require('../controllers/profileController');
const { createTodo, selectTodo, updateTodo, deleteTodo, selectTodoByStatus, selectTodoByDate } = require('../controllers/todoCotroller');
const checkLogin = require("../middlewares/checkLogin")
const router =  express.Router();

router.get("/", (req, res)=>{
    res.send(`hello js`)
})


//users Route   
router.post("/register", insertUser);
router.post("/login", loginUser);
router.get("/profile",checkLogin, getProfile)
router.post("/updateProfile",checkLogin, updateProfile);


//Todo routes
router.post("/createTodo",checkLogin, createTodo);
router.get("/selectTodo",checkLogin, selectTodo);
router.post("/updateTodo",checkLogin, updateTodo);
router.post("/updateStatusTodo",checkLogin, updateTodo);
router.post("/deleteTodo",checkLogin, deleteTodo);
router.get("/selectTodoByStatus",checkLogin, selectTodoByStatus);
router.get("/selectTodoByDate",checkLogin, selectTodoByDate);


module.exports = router;