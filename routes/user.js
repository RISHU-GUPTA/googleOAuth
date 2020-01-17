const route=require('express').Router();
const passport=require('passport');
const user=require('../models/userschema');
route.get('/google',passport.authenticate('google',{scope:['profile','email']}));

route.get('/google/welcome',passport.authenticate('google'),(req,res)=>{
    res.json({"user":req.user});
    console.log("req contains user info is",req.user);
   //res.send('welcome user'+req.user.username);
  
})

route.get('/api/current_user',(req,res)=>{
  res.send(req.user)
})

route.get('/api/logout',(req,res)=>{
  req.logout();
  res.send(req.user);
  //res.redirect('/')
})


module.exports=route;