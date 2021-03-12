//emailregex
const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//we want to keep invalid email !re.test(email)
export default(emails)=>{
    const inavlidEmails=emails
        .split(',')
        .map(email=>email.trim())
        .filter(email => re.test(email)===false)
    if(inavlidEmails.length)
    {
        return `these emails are invalid: ${inavlidEmails}`
    }
    return;
}