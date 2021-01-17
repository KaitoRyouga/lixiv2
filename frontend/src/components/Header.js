import React from 'react'
import { useHistory } from "react-router-dom";
import { Button} from "antd";

const Header = (props) => {
    

    const history = useHistory()

    const changePage = (path) => {
        history.push(path)
    }

    return (
        <div>
            <article>This is {props.name}</article>
            <Button onClick={() => {
                changePage("/")
            }}>
                Home
            </Button>
            <Button onClick={() => {
                changePage("/products")
            }}>
                Products
            </Button>
            <Button onClick={() => {
                changePage("/cart")
            }}>
                Cart
            </Button>
            <Button onClick={() => {
                changePage("/promos")
            }}>
                Promo
            </Button>
            <Button onClick={() => {
                changePage("/order")
            }}>
                Order
            </Button>
        </div>
    )
}

export default Header
