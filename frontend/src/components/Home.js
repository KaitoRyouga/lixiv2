import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Image, Card, Row, Col, Button } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'

const ViewProduct = (params) => {
    const [count, setCount] = useState(0)

    const onIncrement = () => {
        setCount(count + 1)
    }

    const onDecrement = () => {
        setCount(count - 1)
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
                            <Button onClick={onDecrement}>
                                <LeftOutlined />
                            </Button> 
                        </Col>
                        <Col span={8}>
                            <p>{count}</p>
                        </Col>
                        <Col span={8}>
                            <Button onClick={onIncrement}>
                                <RightOutlined />
                            </Button> 
                        </Col>
                    </Row>
                </div>
            </Card>
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