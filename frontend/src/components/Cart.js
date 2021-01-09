import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Image } from "antd";
// import { useDispatch, useSelector } from 'react-redux'

const ViewCart = (props) => {

    const pricePresent = props.products.filter(p => p.name === props.cart.name)

    return (
        <div>
            <ul>
                <li>
                    <Image src={pricePresent[0].image} alt="image"></Image>
                </li>
                <li>{props.cart.name}</li>
                <li>{props.cart.quantity}</li>
                <li>{pricePresent[0].price}</li>
            </ul>
        </div>
    )
}

const Cart = () => {

    const [data, setData] = useState("");
    const [path, setPath] = useState("");
    const [change, setChange] = useState(0);
    // const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    // console.log(stateRoot)
    // console.log(stateRoot.carts)
    // console.log(stateRoot.products)

    return (
        <div>

            { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

            <article>This is Cart</article>
            <button onClick={() => {
                    setData("home")
                    setPath("/")
                    setChange(1)
                }}>
                    Home
                </button>


            { stateRoot.carts === undefined ||
                stateRoot.carts.map(c => {
                    return <ViewCart key={c.name} cart={c} products={stateRoot.products} carts={stateRoot.carts}></ViewCart>
                })
            }
        </div>
    )
}

export default Cart