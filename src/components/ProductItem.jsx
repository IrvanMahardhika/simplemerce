import React, { Component } from "react";
import { Button, ButtonGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from "react-router-dom";

class ProductItem extends Component {
    render () {
        return (
            <div className="px-1 col-12 col-lg-6 col-xl-4">
                        <Card key={this.props.barang.id} className="mt-1">
                            <CardImg height="200px" style={{objectFit:'contain'}} className="" top src={this.props.barang.picture} alt="Card image cap" />
                            <CardBody>
                                <CardTitle className="d-inline">
                                    <p className="h5 overflow-auto" style={{height:"75px"}} >{this.props.barang.name}</p>
                                    <p style={{height:"150px"}} className="overflow-auto" >{this.props.barang.desc}</p>
                                </CardTitle>
                                <CardSubtitle className="h4 mt-4">$ {this.props.barang.price}</CardSubtitle>
                                <CardText></CardText>
                                <div className="row">
                                    <div className="col-10">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Qty</div>
                                            </div>
                                            <input type="number" className="form-control" defaultValue="1"></input>
                                        </div>
                                    </div>
                                </div>
                                <ButtonGroup>
                                <div className="row mt-2">
                                    <div className="col-4 col-sm-4 mb-1">
                                        <Link to={`/productdetail/${this.props.barang.id}`}>
                                            <Button className="" >
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="col-10 col-sm-8">
                                        <Button className="" >
                                            Add to cart
                                        </Button>
                                    </div>
                                </div>
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </div>
        )
    }
}

export default ProductItem