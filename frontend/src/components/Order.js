import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'

const ViewOrder = (props) => {

    return(
        <>
            <ul>
                <li>Name: {props.order.name}</li>
                <li>Phone: {props.order.phone}</li>
                <li>Address: {props.order.address}</li>
                {
                    props.order.cart.stateCart.map(c => {
                        return (
                            <>
                                <li>{c.name}</li>
                                <li>{c.quantity}</li>
                            </>
                        )
                    })
                }
                <li>Subtotal: {props.order.subtotal}</li>
            </ul>
        </>
    )
}


const Order = () => {

    const stateRoot = useSelector(state => state.orders);

    return (
        <div>
            <Header name="Order"></Header>
            {
                stateRoot.map(s => {
                    return <ViewOrder key={s._id} order={s}></ViewOrder>
                })
            }
        </div>
    )
}

export default Order
