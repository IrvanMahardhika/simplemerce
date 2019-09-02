import React, { Component } from "react";
import axios from 'axios'

class Register extends Component {

    clear = () => {
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
        document.getElementById('myInput3').value='';
    }

    // cara resmi dari react utk register click dibawah ini
    // constructor () {
    //     super(props)
    //     this.username = React.createRef()
    //     this.email = React.createRef()
    //     this.password = React.createRef()
    // }
    registerClick = () => {
        axios.post(
            'http://localhost:15000/users',
            {
                username : this.username.value,
                email : this.email.value,
                password : this.password.value
            }
        ).then(()=>{
            alert('Registrasi berhasil !');
            this.clear()
        }).catch((err)=>{
            alert(err);
        })
    }

    render () {
        return (
            <div>
                <div className='col-6 mx-auto card mt-3 px-4'>
                    <div className='card-body'>
                        <div className='card-title border-bottom border-dark mb-4'>
                            <h1>Register</h1>
                        </div>
                        <div className='card-title mb-0'>
                            <h4>Username</h4>
                        </div>
                        <form className='input-group mb-3'>
                            <input ref={(input)=>{this.username=input}} id='myInput1' type='text' className='form-control' />
                        </form>
                        <div className='card-title mb-0'>
                            <h4>Email</h4>
                        </div>
                        <form className='input-group mb-3'>
                            <input ref={(input)=>{this.email=input}} id='myInput2' type='text' className='form-control' />
                        </form>
                        <div className='card-title mb-0'>
                            <h4>Password</h4>
                        </div>
                        <form className='input-group mb-4'>
                            <input ref={(input)=>{this.password=input}} id='myInput3' type='password' className='form-control' />
                        </form>
                        <div>
                            <button className='btn btn-block btn-primary' onClick={this.registerClick} >Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register