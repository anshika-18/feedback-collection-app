import React,{Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {Link} from 'react-router-dom'
//Field helper for any type of html element by (redux-form)
import SurveyField from './surveyField'
import validateEmails from '../../utils/validateEmails'

class SurveryForm extends Component
{
    renderFields()
    {
        return(
            <div>
                <Field
                 label="Campaign Title" 
                 type="text" name="title" 
                 component={SurveyField} 
                 />

                <Field
                 label="Survey Line" 
                 type="text" name="subject" 
                 component={SurveyField} 
                 />
                  
                <Field
                 label="Email Body" 
                 type="text" name="body" 
                 component={SurveyField} 
                 />
                 
                  <Field
                 label="Recipient List" 
                 type="text" name="recipients" 
                 component={SurveyField} />
            </div>
        )
    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>             
            </div>
        )
    }
}

//values coming from form
function validate(values){
    const errors={};

    if(!values.title)
    {
        errors.title="you must provide a title"
    }
    if(!values.subject)
    {
        errors.subject="you must provide a subject"
    }
    if(!values.body)
    {
        errors.body="you must provide a body"
    }
    if(!values.recipients)
    {
        errors.recipients="you must provide a emails"
    }
    else
    {
        errors.recipients=validateEmails(values.recipients||'')
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveryForm);

