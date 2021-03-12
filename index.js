const express=require("express");
const mongoose=require("mongoose")
const cookieSession=require("cookie-session")
const passport=require("passport")
const cors=require("cors")
const bodyParser=require('body-parser')
require('./models/user')
require('./models/survey')
require("./services/passport")

mongoose.connect(process.env.MONGO_URL)

const app=express();
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
//max age 30 days in microseconds

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[process.env.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/surveyRoutes')(app);


const PORT=process.env.PORT||5000;
app.listen(PORT,(err)=>{
    if(err) console.log(err)
})
