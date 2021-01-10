import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Image, Card, Row, Col, Button, Alert, message } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import { useDispatch } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'

function ViewProduct (params) {
    const [count, setCount] = useState(0);
    const [showMessenge, setShowMessenge] = useState(false);
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
        setCount(count + 1)
        setShowMessenge(false)
    }

    function onDecrement() {
        if (count !== 0 ) {
            setCount(count - 1)
        }else{
            setShowMessenge(true)
        }
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
                                const cartTemp = [
                                    {
                                        name: params.product.name,
                                        quantity: count - 1
                                    }
                                ];
                                addCart(cartTemp)
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
                                const cartTemp = [
                                    {
                                        name: params.product.name,
                                        quantity: count + 1
                                    }
                                ];
                                addCart(cartTemp)
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