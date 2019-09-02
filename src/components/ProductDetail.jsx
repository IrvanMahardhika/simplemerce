import React, { Component } from "react";
import axios from 'axios';
import { Button, ButtonGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';



class ProductDetail extends Component {

    state = {
        product : null
    }

    componentDidMount() {
        axios.get(
            `http://localhost:15000/products/${(this.props.match.params.id)}`
        ).then(res => {
            this.setState({product : res.data})
        })
    }

    render () {
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
                                                    <div class="input-group-text">Qty</div>
                                                </div>
                                                <input type="number" class="form-control" defaultValue="1"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="mt-2">Add to cart</Button>
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
    }
}


export default ProductDetail