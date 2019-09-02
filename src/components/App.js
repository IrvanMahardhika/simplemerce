import React, { Component } from "react";
import {Route, BrowserRouter} from 'react-router-dom'
import { connect } from "react-redux";

import Register from './Register'
import Login from './Login'
import Home from './Home'
import ManageProducts from './ManageProducts.jsx'
import Header from './Header.jsx'
import ProductDetail from './ProductDetail'


const keepLogin = (a) => {
    return {
        type : 'LOGIN_SUCCESS',
        payload : {
            id : a.id,
            username : a.username
        }
    }
}


class App extends Component {

    state = {
        check : false
    }

    componentDidMount () {
        let z = JSON.parse(localStorage.getItem("userData"))
        if (z) {
            this.props.keepLogin(z)
        }
        this.setState({check:true})
    }
    

    render () {
        if (this.state.check) {
            return (
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home} />
                    <Route path='/Register' component={Register}/>
                    <Route path='/Login' component={Login} />
                    <Route path='/ManageProducts' component={ManageProducts} />
                    <Route path='/productdetail/:id' component={ProductDetail} />
                </BrowserRouter>
            )
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }
    }
}



export default connect(null,{keepLogin})(App)