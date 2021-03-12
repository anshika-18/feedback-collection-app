const _=require('lodash')
const {Path}=require('path-parser')
const {URL}=require('url')
const mongoose=require('mongoose')
const requireLogin=require('../middlewares/requireLogin')
const Mailer=require('../services/Mailer')
const surveyTemplete=require('../services/emailTempletes/surveyTemplete')

const Survey=mongoose.model('surveys')

module.exports=app=>{

    app.get('/api/surveys',requireLogin,async(req,res)=>{
       const surveys=await Survey.find({_user:req.user.id})
                                 .select({recipients:false})
       //do not select list of recipients
       res.send(surveys);
    })
    
    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
            res.send("Thanks for your feedback..!!")
    })

    app.post('/api/surveys/webhooks',(req,res)=>{

        const p=new Path('/api/surveys/:surveyId/:choice');
        const events=_.map(req.body,(event)=>{
            const pathname=new URL(event.url).pathname;
            //console.log(p.test(pathname));
            const match=p.test(pathname);
            if(match)
            {
                return {email:event.email,surveyId:match.surveyId,choice:match.choice};
            }
        })

        //remove undefined elements
        const  compactEvents=_.compact(events);
        const uniqueEvents=_.uniqBy(compactEvents,'email','surveyId')
        
        //console.log(uniqueEvents);
        uniqueEvents.forEach(event=>{
            Survey.updateOne({
                _id:event.surveyId,
                recipients:{
                    $elemMatch:{email:event.email,responded:false}
                }
            },{
                $inc:{[event.choice]:1},
                $set:{'recipients.$.responded':true}
            }).exec()
        })

        res.send({});
    })
    // for this user is logged in or not must be checked
    //list of recipients are comma seprated strings
    
    app.post('/api/surveys',requireLogin,async(req,res)=>{
        const{title,subject,body,recipients}=req.body;

        const survey=new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(',').map(email=>{
                 return{email:email.trim()}
            }),
            _user:req.user.id,
            dateSent:Date.now()
        })

        //now we have to send a email..!!
        //(object with subject and recipents,html to use inside body(content) of email)
        const mailer=new Mailer(survey,surveyTemplete(survey));
        try
        {
            await mailer.send();
            await survey.save();
            const user=await req.user.save();
            res.send(user);
        }
        catch(err)
        {
            res.status(422).send(err);
        }
        

    })
};