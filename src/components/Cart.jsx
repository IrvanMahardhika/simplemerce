import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {addToCart} from '../Action/index'
import axios from "axios";


class Cart extends Component {


    state = {
        product : [],
        id : '',
        checkOut : false,
        totalHarga : ''

    }


    componentDidMount () {
        let a = this.props.z
        a = a.sort((a,b) => a.id-b.id)
        let b = this.props.y
        let hargaKaliQty = a.map(a => a.price*a.qtyATC)
        let total = hargaKaliQty.reduce((a,b) => a+b,0)
        return this.setState({product:a, id:b, totalHarga:total})
    }


    renderCart = () => {
        let a = this.state.product
        let b = a.map((a)=>{
            return <tr key={a.id}>
                        <td className="text-left">{a.id}</td>
                        <td className="text-left">{a.name}</td>
                        <td className="text-left">{a.desc}</td>
                        <td className="text-right">${a.price}</td>
                        <td className="text-right">{a.qtyATC}</td>
                        <td>
                            <img style={{height: '100px', objectFit:'contain'}} src={a.picture} alt={'no pic'}/>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={()=>{this.remove(a.id)}} >
                                Delete
                            </button>
                        </td>
                </tr>
        })
        return b
    }


    remove = (a) => {
        let b = this.state.product
        let filter = b.filter(x => x.id!==a)
        this.setState({product:filter})
        this.props.addToCart(filter)
    }


    checkOut = () => {
        let a = this.props.y
        let b = this.state.product
        this.setState({checkOut:true})
        axios.post(
            'http://localhost:15000/usernameCart',
            {
                username : a,
            }
        );
        axios.post(
            'http://localhost:15000/cart',
            {
                productBought : b,
            }
        )
    }


    renderCheckOut = () => {
        let a = this.state.product
        let b = a.map((a)=>{
            return <tr>
                        <td className="text-left">{a.id}</td>
                        <td className="text-left">{a.name}</td>
                        <td className="text-right">{a.qtyATC}</td>
                        <td className="text-right">${a.price}</td>
                        <td className="text-right">${a.price*a.qtyATC}</td>
                    </tr>
            })
        return b
    }




    render () {
        if (this.props.z.length>0 && this.state.checkOut) {
            return (
                <div>
                    <h3 className="text-left">Cart</h3>
                    <table className="table table-light table-striped text-center">
                        <thead>
                            <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">NAME</th>
                            <th className="text-left">DESC</th>
                            <th className="text-right">PRICE</th>
                            <th className="text-right">QTY</th>
                            <th className="text-center">PICTURE</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                    </table>
                    <div className="row justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.checkOut()}} >
                            Checkout
                        </button>
                    </div>
                    <h3 className="text-left">TOTAL</h3>
                    <table className="table table-light table-striped text-center">
                        <thead>
                            <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">NAME</th>
                            <th className="text-right">QTY</th>
                            <th className="text-right">PRICE</th>
                            <th className="text-right">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCheckOut()} 
                            <tr>
                                <td className="h5" colSpan="4">Total</td>
                                <td className="text-right">${this.state.totalHarga}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else if (this.props.z.length>0 && this.state.checkOut===false) {
            return (
                <div>
                    <h3 className="text-left">Cart</h3>
                    <table className="table table-light table-striped text-center">
                        <thead>
                            <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">NAME</th>
                            <th className="text-left">DESC</th>
                            <th className="text-right">PRICE</th>
                            <th className="text-right">QTY</th>
                            <th className="text-center">PICTURE</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                    </table>
                    <div className="row justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.checkOut()}} >
                            Checkout
                        </button>
                    </div>
                </div>
            )
        } else {
            alert(`Your cart is empty.`)
            return <Redirect to='/'/>
        }
    }
}


const mapStateToProps = a => {
    return {
        z : a.auth.atc,
        y : a.auth.username
    }
}


export default connect(mapStateToProps,{addToCart})(Cart)
