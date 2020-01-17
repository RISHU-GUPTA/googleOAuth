const express=require('express');
const passport=require('passport');
var bodyParser = require('body-parser');
const cookieSession=require('cookie-session');
const keys=require('./config/keys');
const app=express();
app.use(require('./utils/cors'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const googleSetup=require('./services/googlepassport');
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.cookieKey]
}));

app.use(passport.initialize());  //this uses googleSetup
app.use(passport.session());  //this uses cookieSession

app.use('/',require('./routes/user'));

//for heroku only
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(process.env.PORT||5555,()=>{
    console.log("server started....");
})