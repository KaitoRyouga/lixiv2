import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import AddProduct from '../actions/Product/AddProduct'

const ViewProduct = (params) => {
    return(
        <div>
            <ul>
                <li>{params.product.id}</li>
                <li>{params.product.name}</li>
                <li>{params.product.quantity}</li>
            </ul>
        </div>
    )
}

const Products = () => {
    
        const [data, setData] = useState("");
        const [path, setPath] = useState("");
        const [change, setChange] = useState(0);
        const products = useSelector(state => state.product);
        const dispatch = useDispatch();

        const addProduct = (info) => {
            dispatch(AddProduct(info))
        }
    
        return(
            <div>

                { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

                <article>this is Products</article>
                <button onClick={() => {
                    setData("Home")
                    setPath("/")
                    setChange(1)
                }}>
                    Home
                </button>
                <div>
                    {
                        products.map(product => {
                            return <ViewProduct product={product}></ViewProduct>
                        })
                    }
                </div>
            </div>
        )
}

export default Products