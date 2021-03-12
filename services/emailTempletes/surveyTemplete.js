
module.exports=(survey)=>{
    return `
        <html>
        <body>
            <div style="text-align:center">
            <h3>I'd like your input</h3>
            <p>PLEASE ANSWER THE FOLLOWING QUESTION:</p>
            <p>${survey.body}</p>
            <div>
                <a href="${process.env.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
            </div>
            <div>
                <a href="${process.env.redirectDomain}/api/surveys/${survey.id}/no">No</a>
            </div>
            </div>
        </body>
        </html>
    `;
}