import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {loginUser} from "../Action/index"


class Login extends Component {

    clear = () => {
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
    }

    loginClick = () => {
        let y = this.user.value
        let z = this.pass.value
        this.props.loginUser(y,z)
        this.clear()
    }

    render () {
        if (!this.props.a) {
            return (
                <div>
                    <div className='col-6 mx-auto card mt-3 px-4'>
                        <div className='card-body'>
                            <div className='card-title border-bottom border-dark mb-4'>
                                <h1>Login</h1>
                            </div>
                            <div className='card-title mb-0'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group mb-3'>
                                <input ref={(input)=>{this.user=input}} id='myInput1' type='text' className='form-control' />
                            </form>
                            <div className='card-title mb-0'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group mb-4'>
                                <input ref={(input)=>{this.pass=input}} id='myInput2' type='password' className='form-control' />
                            </form>
                            <div>
                                <button className='btn btn-block btn-primary' onClick={this.loginClick} >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = b => {
    return {
        a : b.auth.username
    }
}

export default connect(mapStateToProps,{loginUser})(Login)