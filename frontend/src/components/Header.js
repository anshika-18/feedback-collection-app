import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import config from '../config.json'

class Header extends Component
{
    renderContent()
    {
        switch(this.props.auth)
        {
            case null:
                return <li>not found</li>;
            case false:
                return (
                    <li><a href='/auth/google'>Login With Google</a></li>
                )
            default:
                return (
                    <li><a href="/api/logout">Logout</a></li>
                )

        }
    }
    render() {
        console.log(this.props)
        return(
        <div>
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth?'/surveys':'/'} className="left brand-logo">Emaily</Link>

                    <ul id="nav-mobile" className="right ">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        </div>
    )}
}

function mapStateToProps({auth})
{
    return ({auth})
}

export default connect(mapStateToProps)(Header);