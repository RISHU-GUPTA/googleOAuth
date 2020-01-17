const passport=require('passport');
const User=require('../models/userschema');
const GoogleStrategy=require('passport-google-oauth2');
const keys=require('../config/keys');
//runs when to write data in cookie
passport.serializeUser((user,done)=>{
    var error=null;
    done(error,user);
});
//runs when to read data from cookie
passport.deserializeUser((userid,done)=>{
    console.log("user session is",userid.googleId);
    User.findById(userid).then(user=>{
        done(null,user);
    })
})
passport.use(new GoogleStrategy({
    callbackURL:"/google/welcome", //google returns here after auth
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    proxy:true,
},(accessToken,refreshToken,profile,done)=>{
console.log("call back url google...",profile,"Token is",accessToken);
User.findOne({googleId:profile.id}).then(currentUser=>{
    if(currentUser){
        console.log("user exist");
        done(null,currentUser);//call serialise
    }
    else{
    var userObject= new User({username:profile._json.name,
        googleId:profile.id,
    pic:profile._json.picture,email:profile._json.email});
    userObject.save().then(newUser=>{
        console.log("new user added");
        done(null,newUser);
    })
    }
})
// var userObject={
//     name:profile._json.name,
//     picture:profile._json.picture,
//     email:profile._json.email
// }
//done(null,userObject);
}));