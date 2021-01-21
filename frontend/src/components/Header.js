import React, { useState, useEffect } from 'react'
import { useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Button} from "antd";
import axios from 'axios'
import '../assets/css/header.css'

const Header = (props) => {

    const stateUser = useSelector(state => state.users)
    const [admin, setAdmin] = useState(false)

    const history = useHistory()

    const changePage = (path) => {
        history.push(path)
    }

    useEffect(() => {
        async function fetchData() {

            const linkAPI = `${process.env.REACT_APP_API}/admin`

            const result = await axios.get(
                linkAPI, {
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
        <div className="container">
        <div className="wrapper">
          <h1 className="logo">LOGO</h1>
          <a className="nav-toggle">
            <span className="toggle" />
            <span className="toggle" />
            <span className="toggle" />
          </a>
        </div>
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item"><a onClick={() => {changePage("/")}}>Home</a></li>
            <li className="nav-item has-dropdown">
              <a href="#">Product <i className="fas fa-chevron-down" /></a>
              <ul className="item-dropdown">
                <li className="sub-item"><a href="#">Lì xì</a></li>
                <li className="sub-item"><a href="#">Ngoại tệ</a></li>
                <li className="sub-item"><a href="#">Khô</a></li>
                <li className="sub-item"><a href="#">Áo in</a></li>
              </ul>
            </li>
            <li className="nav-item"><a href="#">About</a></li>
            <li className="nav-item"><a href="#">Contact</a>
            </li><li className="nav-item"><a onClick={() => {changePage("/cart")}}>
                <i className="fas fa-cart-plus" />
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => {changePage("/login")}}>
                <i className="fab fa-facebook-f" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default Header
