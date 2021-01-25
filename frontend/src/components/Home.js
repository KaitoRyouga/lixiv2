import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button, Alert, Modal, Drawer, Tag, Image, Space, Badge, Card, Grid, Slider, Select, Divider  } from "antd";
import axios from 'axios'
import { LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons'
import AddCart from '../actions/Cart/AddCart'
import DeleteCart from '../actions/Cart/DeleteCart'
import { useDispatch, useSelector } from 'react-redux'
import financial from './financial'
import { useHistory, useParams } from "react-router-dom";
import QueueAnim from 'rc-queue-anim';
import Slide from "./Slide"
import Messenge from './Messenge'

const { useBreakpoint } = Grid;
const { Option } = Select;

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
    const { lg, xs } = useBreakpoint()

    const dispatch = useDispatch();
    const history = useHistory();
    const [hover, setHover] = useState(false);

    const onQuickShop = (values) => {

        const newCart = [{
            id: values.product._id,
            name: values.product.name,
            size: values.product.size[0],
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
            onClick={()=> props.setVisible(true)}
            style={ hover && lg && {
                height:"43em",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position:"relative"
            } || {
                textAlign: "center",
                marginBottom:"2em",
                height: xs ? "30em" : "38em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position:"relative"
            }}
            cover={(
                    <>
                        <img style={{
                            marginBottom: xs ? "5.5em" : null
                        }} alt={props.product.name} src={props.product.image} />
                    </>
                )
            }
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
        >
            <div style={ {
                position: "absolute",
                bottom: "20px",
                left:"50%",
                transform: "translateX(-50%)"
            }
            }>
            <Meta title={props.product.name} description={`${financial(props.product.price)} vnđ`} />
            <div className="queue-demo">
                <QueueAnim className="demo-content"
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }
                    ]}
                >
                {
                    hover || xs ? (
                        <div className="demo-thead" key="a" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Space size="small" style={{ marginTop: "1em" }}>
                                <Button onClick={()=> props.setVisible(true)} type="primary" style={{ borderRadius: "0.3em" }}>
                                    {/* Quick View */}
                                    {Messenge("quickView")}
                                </Button>
                                <Button onClick={() => onQuickShop(props)} type="primary" style={{ borderRadius: "0.3em" }}>
                                    {/* Quick Shop */}
                                    {Messenge("quickShop")}
                                </Button>
                            </Space>
                        </div>
                    ) : null
                }
                </QueueAnim>
            </div>
            </div>
        </Card>
    )
}

function ViewProduct (params) {

    const { lg, md, sm, xs } = useBreakpoint()

    const [count, setCount] = useState(1);
    const [sizeShoes, setSizeShoes] = useState(0);
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
                    size: sizeShoes,
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
                    size: sizeShoes,
                    price: params.product.price,
                    image: params.product.image,
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
        if(count === 1){
            const cartTemp = [
                {   
                    id: params.product._id,
                    name: params.product.name,
                    size: sizeShoes,
                    price: params.product.price,
                    image: params.product.image,
                    quantity: count
                }
            ];
            addCart(cartTemp)
        }
        setCount(1)
        params.showDrawer()
        setVisible(false)
    }   

    function onChange(value) {
        setSizeShoes(value  )
    }

    useEffect(() => {
        if(lg){
            setSizeList(5)
        }else if(sm == true && md == false){
            setSizeList(10)
        }else if(xs && md == false){
            setSizeList(11)
        }else{
            setSizeList(7)
        }
    });

    const onChangeSize = (e) => {
        setSizeShoes(e)
    }

    useEffect(() => {
        setSizeShoes(params.product.size[0])
    }, [params]);

    return(
        <>
            <Col span={sizeList}>
                <ViewList key={params.product.id} product={params.product} setVisible={setVisible}></ViewList>
            </Col>
            {
                showMessenge && messageWarning
            }
            {
                showMessengeCount && <MessengeQuantity key={params.product.id} error={params.product}></MessengeQuantity>
            }
            <Modal
                title={Messenge("quickView")}
                centered
                visible={visible}
                onOk={() => {
                    setVisible(false)                    
                }}
                onCancel={() => {
                    setVisible(false)
                }}
                width={1000}
            >
                <Row
                    style={{
                        padding: "1em"
                    }}
                >
                    <Col span={sm ? 11 : 24}>
                        <Slide product={params.product} ></Slide>
                    </Col>
                    {/* <Col span={sm ? 2 : 24}></Col> */}
                    <Col span={xs ? 24 : 11} style={ xs && {
                        marginTop: "5em"
                    } || {
                        marginLeft: "5em"
                    }}>
                        <div>
                            <Row justify="center" align="middle">
                                
                                {
                                    sizeShoes && (
                                        <Col span={24}>
                                            <span style={{ marginRight: "0.2em" }}>Size:</span>
                                            <Select defaultValue={sizeShoes} onChange={(e) => onChangeSize(e)}>
                                                {
                                                    params.product.size.map(s => {
                                                        return(
                                                            <Option key={s} value={s}>{s}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    )
                                }
                                <div style={{ margin: "1em" }}></div>
                                <Col span={24}>
                                <Row justify="start">
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

        let { categoryName } = useParams();

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

        useEffect( async () => {

            let result;

            if (categoryName  === undefined) {
                const linkAPI = `${process.env.REACT_APP_API}/products`

                result = await axios.get(
                    linkAPI,
                );
            } else {
                const linkAPI = `${process.env.REACT_APP_API}/category/${categoryName}`

                result = await axios.get(
                    linkAPI,
                );
            }

            setProducts(result.data.Products);

        }, [categoryName]);

        const memoProductList = useMemo(() => 
            products.map((product, id) => {
                return (
                    <ViewProduct key={id} product={product} showDrawer={showDrawer}></ViewProduct> 
                )
            }, [products])
        )
    
        return(
          <div>
                <br></br>
                <Row justify="space-around" align="middle">
                    {memoProductList}
              </Row>

                <Drawer
                    title={Messenge("shoppingCart")}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visibleDrawer}
                >
                <br></br>
                    {
                        stateRoot.carts.map(c => {
                            return (
                                <div key={c.name}>
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
                                </div>
                            )
                        })
                    }
                    <Space style={{ marginLeft: "1em" }}>
                        <Button onClick={() => changePage("cart")}>{Messenge("goToCart")}</Button>
                        <Button onClick={() => changePage("checkout")}>{Messenge("checkOut")}</Button>
                    </Space>
                </Drawer>
          </div>
        )
}

export default Home;