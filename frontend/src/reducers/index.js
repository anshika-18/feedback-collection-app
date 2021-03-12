import {combineReducers} from 'redux'
import {reducer as reduxForm} from 'redux-form'
import authReducer from './authReducer'
import surveyReducers from './surveyReducers'

export default combineReducers({
    auth:authReducer,
    form:reduxForm,
    surveys:surveyReducers
})
