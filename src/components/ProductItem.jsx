import React, { Component } from "react";
import { Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from "react-router-dom";




class ProductItem extends Component {
    render () {
        return (
            <div className="px-1 col-12 col-md-6 col-lg-4">
                        <Card key={this.props.barang.id} className="mt-1">
                            <CardImg height="200px" style={{objectFit:'contain'}} className="" top src={this.props.barang.picture} alt="Card image cap" />
                            <CardBody>
                                <CardTitle className="d-inline">
                                    <p className="h5 overflow-auto" style={{height:"75px"}} >{this.props.barang.name}</p>
                                    <p style={{height:"150px"}} className="overflow-auto" >{this.props.barang.desc}</p>
                                </CardTitle>
                                <div className="row">
                                    <div className="d-flex align-items-center col-12 col-sm-6">
                                        <CardSubtitle className="h4 mb-1">$ {this.props.barang.price}</CardSubtitle>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <Link to={`/productdetail/${this.props.barang.id}`}>
                                            <Button className="" >
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <CardText></CardText>
                            </CardBody>
                        </Card>
                    </div>
        )
    }
}

export default ProductItem