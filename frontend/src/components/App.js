import React,{Component} from 'react'
import {Route,BrowserRouter as Router, BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveryNew from './surveys/SurveyNew'

class App extends Component{

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
    return(
        <div className="container">
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route path="/" exact component={Landing}></Route>
                    <Route path="/surveys" exact component={Dashboard}></Route>
                    <Route path="/surveys/new" component={SurveryNew}></Route>
                </div>
            </BrowserRouter>
        </div>
    )
    }
}

export default connect(null,actions)(App);