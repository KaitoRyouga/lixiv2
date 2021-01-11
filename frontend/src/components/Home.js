import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Image, Card, Row, Col, Button, Alert } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import { useDispatch } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'

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

        const [data, setData] = useState("");
        const [path, setPath] = useState("");
        const [change, setChange] = useState(0);
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
            <div>

                { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

                <article>this is Home</article>
                <button onClick={() => {
                    setData("products")
                    setPath("products")
                    setChange(1)
                }}>
                    Products
                </button>
                <button onClick={() => {
                    setData("cart")
                    setPath("cart")
                    setChange(1)
                }}>
                    Cart
                </button>
                <button onClick={() => {
                    setData("promos")
                    setPath("promos")
                    setChange(1)
                }}>
                    Promo
                </button>
                <Row>
                {
                    
                    products.map((product, id) => {
                        return (
                            <ViewProduct key={id} product={product}></ViewProduct> 
                        )
                    })
                }
                </Row>
            </div>
        )
}

export default Home;