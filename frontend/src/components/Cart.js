import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Image, Row, Col, Table, Space, Tag, Modal, Typography, Divider } from "antd";
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import EditCart from '../actions/Cart/EditCart'
import DeleteCart from '../actions/Cart/DeleteCart'
import { DeleteOutlined } from '@ant-design/icons'
import financial from './financial'
  
let data = [];

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Cart = () => {

    const { Text } = Typography;

    const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0);
    const [countPromo, setCountPromo] = useState(0);
    const [preTotal, setPreTotal] = useState(0);
    const [percent, setPercent] = useState(0);
    const [,updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);

    const columns = [
        {
          title: 'PRODUCT',
          dataIndex: 'product',
          responsive: ['sm'],
          render: (product, all) => (
            <Row type="flex" align="middle">
                <Space size="middle">
                    <Col span={12}>
                        <Image src={`${product[1]}`} alt={product[0]} width={120} height={150}></Image>
                    </Col>
                    <Col>             
                        <Row>
                            <Col span={12}>
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
                <Row type="flex" align="middle">
                    <Space size="middle">
                        <Col>
                            <Image src={`${product[1]}`} alt={product[0]}></Image>
                        </Col>
                        <Col>        
                            <Row>
                                <Col span={12}>
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
                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                            <Row>
                                <Col>
                                    <Tag color="green">{financial(all.price)} vnđ</Tag>
                                </Col>
                            </Row>
                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                            
                            <Row>
                                <Col span={6}>
                                    <Tag color="green" onClick={() => {
                                        onDecrement(all.key)
                                    }}>
                                        <LeftOutlined />
                                    </Tag> 
                                </Col>
                                <Col span={8} type="flex" align="center" justify="center" style={{ marginLeft: "0.5em" }}>
                                    <p>{all.quantity}</p>
                                </Col>
                                <Col span={6}>
                                    <Tag color="green" onClick={() => {
                                        onIncrement(all.key)
                                    }}>
                                        <RightOutlined />
                                    </Tag> 
                                </Col>
                            </Row>
                        </Col>
                    </Space>
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
            render: () => (
                <Tag color="green">
                    {financial(total)} vnđ
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

    const onFinish = values => {
        const checkPromo = stateRoot.promos.filter(p => p.code === values.Code)
        if (checkPromo.length === 0) {
            messageWarning()
            onReset()
        }else if(checkPromo[0].quantity > 0) {
            setPercent(checkPromo[0].price/total)
            setPreTotal(total)
            if (total - checkPromo[0].price < 0) {
                setCountPromo(countPromo + 1)
                setTotal(0)
            }else{
                setTotal(total - checkPromo[0].price)
                setCountPromo(countPromo + 1)
            }
            
            messageSuccess()
        }
    };
    
    const onReset = () => {
        form.resetFields();
    };

    const updateTotal = (newTotal) => {
        setTotal(total + newTotal)
    }

    const onCheckout = () => {
        setChange(1)
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

    return (
        <div>
            { change ? <Redirect to={{ pathname: "/checkout", data: total }} /> : null }

            { stateRoot.carts === undefined ||
                stateRoot.carts.map(c => {
                    const product = stateRoot.products.filter(p => p._id === c.id)
                    if(product){
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
            <Row justify="space-around">
                <Col>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="Code" label="Code" rules={[{ required: true }]}>
                            <Input disabled={percent !== 0 && countPromo == 1 ? true : false} type="text" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col>
                    <p>
                        SUBTOTAL: {
                            percent !== 0 && countPromo == 1 && (
                                <div>
                                    <Text delete type="secondary">{financial(preTotal)} vnđ </Text>
                                    <Text type="success">(giảm {Math.floor(percent)}%)</Text>
                                    <br></br>
                                    <Tag color="green">
                                        <Text  type="success">{financial(total)} vnđ</Text>
                                    </Tag>
                                </div>
                            ) || (
                                <Tag color="green">
                                    <Text  type="success">{financial(total)} vnđ</Text>
                                </Tag>
                            )
                        }
                    </p>
                    <Button type="primary" onClick={onCheckout}>
                        Check Out
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Cart