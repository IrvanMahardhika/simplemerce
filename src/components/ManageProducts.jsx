import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ManageProducts extends Component {

    state = {
        product : [],
        selectedId : 0,
        selectedBrand : '',
        selectedName : '',
        selectedDesc : '',
        selectedPrice : '',
        selectedPicture : ''
    }

    // ini fuction bawaan dari react, jadi pembuatan nya tidak harus menggunakan arrow function
    componentDidMount () {
        this.getData()
    }

    getData = ()=> {
        axios.get(
            'http://localhost:15000/products'
        ).then((res)=>{
            this.setState(
                {
                    product : res.data,
                    selectedId : 0
                }
                )
        }).catch((err)=>{
            alert(err)
        })
    }

    renderList = () => {
        let z = this.state.product.map((a)=>{
            if (a.id !== this.state.selectedId) {
                return <tr key={a.id}>
                        <td className="text-left">{a.brand}</td>
                        <td className="text-left">{a.name}</td>
                        <td className="text-left">{a.desc}</td>
                        <td className="text-right">{a.price}</td>
                        <td>
                            <img style={{height: '100px', objectFit:'contain'}} src={a.picture} alt={'no pic'}/>
                        </td>
                        <td>
                            <button type="button" className="btn btn-secondary" onClick={()=>{this.editRemove(a.id, a)}} >
                                Edit/Remove
                            </button>
                        </td>
                    </tr>
            } else {
                return <tr key={a.id}>
                            <td> <input type="text" className="form-control" size={10} value={this.state.selectedBrand} onChange={(e)=>{this.setState({selectedBrand:e.target.value})}}/> </td>
                            <td> <input type="text" className="form-control" size={10} value={this.state.selectedName} onChange={(e)=>{this.setState({selectedName:e.target.value})}}/> </td>
                            <td> <input type="text" className="form-control" size={10} value={this.state.selectedDesc} onChange={(e)=>{this.setState({selectedDesc:e.target.value})}} /> </td>
                            <td> <input type="text" className="form-control" size={10} value={this.state.selectedPrice} onChange={(e)=>{this.setState({selectedPrice:e.target.value})}} /> </td>
                            <td>
                                <input type="text" className="form-control" value={this.state.selectedPicture} onChange={(e)=>{this.setState({selectedPicture:e.target.value})}} />
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-success" onClick={()=>{this.save(a.id)}} >
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={()=>{this.cancel()}} >
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={()=>{this.remove(a.id)}} >
                                        Remove
                                    </button>
                                </div>
                            </td>
                    </tr>
            }
        })
        return z
    }


    editRemove = (a, b) => {
        this.setState(
            {
                selectedId: a,
                selectedBrand : b.brand,
                selectedName : b.name,
                selectedDesc : b.desc,
                selectedPrice : b.price,
                selectedPicture : b.picture
            }
            )
    }


    cancel = () => {
        this.setState({selectedId: 0})
    }


    save = (a) => {
        axios.patch(
            'http://localhost:15000/products/'+a,
            {
                brand : this.state.selectedBrand,
                name : this.state.selectedName,
                desc : this.state.selectedDesc,
                price : this.state.selectedPrice,
                picture : this.state.selectedPicture
            }

        ).then(()=>{
            alert('Update product success !');
            this.getData()
        }).catch((err)=>{
            alert(err)
        })
    }

    remove = (a) => {
        axios.delete(
            'http://localhost:15000/products/'+a
        ).then(()=>{
            alert('Delete product success !');
            this.getData()
        }).catch((err)=>{
            alert(err)
        })
    }

    addProduct = () => {
        axios.post(
            'http://localhost:15000/products',
            {
                brand : this.brand.value,
                name : this.name.value,
                desc : this.desc.value,
                price : this.price.value,
                picture : this.picture.value
            }
        ).then(()=>{
            alert('Add product berhasil !');
            this.getData();
            this.clear()
        }).catch((err)=>{
            alert(err)
        })
    }

    clear = () => {
        document.getElementById('myInput1').value='';
        document.getElementById('myInput2').value='';
        document.getElementById('myInput3').value='';
        document.getElementById('myInput4').value='';
        document.getElementById('myInput5').value='';
    }

    render () {
        if (this.props.a) {
            return (
                <div>
                    <h1 className="display-1 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            <th>BRAND</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td><input ref={(input)=>{this.brand=input}} id='myInput5' className="form-control" type="text" /></td>
                            <td><input ref={(input)=>{this.name=input}} id='myInput1' className="form-control" type="text" /></td>
                            <td><input ref={(input)=>{this.desc=input}} id='myInput2' className="form-control" type="text" /></td>
                            <td><input ref={(input)=>{this.price=input}} id='myInput3' className="form-control" type="number" /></td>
                            <td><input ref={(input)=>{this.picture=input}} id='myInput4' className="form-control" type="text" /></td>
                            <td>
                                <button onClick={this.addProduct} type="button" className="btn btn-success">
                                    Add
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 className="display-1 text-center">List Product</h1>
                    <table className="table table-light table-striped text-center">
                        <thead>
                            <tr>
                            <th className="text-left">BRAND</th>
                            <th className="text-left">NAME</th>
                            <th className="text-left">DESC</th>
                            <th className="text-right">PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            alert(`You have to login first.`)
            return <Redirect to='/Login'/>
        }   
    }
}


const mapStateToProps = b => {
    return {
        a : b.auth.username
    }
}


export default connect(mapStateToProps, null)(ManageProducts) 