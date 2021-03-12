const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    googleId:{
        type:String
    }
});

mongoose.model('users',userSchema);
