import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Modal, Drawer } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import { useHistory } from "react-router-dom";

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

const ViewList = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [hover, setHover] = useState(false);

    const onQuickShop = (values) => {

        const newCart = [{
            id: values.product._id,
            name: values.product.name,
            quantity: 1,
        }]

        dispatch(AddCart(newCart))
        history.push("cart")
    }

    const section_content = {
        backgroundImage: `url(${process.env.PUBLIC_URL}${props.product.image})`,
    }

    const hoverBackground = {
        backgroundImage: `url(${process.env.PUBLIC_URL}'/images/3.jpg')`
    }
    

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
            <div className="section_content-home" style={{
                ...section_content,
                ...(hover ? hoverBackground : null)
            }}>
                <div className="box_content" style={{
                    ...section_content,
                    ...(hover ? hoverBackground : null)
                }}>
                </div>
                <div className="overlay">
                    <div className="icon">
                        <i className="far fa-heart" />
                    </div>
                    <div className="botton">
                        <a className="view" onClick={()=> props.setVisible(true)}>
                            <div className="view-text">Quick view</div>
                            <div className="view-icon">
                                <i className="fas fa-eye" />
                            </div>
                        </a>
                        <a className="view" onClick={() => onQuickShop(props)}>
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
                <h3 className="headding">{props.product.name}</h3>
                <span className="price-content">{props.product.price}$</span>
            </div>
        </div>
    )
}


function ViewProduct (params) {
    const [count, setCount] = useState(0);
    const [showMessenge, setShowMessenge] = useState(false);
    const [showMessengeCount, setShowMessengeCount] = useState(false);
    const [visible, setVisible] = useState(false);
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

    const showDrawer = () => {
        params.showDrawer()
        setVisible(false)
    }
    
    return(
        <>
            <ViewList key={params.product.id} product={params.product} setVisible={setVisible}></ViewList>
            {
                showMessenge && messageWarning
            }
            {
                showMessengeCount && <MessengeQuantity key={params.product.id} error={params.product}></MessengeQuantity>
            }
            <Modal
                title="Quick view"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Row>
                    <Col span={12}>
                        <ViewList key={params.product.id} product={params.product} setVisible={setVisible}></ViewList>
                    </Col>
                    <Col span={12}>
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
                                <Col>
                                    <Button onClick={showDrawer}>Add to cart</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

const Home = () => {

        const [products, setProducts] = useState([]);    
        const [visibleDrawer, setVisibleDrawer] = useState(false);
        const stateCart = useSelector(state => state)    
        const history = useHistory()

        const changePage = (path) => {
            history.push(path)
        }

        const showDrawer = () => {
            setVisibleDrawer(true);
        };

        const onClose = () => {
            setVisibleDrawer(false);
        };

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
              <Header name="Home"></Header>
              <div className="container">
                <div className="row">
                    {
                        
                        products.map((product, id) => {
                            return (
                                <ViewProduct key={id} product={product} showDrawer={showDrawer}></ViewProduct> 
                            )
                        })
                    }
                </div>
              </div>

                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visibleDrawer}
                >
                    {
                        stateCart.carts.map(c => {
                            return (
                                <div key={c.name}>
                                    <p>{c.name}</p>
                                    <p>{c.quantity}</p>
                                </div>
                            )
                        })
                    }
                    <Button onClick={() => changePage("cart")}>Go to cart</Button>
                    <Button onClick={() => changePage("checkout")}>Check out</Button>
                </Drawer>
          </div>
        )
}

export default Home;