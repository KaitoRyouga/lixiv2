import React, { useState, useEffect } from 'react'
import { useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Button} from "antd";
import axios from 'axios'

const Header = (props) => {

    const stateUser = useSelector(state => state.users)
    const [admin, setAdmin] = useState(false)

    const history = useHistory()

    const changePage = (path) => {
        history.push(path)
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                `http://${process.env.REACT_APP_API}/admin`, {
                  headers: {
                    'uid': stateUser[0].uid
                  }
                }
            );
            setAdmin(result.data.admin);
        }
          fetchData();
    }, [stateUser]);

    return (
        <div>
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
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Header
