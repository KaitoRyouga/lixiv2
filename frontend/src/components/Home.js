import React, { useState, useEffect } from 'react';
import { Image, Card, Row, Col, Button, Alert } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import { useDispatch } from 'react-redux'
import Header from './Header'

const MessengeQuantity = (props) => {

    return (
        <Alert
            message="Warning"
            description={`Quantity of ${props.error.name} max is ${props.error.quantity}`}
            type="warning"
            showIcon
            closable
        />
    )
}

function ViewProduct (params) {
    const [count, setCount] = useState(0);
    const [showMessenge, setShowMessenge] = useState(false);
    const [showMessengeCount, setShowMessengeCount] = useState(false);
    const dispatch = useDispatch();

    const messageWarning = (<Alert
        message="Warning"
        description="Quantity should not be less than 0"
        type="warning"
        showIcon
        closable
    />)

    const addCart = (info) => {
        dispatch(AddCart(info))
    }

    function onIncrement() {
        if (params.product.quantity < count + 1) {
            setShowMessengeCount(true)
        } else {
            setCount(count + 1)
            setShowMessengeCount(false)
            const cartTemp = [
                {   
                    id: params.product._id,
                    name: params.product.name,
                    quantity: count + 1
                }
            ];
            addCart(cartTemp)
        }
        setShowMessenge(false)
    }

    function onDecrement() {
        if (count !== 0 ) {
            setCount(count - 1)
            setShowMessenge(false)
            const cartTemp = [
                {   
                    id: params.product._id,
                    name: params.product.name,
                    quantity: count - 1
                }
            ];
            addCart(cartTemp)
        }else{
            setShowMessenge(true)
        }
        setShowMessengeCount(false)
    }


    return(         
        <Col span={8}>
            <Card size="small" title={params.product.name} style={{ width: 300 }} cover={<Image
                width={200}
                src={params.product.image}
            />}>
                <p>{params.product.price}$</p>
                <div>
                    <Row>
                        <Col span={8}>
                            <Button onClick={() => {
                                onDecrement()
                            }}>
                                <LeftOutlined />
                            </Button> 
                        </Col>
                        <Col span={8}>
                            <p>{count}</p>
                        </Col>
                        <Col span={8}>
                        <Button onClick={() => {
                                onIncrement()
                            }}>
                                <RightOutlined />
                            </Button> 
                        </Col>
                    </Row>
                </div>
            </Card>
            {
                showMessenge && messageWarning
            }
            {
                showMessengeCount && <MessengeQuantity error={params.product}></MessengeQuantity>
            }
        </Col>
    )
}

const Home = () => {

        const [products, setProducts] = useState([]);

        useEffect(() => {
            async function fetchData() {
                const result = await axios.get(
                    'http://localhost:3000/products',
                );
                setProducts(result.data.Products);
            }
              fetchData();
        }, []);
    
        return(
<div className="container">
  <div className="row">
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
      <div className="section_content-home">
        <div className="box_content">
        </div>
        <div className="overlay">
          <div className="icon">
            <i className="far fa-heart" />
          </div>
          <div className="botton">
            <a href className="view">
              <div className="view-text">Quick view</div>
              <div className="view-icon">
                <i className="fas fa-eye" />
              </div>
            </a>
            <a href className="view">
              <div className="view-text">Quick shop</div>
              <div className="view-icon">
                <i className="fas fa-cart-plus" />
              </div>
            </a>
          </div>
          <div className="size">
            XS, S, M, L, XL
          </div>
        </div>
      </div>
      <div className="price">
        <h3 className="headding">City Backpack Black</h3>
        <span className="price-content">$72.00</span>
      </div>
    </div>
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
      <div className="section_content-home">
        <div className="box_content">
        </div>
        <div className="overlay">
          <div className="icon">
            <i className="far fa-heart" />
          </div>
          <div className="botton">
            <a href className="view">
              <div className="view-text">Quick view</div>
              <div className="view-icon">
                <i className="fas fa-eye" />
              </div>
            </a>
            <a href className="view">
              <div className="view-text">Quick shop</div>
              <div className="view-icon">
                <i className="fas fa-cart-plus" />
              </div>
            </a>
          </div>
          <div className="size">
            XS, S, M, L, XL
          </div>
        </div>
      </div>
      <div className="price">
        <h3 className="headding">City Backpack Black</h3>
        <span className="price-content">$72.00</span>
      </div>
    </div>
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
      <div className="section_content-home">
        <div className="box_content">
        </div>
        <div className="overlay">
          <div className="icon">
            <i className="far fa-heart" />
          </div>
          <div className="botton">
            <a href className="view">
              <div className="view-text">Quick view</div>
              <div className="view-icon">
                <i className="fas fa-eye" />
              </div>
            </a>
            <a href className="view">
              <div className="view-text">Quick shop</div>
              <div className="view-icon">
                <i className="fas fa-cart-plus" />
              </div>
            </a>
          </div>
          <div className="size">
            XS, S, M, L, XL
          </div>
        </div>
      </div>
      <div className="price">
        <h3 className="headding">City Backpack Black</h3>
        <span className="price-content">$72.00</span>
      </div>
    </div>
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
      <div className="section_content-home">
        <div className="box_content">
        </div>
        <div className="overlay">
          <div className="icon">
            <i className="far fa-heart" />
          </div>
          <div className="botton">
            <a href className="view">
              <div className="view-text">Quick view</div>
              <div className="view-icon">
                <i className="fas fa-eye" />
              </div>
            </a>
            <a href className="view">
              <div className="view-text">Quick shop</div>
              <div className="view-icon">
                <i className="fas fa-cart-plus" />
              </div>
            </a>
          </div>
          <div className="size">
            XS, S, M, L, XL
          </div>
        </div>
      </div>
      <div className="price">
        <h3 className="headding">City Backpack Black</h3>
        <span className="price-content">$72.00</span>
      </div>
    </div>
  </div>
</div>
        )
}

export default Home;