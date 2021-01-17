import React, { useState } from 'react'
import { useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Button} from "antd";
import axios from 'axios'

const Header = (props) => {

    const stateUser = useSelector(state => state.users)
    const [admin, setAdmin] = useState(false)
    const checkAdmin = (res) => {
        setAdmin(res.data.admin)
    }

    axios.get(
        'http://localhost:3000/admin', {
          headers: {
            'uid': stateUser[0].uid
          }
        }
    ).then(res => checkAdmin(res)).catch(err => console.log(err))

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
            {
                admin &&
                <Button onClick={() => {
                    changePage("/products")
                }}>
                    Products
                </Button>
            }
            <Button onClick={() => {
                changePage("/cart")
            }}>
                Cart
            </Button>
            {
                admin &&
                <Button onClick={() => {
                    changePage("/promotions")
                }}>
                    Promo
                </Button>
            }

            <Button onClick={() => {
                changePage("/orders")
            }}>
                Order
            </Button>
            <Button onClick={() => {
                changePage("/login")
            }}>
                Login
            </Button>
        </div>
    )
}

export default Header
