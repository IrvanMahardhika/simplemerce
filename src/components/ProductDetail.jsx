import React, { Component } from "react";
import axios from 'axios';
import { Button, Badge } from 'reactstrap';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { Redirect } from "react-router-dom";


import {addToCart} from '../Action/index'


class ProductDetail extends Component {

    state = {
        product : [],
        qtyCart : 0,
        check : "a"
    }

    componentDidMount() {
        axios.get(
            `http://localhost:15000/products/${(this.props.match.params.id)}`
        ).then(res => {
            this.setState({product : res.data})
        })
        if (this.props.z) {
            let b = this.props.z
            let c = b.map(a => a.qtyATC)
            let d = c.reduce((a,b) => a+b,0)
            this.setState({qtyCart:d})
        } else {this.setState({qtyCart:0})}
    }


    atcClick = () => {
        if (this.props.y) {
            let qty = parseInt(this.atc.value)
            if (isNaN(qty)) {
                alert('Please type a number.')
                
            } else {
                let b = this.props.z
                let a = this.state.product
                a.qtyATC = qty
                b.push(a)
                let c = b.map(a => a.qtyATC)
                let d = c.reduce((a,b) => a+b,0)
                this.props.addToCart(b)
                this.setState({qtyCart:d})
                alert(`Added to cart : ${qty} pcs of ${this.state.product.name}`)
                this.setState({check:"b"})
            }
        } else {
            alert('Please register, then proceed with login')
            this.setState({check:"c"})
        } 
    }


    render () {
        if (this.state.check==="a") {
            if (this.state.product) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-lg-4">
                                <div className="card mt-3">
                                    <div className="card-header">{this.state.product.name}</div>
                                    <div className="card-body">
                                        <img src={this.state.product.picture} className="card-img-top" height="200px" style={{objectFit:'contain'}} alt="no pic"/>
                                        <p className="card-text">{this.state.product.desc}</p>
                                        <p className="card-text">$ {this.state.product.price}</p>
                                        <div className="row">
                                            <div className="col-10">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Qty</div>
                                                    </div>
                                                    <input ref={input=>{this.atc=input}} type="number" className="form-control" defaultValue="1"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <Link>  
                                            <Button className="mt-2" onClick={()=>{this.atcClick()}} >Add to cart</Button>
                                        </Link>
                                        <br></br>
                                        <Link to={`/Cart`}>
                                            <Button className="mt-2" color="secondary" outline>
                                                Cart <Badge className="btn-group" color="primary">{this.state.qtyCart}</Badge>
                                            </Button> 
                                        </Link>
                                        <br></br>
                                        <Link to={`/`}>  
                                            <Button className="mt-2">Select Another Product</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>Loading</h3>
                    </div>
                )
            }
        } else if (this.state.check==="b") {
            return <Redirect to='/'/>
        } else if (this.state.check==="c") {
            return <Redirect to='/Register'/>
        }
    }
}


const mapStateToProps = a => {
    return {
        z : a.auth.atc,
        y : a.auth.username
    }
}


export default connect(mapStateToProps,{addToCart})(ProductDetail)