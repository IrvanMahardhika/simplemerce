import React, { Component } from "react";
import axios from "axios";
import { Button, ButtonGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

import ProductItem from './ProductItem'


class Home extends Component {

    state = {
        product : [],
        searchProduct : []
    }

    componentDidMount () {
        axios.get(
            'http://localhost:15000/products'
        ).then((res)=>{
            this.setState({
                    product : res.data,
                    searchProduct : res.data
                })
        }).catch((err)=>{
            alert(err)
        })
    }

    renderList = () => {
        let z = this.state.searchProduct.map((a)=>{
            return <ProductItem barang={a} key={a.id}/>
        })
        return z
    }

    search = () => {
        let searchName = this.name.value
        let min = parseInt(this.min.value)
        let max = parseInt(this.max.value)
        let y
        if (!searchName) {
            y = this.state.product
        } else {
            y = this.state.product.filter((a)=>{
                return (
                    a.name.toLowerCase().includes(searchName.toLowerCase())
                )
            })
        }
        let z
        if (!min && !max) {
            z = y
        } else if (min && !max) {
            z = y.filter(a => a.price>min)
        } else if (!min && max) {
            z = y.filter(a => a.price<max)
        } else if (min && max) {
            z = y.filter(a => a.price>min & a.price<max)
        }
        this.setState({searchProduct:z});
        this.clear()
    }

    reset = () => {
        this.setState((a)=>{
            return {searchProduct: a.product}
        })
    }

    clear = () => {
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
        document.getElementById('myInput3').value='';
    }

    render () {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-6 col-sm-4 col-md-3">
                        <form>
                            <h1>Search</h1>
                            <hr></hr>
                            <div className="form-group mt-4">
                                <label >Name</label>
                                <input ref={input=>{this.name=input}} type="email" className="form-control" id="myInput1" />
                            </div>
                            <div className="form-group mt-4">
                                <label >Price</label>
                                <input ref={input=>{this.min=input}} type="number" className="form-control" placeholder="min" id="myInput2"/>
                                <span>&nbsp;&nbsp;&nbsp;-</span>
                                <input ref={input=>{this.max=input}} type="number" className="form-control" placeholder="max" id="myInput3" />
                            </div>
                            <ButtonGroup className="mt-4">
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-lg-5 mb-1">
                                        <button type="button" className="btn btn-primary mr-1" onClick={()=>{this.search()}} >Search</button>
                                    </div>
                                    <div className="col-8 col-sm-6">
                                        <button type="button" className="btn btn-primary" onClick={()=>{this.reset()}} >Reset</button>
                                    </div>
                                </div>
                            </ButtonGroup>
                        </form>
                    </div>
                    <div className="col-6 col-sm-8 col-md-9">
                        <div className="row">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home