import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Image } from "antd";
// import { useDispatch, useSelector } from 'react-redux'

const ViewCart = (params) => {

    const pricePresent = params.product.filter(p => p.name === params.cart.name)

    return (
        <div>
            <ul>
                <li>
                    <Image src={pricePresent[0].image} alt="image"></Image>
                </li>
                <li>{params.cart.name}</li>
                <li>{params.cart.quantity}</li>
                <li>{pricePresent[0].price}</li>
            </ul>
        </div>
    )
}

function Cart() {

    const [data, setData] = useState("");
    const [path, setPath] = useState("");
    const [cart, setCart] = useState([{}]);
    const [change, setChange] = useState(0);
    // const dispatch = useDispatch();
    const carts = useSelector(state => state)

    useEffect(() => {
        async function fetchData() {
            setCart(await carts)
        }
        fetchData();
    }, [carts]);
        

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


            { cart.carts === undefined ||
                cart.carts.map(c => {
                    return <ViewCart key={c.name} cart={c} product={cart.product} carts={cart.carts}></ViewCart>
                })
            }
        </div>
    )
}

export default Cart