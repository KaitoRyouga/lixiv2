import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Modal, Drawer, Tag, Image, Space, Badge, Card, Grid } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import DeleteCart from '../actions/Cart/DeleteCart'
import { useDispatch, useSelector } from 'react-redux'
import financial from './financial'
import { useHistory } from "react-router-dom";
import QueueAnim from 'rc-queue-anim';

const { useBreakpoint } = Grid;

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

    const { Meta } = Card;

    const dispatch = useDispatch();
    const history = useHistory();
    const [hover, setHover] = useState(false);

    const onQuickShop = (values) => {

        const newCart = [{
            id: values.product._id,
            name: values.product.name,
            price: values.product.price,
            image: values.product.image,
            quantity: 1,
        }]

        dispatch(AddCart(newCart))
        history.push("cart")
    }

    return(
        <Card
            hoverable
            style={{
                textAlign: "center",
                marginBottom: "2em"
            }}
            cover={(
                    <>
                        <img alt={props.product.name} src={props.product.image} />
                    </>
                )
            }
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
        >
            <Meta title={props.product.name} description={`${financial(props.product.price)} vnđ`} />
            <div className="queue-demo">
                <QueueAnim className="demo-content"
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }
                    ]}
                >
                {
                    hover ? (
                        <div className="demo-thead" key="a" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Space size="small" style={{ marginTop: "1em" }}>
                                <Button onClick={()=> props.setVisible(true)} type="primary" style={{ borderRadius: "0.3em" }}>
                                    Quick View
                                </Button>
                                <Button onClick={() => onQuickShop(props)} type="primary" style={{ borderRadius: "0.3em" }}>
                                    Quick Shop
                                </Button>
                            </Space>
                        </div>
                    ) : null
                }
                </QueueAnim>
            </div>
        </Card>
    )
}


function ViewProduct (params) {

    const { Meta } = Card;
    const { lg, md, sm, xs } = useBreakpoint()

    const [count, setCount] = useState(0);
    const [sizeList, setSizeList] = useState(0);
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
                    price: params.product.price,
                    image: params.product.image,
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
                    price: params.product.price,
                    image: values.product.image,
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
        setCount(0)
        params.showDrawer()
        setVisible(false)
    }   

    useEffect(() => {
        if(lg){
            setSizeList(5)
        }else if(sm == true && md == false){
            setSizeList(10)
        }else if(xs && md == false){
            setSizeList(22)
        }else{
            setSizeList(7)
        }
    });
    
    return(
        <>
            <Col offset={1} span={sizeList}>
                <ViewList key={params.product.id} product={params.product} setVisible={setVisible}></ViewList>
            </Col>
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
                    <Col span={11}>
                        <Card
                            hoverable
                            style={{ textAlign: "center" }}
                            cover={<Image alt={params.product.name} src={params.product.image} width={md ? 300 : null} />}
                        >
                            <Meta title={params.product.name} description={`${financial(params.product.price)} vnđ`} />
                        </Card>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <div>
                            <Row justify="center" align="middle">
                                <Space>
                                <Col>
                                    <Button onClick={() => {
                                        onDecrement()
                                    }}>
                                        <LeftOutlined />
                                    </Button> 
                                </Col>
                                <Col>
                                    <span style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>{count}</span>
                                </Col>
                                <Col>
                                <Button onClick={() => {
                                        onIncrement()
                                    }}>
                                        <RightOutlined />
                                    </Button> 
                                </Col>
                                </Space>
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
        
        const stateRoot = useSelector(state => state)    
        const history = useHistory()
        const dispatch = useDispatch();

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

                const linkAPI = `${process.env.REACT_APP_API}/products`

                const result = await axios.get(
                    linkAPI,
                );
                setProducts(result.data.Products);
            }
              fetchData();
        }, []);
    
        return(
          <div>
                <br></br>
                <Row justify="center" align="middle">
                {
                    
                    products.map((product, id) => {
                        return (
                            <ViewProduct key={id} product={product} showDrawer={showDrawer}></ViewProduct> 
                        )
                    })
                }
              </Row>

                <Drawer
                    title="SHOPPING CART"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visibleDrawer}
                >
                <br></br>
                    {
                        stateRoot.carts.map(c => {
                            return (
                                <>
                                <Row key={c.name}>
                                    <Space size="small">
                                        <Col span={12} style={{ marginLeft: "1em" }}>
                                            <Badge count={c.quantity}>
                                                <Image src={c.image} alt="image product"></Image>
                                            </Badge>
                                        </Col>
                                        <Col span={12} style={{ display: "flex", flexDirection: "column" ,justifyContent: "center", alignItems: "end" }}>
                                            <Row>
                                                <Tag color="green">{c.name}</Tag>
                                            </Row>
                                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                                            <Row>
                                                <Tag color="green">{financial(c.price)} vnđ</Tag>
                                            </Row>
                                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                                            <Row>
                                            <Tag color="volcano">
                                                <DeleteOutlined onClick={() => {
                                                    dispatch(DeleteCart(c.id))
                                                }} />
                                            </Tag>  
                                            </Row>
                                        </Col>
                                    </Space>
                                </Row>
                                <br></br>
                                </>
                            )
                        })
                    }
                    <Space style={{ marginLeft: "1em" }}>
                        <Button onClick={() => changePage("cart")}>Go to cart</Button>
                        <Button onClick={() => changePage("checkout")}>Check out</Button>
                    </Space>
                </Drawer>
          </div>
        )
}

export default Home;