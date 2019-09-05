import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Register extends Component {

    clear = () => {
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
        document.getElementById('myInput3').value='';
    }


    state = {
        users : [],
        // loading : false
        check : "a"
    }


    componentDidMount () {
        axios.get(
            'http://localhost:15000/users'
        ).then((res)=>{
            this.setState({
                    users : res.data
                })
        })
    }

    // cara resmi dari react utk register click dibawah ini
    // constructor () {
    //     super(props)
    //     this.username = React.createRef()
    //     this.email = React.createRef()
    //     this.password = React.createRef()
    // }
    registerClick = () => {
        // this.setState({loading:true})
        let y = this.username.value
        let z = this.email.value
        let x = this.password.value
        let filterUser = this.state.users.filter(a => {
            return a.username.toLowerCase() === y.toLowerCase()
        })

        let filterEmail = this.state.users.filter(a => {
            return a.email.toLowerCase() === z.toLowerCase()
        })

        if (filterUser.length===0 && filterEmail.length===0) {
            axios.post(
                'http://localhost:15000/users',
                {
                    username : y,
                    email : z,
                    password : x
                }
            ).then(()=>{
                // this.setState({loading:false})
                alert('You have been registered.\n\nPlease proceed with login.');
                this.clear()
                this.setState({check:"b"})
            })
        } else if (filterUser.length===0 && filterEmail.length===1) {
            this.setState({loading:false})
            Swal.fire(
                'This email has already taken',
                'Plese choose another one',
                'error'
              )
        } else if (filterUser.length===1 && filterEmail.length===0) {
            this.setState({loading:false})
            Swal.fire(
                'This username has already taken',
                'Plese choose another one',
                'error'
              )
        } else if (filterUser.length===1 && filterEmail.length===1) {
            this.setState({loading:false})
            Swal.fire(
                'This username and email has already taken',
                'Plese choose another one',
                'error'
              )
        }
    }


    // loadingButton = () => {
    //     if(this.state.loading) {
    //         return (
    //             <div className="spinner-grow" role="status">
    //                 <span className="sr-only"></span>
    //             </div>
    //         )
    //     } else {
            
    //     }
    // }


    render () {
        if (this.state.check==="a") {
            if (!this.props.a) {
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
            } else {
                alert(`You have logged in, ${this.props.a}.`)
                return <Redirect to='/'/>
            }
        } else {
            return <Redirect to='/Login'/>
        }
    }
}


const mapStateToProps = b => {
    return {
        a : b.auth.username
    }
}

export default connect(mapStateToProps, null)(Register)