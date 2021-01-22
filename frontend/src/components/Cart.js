import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Image, Row, Col, Table, Space, Tag, Modal, Typography, Divider, Grid } from "antd";
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import EditCart from '../actions/Cart/EditCart'
import DeleteCart from '../actions/Cart/DeleteCart'
import { DeleteOutlined } from '@ant-design/icons'
import financial from './financial'
import AddPromotion from '../actions/Promotion/AddPromotion'
  
const { useBreakpoint } = Grid;

let data = [];

const Cart = () => {

    const { Text } = Typography;
    const { lg, md, sm, xs } = useBreakpoint()

    const [total, setTotal] = useState(0);
    const [countPromo, setCountPromo] = useState(0);
    const [preTotal, setPreTotal] = useState(0);
    const [pricePromo, setPricePromo] = useState([]);
    const [percent, setPercent] = useState(0);
    const [enterPromo, setEnterPromo] = useState(false);
    const [promo, setPromo] = useState("");
    const [,updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    const [sizeListRight, setSizeListRight] = useState(0);
    const [sizeListLeft, setSizeListLeft] = useState(0);

    const history = useHistory()

    const changePage = (path) => {
        history.push(path)
    }

    const columns = [
        {
          title: 'PRODUCT',
          dataIndex: 'product',
          responsive: ['sm'],
          render: (product, all) => (
            <Row type="flex" align="middle">
                <Space size="middle">
                    <Col>
                        <Image src={`${product[1]}`} alt={product[0]} width={120} height={150}></Image>
                    </Col>
                    <Col>             
                        <Row>
                            <Col span={24}>
                                <Tag color="green">{product[0]}</Tag>
                            </Col>
                            <Divider dashed style={{ marginTop: "0.2em", marginBottom: "0.2em" }}></Divider>
                            <Col span={24}>
                                <Tag color="volcano">
                                    <DeleteOutlined onClick={() => {
                                        onDelete(all.key)
                                    }} />
                                </Tag>  
                            </Col>
                        </Row>
                    </Col>
                </Space>
            </Row>
          ),
        },
        {
            title: 'PRODUCT',
            dataIndex: 'product',
            responsive: ["xs"],
            render: (product, all) => (
                <Row>
                    <Col span={12}>
                        <Image src={`${product[1]}`} alt={product[0]}></Image>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>        
                        <Row>
                            <Col span={22} style={{ marginBottom: "0.3em" }}>
                                <Tag color="green">{product[0]}</Tag>
                            </Col>
                            <Col>
                                <Tag color="volcano">
                                    <DeleteOutlined onClick={() => {
                                        onDelete(all.key)
                                    }} />
                                </Tag>  
                            </Col>
                        </Row>
                        <Divider dashed style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></Divider>
                        <Row>
                            <Col>
                                <Tag color="green">{financial(all.price)} vnđ</Tag>
                            </Col>
                        </Row>
                        <Divider dashed style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></Divider>
                        
                        <Row justify="start" align="middle">
                            <Space>
                            <Col span={6}>
                                <Button onClick={() => {
                                    onDecrement(all.key)
                                }}>
                                    <LeftOutlined />
                                </Button> 
                            </Col>
                            <Col type="flex" align="center" justify="center" style={{marginTop: "1em"}}>
                                <p>{all.quantity}</p>
                            </Col>
                            <Col span={6}>
                                <Button onClick={() => {
                                    onIncrement(all.key)
                                }}>
                                    <RightOutlined />
                                </Button> 
                            </Col>
                            </Space>
                        </Row>
                        <Divider dashed style={{ marginTop: "1em", marginBottom: "1em" }}></Divider>
                        <Row>
                            <Tag color="green">
                                {financial(all.total)}
                            </Tag>
                        </Row>
                    </Col>
                </Row>
            ),
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          responsive: ['sm'],
          render: (price) => (
            <Tag color="green">{financial(price)} vnđ</Tag>
          )
        },
        {
          title: 'QUANTITY',
          dataIndex: 'quantity',
          responsive: ['sm'],
          render: (quantity, all) => (
            <Row type="flex" align="middle">
                <Space size="small">
                    <Col span={6}>
                        <Button onClick={() => {
                            onDecrement(all.key)
                        }}>
                            <LeftOutlined />
                        </Button> 
                    </Col>
                    <Col span={24} type="flex" align="center" justify="center" style={{marginTop: "1em"}}>
                        <p>{quantity}</p>
                    </Col>
                    <Col span={6}>
                        <Button onClick={() => {
                            onIncrement(all.key)
                        }}>
                            <RightOutlined />
                        </Button> 
                    </Col>
                </Space>
            </Row>
          )
        },
        {
            title: 'TOTAL',
            dataIndex: 'total',
            responsive: ['sm'],
            render: (totalItem) => (
                <Tag color="green">
                    {financial(totalItem)} vnđ
                </Tag>
            )
        },
    ];

    data = []

    const onDecrement = (id) => {
        const cartDest = data.findIndex(d => d.key === id)
        updateTotal(-data[cartDest].price)
        dispatch(EditCart(id, -1))
        data[cartDest].quantity = stateRoot.carts[cartDest].quantity
        data[cartDest].total = stateRoot.carts[cartDest].quantity * data[cartDest].price
        forceUpdate()
    }

    const onIncrement = (id) => {

        const cartDest = data.findIndex(d => d.key === id)
        const productDest = stateRoot.products.findIndex(d => d._id === id)

        if (data[cartDest].quantity >= stateRoot.products[productDest].quantity) {
            fail(`Quantity of ${data[cartDest].name} max is ${stateRoot.products[productDest].quantity}`)
        }else{
            updateTotal(data[cartDest].price)
            dispatch(EditCart(id, 1))
            data[cartDest].quantity = stateRoot.carts[cartDest].quantity
            data[cartDest].total = stateRoot.carts[cartDest].quantity * data[cartDest].price
            forceUpdate()
        }
    }

    const fail = (victim) => {
        Modal.error({
          title: 'Login fail',
          content: `${victim}, try again !!!`,
        });
        forceUpdate()
    }

    const messageWarning = () => {
        Modal.warning({
          title: 'Warning',
          content: `Code incorrect, try again !!!`,
        });
        forceUpdate()
    }

    const messageSuccess = () => {
        Modal.success({
          title: 'Success',
          content: `Code correct, happy shoppping !!!`,
        });
        forceUpdate()
    }

    const onFinish = () => {
        const checkPromo = stateRoot.promos.filter(p => p.code === promo)
        setPricePromo(checkPromo)
        setEnterPromo(true)
    };
    
    const onReset = () => {
        form.resetFields();
    };

    const updateTotal = (newTotal) => {
        setTotal(total + newTotal)
    }

    const onDelete = (id) => {
        dispatch(DeleteCart(id))
    }
    

    useEffect(() => {
        let sumSub = 0;
        const subtotal = stateRoot.carts.map(c => {
            const prod = stateRoot.products.filter(pro => pro.name === c.name);
            if (prod.length !== 0) {
                let sub;
                if (prod[0].quantity < c.quantity) {
                    sub = prod[0].quantity*prod[0].price;
                } else {
                    sub = c.quantity*prod[0].price;
                }
                
                sumSub += sub
                return sumSub   
            }
        })
        setTotal(sumSub)
        return subtotal
    }, [stateRoot])

    useEffect(() => {
        if(pricePromo.length !== 0){
            if(pricePromo[0].quantity > 0 && enterPromo === true) {
                setPercent(pricePromo[0].price)
                setPreTotal(total)
                dispatch(AddPromotion(pricePromo))
                if (total - pricePromo[0].price < 0) {
                    setCountPromo(countPromo + 1)
                    setTotal(0)
                }else{
                    setTotal(total - pricePromo[0].price)
                    setCountPromo(countPromo + 1)
                }
                
                messageSuccess()
            }
        }else if(pricePromo.length === 0 && enterPromo === true) {
            messageWarning()
            onReset()
        }
    }, [pricePromo, enterPromo])

    useEffect(() => {
        if (preTotal !== 0 && preTotal - total !== pricePromo[0].price) {
            setPreTotal(total)
            if (total - pricePromo[0].price < 0) {
                setTotal(0)
            }else{
                setTotal(total - pricePromo[0].price)
            }
        }
    }, [total])

    useEffect(() => {
        // console.log("lg: ", lg)
        // console.log("md: ", md)
        // console.log("sm: ", sm)
        // console.log("xs: ", xs)

        if (percent !== 0 && countPromo == 1) {
            if(lg){ // lg
                console.log("check")
                setSizeListRight(24)
                setSizeListLeft(24)
            }else if(sm == true && md == false){ // sm
                setSizeListRight(24)
                setSizeListLeft(24)
            }else if(xs && md == false){ // xs
                setSizeListRight(24)
                setSizeListLeft(23)
            }else{ // md
                setSizeListRight(7)
            }
        } else {
            if(lg){ // lg
                setSizeListRight(11)
                setSizeListLeft(6)
            }else if(sm == true && md == false){ // sm
                setSizeListRight(24)
                setSizeListLeft(24)
            }else if(xs && md == false){ // xs
                setSizeListRight(24)
                setSizeListLeft(23)
            }else{ // md
                setSizeListRight(7)
            }
        }
    });

    return (
        <div>
            { 
                stateRoot.carts === undefined ||
                stateRoot.carts.map(c => {
                    const product = stateRoot.products.filter(p => p._id === c.id)
                    if(product.length !== 0){
                        data.push({
                            key: c.id,
                            product: [c.name, product[0].image],
                            price: product[0].price,
                            quantity: c.quantity,
                            total: product[0].price * c.quantity,  
                        })
                    }
                })
            }

            <Table columns={columns} dataSource={data} pagination={false} />
            {
                total > 0 && (
                    <Row justify="space-around" >
                        <Col span={12} style={{ padding: "16px" }}>
                            <Row justify="start">
                                <Col span={12}>
                                    <Input disabled={percent !== 0 && countPromo == 1 ? true : false} type="text" placeholder="coupon code" value={promo} onChange={(event) => setPromo(event.target.value) } />
                                </Col>
                                <Col span={1}></Col>
                                <Col span={11}>
                                    <Button type="primary" onClick={onFinish} >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} style={{ textAlign: "right", padding: "16px" }}>
                            <Row align="middle" justify="end">
                                <Col span={sizeListRight}>
                                    <Text>SUBTOTAL: </Text> 
                                </Col>
                                <Col span={1}></Col>
                                {
                                    percent !== 0 && countPromo == 1 && (
                                        <Col span={sizeListLeft}>
                                            <Text delete type="secondary">{financial(preTotal)} vnđ </Text>
                                            <Text type="success">(giảm {financial(percent)} vnđ)</Text>
                                            <br></br>
                                            <Tag color="green" style={{ marginRight: 0 }}>
                                                {financial(total)} vnđ
                                            </Tag>
                                        </Col>
                                    ) || (
                                        <Col span={sizeListLeft}>
                                            <Text style={{ margin: 0, padding: 0} }>
                                                {financial(total)} vnđ
                                            </Text>
                                        </Col>
                                    )
                                }
                            </Row>
                            <Divider></Divider>
                            <Row align="middle" justify="end">
                                <Col span={24}>
                                    <Button type="primary" onClick={() => changePage("/checkout")}>
                                        Check Out
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )
            }
        </div>
    )
}

export default Cart