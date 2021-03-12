require('dotenv').config();

const passport=require("passport");
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');

const user=mongoose.model('users')

passport.serializeUser((user,done)=>{
    //user.id is identifying piece of info
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    user.findById(id)
        .then((user)=>{
            done(null,user)
        })
})

// new GoogleStrategy()- This creates a new instance of Google Auth strategy
//client id and cliend secret are two arguments to GoogleStrategy

passport.use(new GoogleStrategy({
    clientID:process.env.googleClientID,
    clientSecret:process.env.googleClientSecret,
    callbackURL:'http://localhost:5000/auth/google/callback',
    proxy:true
    },
    async (accessToken,refreshToken,profile,done)=>{
        
        console.log(profile)
        const existingUser=await user.findOne({googleId:profile.id})
            if(existingUser)
            {
                //already exit
                // error , user record
                return done(null,existingUser);
            }
                //create new user     
                const created_user=await new user({
                    googleId:profile.id
                }).save()
                
                done(null,created_user)     
    })
);