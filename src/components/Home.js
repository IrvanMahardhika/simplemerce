import React, { Component } from "react";
import axios from "axios";
import { Label, Input, FormGroup, Button, Badge } from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

import ProductItem from './ProductItem'


class Home extends Component {

    state = {
        product : [],
        searchProduct : [],
        selectedBrand : '',
        qtyCart : 0
    }

    componentDidMount () {
        axios.get(
            'http://localhost:15000/products'
        ).then((res)=>{
            this.setState({
                    product : res.data,
                    searchProduct : res.data
                })
        })
        if (this.props.z) {
            let b = this.props.z
            let c = b.map(a => a.qtyATC)
            let d = c.reduce((a,b) => a+b,0)
            this.setState({qtyCart:d})
        } else {this.setState({qtyCart:0})}
    }


    renderBrand = () => {
        let brandDropdown = this.state.product.map(a => a.brand)
        let z = [...new Set(brandDropdown)]
        return z.map(a => {
            return <option>{a}</option>
        })
    }


    filter = () => {
        let brand = this.state.selectedBrand
        let min = this.min.value
        let max = this.max.value
        let filterBrand
        let z

        if (brand==="All Brand") {
            filterBrand = this.state.product
            if (isNaN(min) || isNaN(max)) {
                alert('Please type a number.')
            } else if (!min && !max){
                this.setState({searchProduct:filterBrand})
            } else if (min && !max){
                min = parseInt(min)
                z = filterBrand.filter(a => a.price>=min)
                this.setState({searchProduct:z})
            } else if (!min && max){
                max = parseInt(max)
                z = filterBrand.filter(a => a.price<=max)
                this.setState({searchProduct:z})
            } else {
                min = parseInt(min)
                max = parseInt(max)
                z = filterBrand.filter(a => a.price>=min & a.price<=max)
                this.setState({searchProduct:z})
            }
        } else {
            filterBrand = this.state.product.filter(a => a.brand.includes(brand))
            if (isNaN(min) || isNaN(max)) {
                alert('Please type a number.')
            } else if (!min && !max){
                this.setState({searchProduct:filterBrand})
            } else if (min && !max){
                min = parseInt(min)
                z = filterBrand.filter(a => a.price>=min)
                this.setState({searchProduct:z})
            } else if (!min && max){
                max = parseInt(max)
                z = filterBrand.filter(a => a.price<=max)
                this.setState({searchProduct:z})
            } else {
                min = parseInt(min)
                max = parseInt(max)
                z = filterBrand.filter(a => a.price>=min & a.price<=max)
                this.setState({searchProduct:z})
            }
        }
    }


    lth = () => {
        let z = this.state.searchProduct.sort((a,b)=>a.price-b.price)
        this.setState({searchProduct:z})
    }

    htl = () => {
        let z = this.state.searchProduct.sort((a,b)=>b.price-a.price)
        this.setState({searchProduct:z})
    }


    reset = () => {
        this.state.searchProduct.sort((a,b) => a.id-b.id)
        this.setState((a)=>{
            return {searchProduct: a.product}
        })
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
        document.getElementById('exampleSelect').value='All Brand'
    }


    renderList = () => {
        let z = this.state.searchProduct.map((a)=>{
            return <ProductItem barang={a} key={a.id}/>
        })
        return z
    }


    render () {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-5 col-sm-4 col-md-3 mt-1">
                        <form className="border p-2">
                            <label className="h2">Filter</label>
                            <FormGroup>
                                <Label for="exampleSelect">Brand</Label>
                                <Input type="select" id="exampleSelect" onChange={e=>{this.setState({selectedBrand:e.target.value})}}>
                                    <option>All Brand</option>
                                    {this.renderBrand()}
                                </Input>
                            </FormGroup>
                            <div className="form-group mt-4">
                                <label >Price</label>
                                <input ref={input=>{this.min=input}} defaultValue="" type="text" className="form-control" placeholder="min" id="myInput1"/>
                                <span>&nbsp;&nbsp;&nbsp;-</span>
                                <input ref={input=>{this.max=input}} defaultValue="" type="text" className="form-control" placeholder="max" id="myInput2"/>
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={()=>{this.filter()}} >Apply Filter</button>
                        </form>
                        <form className="border mt-3 p-2">
                            <h2 className="">Sort Price</h2>
                            <button type="button" className="btn btn-outline-secondary mb-1" onClick={()=>{this.lth()}} >Low to High</button>
                            <br></br>
                            <button type="button" className="btn btn-outline-secondary" onClick={()=>{this.htl()}} >High to Low</button>
                        </form>
                        <div className="row mt-3 p-2">
                            <div className="mb-1 col-8 col-lg-4">
                                <button type="button" className="btn btn-secondary" onClick={()=>{this.reset()}} >Reset</button>
                            </div>
                            <div className="col-12 col-lg-8">
                                <Link to={`/Cart`}>
                                    <Button className="btn-block" color="secondary" outline>
                                        Cart <Badge className="btn-group" color="primary">{this.state.qtyCart}</Badge>
                                    </Button> 
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 col-sm-8 col-md-9">
                        <div style={{height:"750px"}} className="row overflow-auto">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = a => {
    return {
        z : a.auth.atc,
        y : a.auth.username
    }
}


export default connect(mapStateToProps)(Home)
