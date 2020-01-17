const mongoose=require('../db/connection');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    'username':{type:String},
    'googleId':{type:String},
    'pic':{type:String},
    'email':{type:String}
})
var User=mongoose.model('users',userSchema);
module.exports=User;