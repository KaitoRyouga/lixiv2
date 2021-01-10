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
                <li>Name: {props.cart.name}</li>
                <li>quantity: {props.cart.quantity}</li>
                <li>price: {pricePresent[0].price}</li>
                <li>total: {pricePresent[0].price*props.cart.quantity}</li>
            </ul>
        </div>
    )
}

const Cart = () => {

    const [data, setData] = useState("");
    const [path, setPath] = useState("");
    const [total, setTotal] = useState(0);
    const [change, setChange] = useState(0);
    // const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);

    useEffect(() => {
        const subtotal = stateRoot.carts.map(c => {
            const prod = stateRoot.products.filter(pro => pro.name === c.name);
            const sub = c.quantity*prod[0].price
            return setTotal(prevState => (prevState + sub))
        })
        return subtotal
    }, [stateRoot])

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
            <p>Subtotal: {total}</p>
        </div>
    )
}

export default Cart