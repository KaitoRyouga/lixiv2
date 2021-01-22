import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Badge, Image, Row, Col, Divider, Typography, Tag, Grid, Modal } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import AddOrder from '../actions/Order/AddOrder'
import ResetCart from '../actions/Cart/ResetCart'
import financial from './financial'

let listData = [];

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { useBreakpoint } = Grid;


const Checkout = () => {

    const { Text } = Typography;
    const { lg, md, sm, xs } = useBreakpoint()
    const [form] = Form.useForm();
    const history = useHistory()
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    const [total, setTotal] = useState(0);
    const [sizeListRight, setSizeListRight] = useState(0);
    const [sizeListLeft, setSizeListLeft] = useState(0);

    listData = []

    const successCode = () => {
        Modal.success({
          title: 'Order success',
          content: `Order Completed Successfully!`,
        });
      }

    const onFinish = values => {
        const stateCart = stateRoot.carts
        values.cart = {stateCart}

        if (stateRoot.promotion.length !== 0) {
            values.subtotal = total - stateRoot.promotion[0].price
        }else{
            values.subtotal = total
        }

        values.status = 'processing'
        values.author = stateRoot.users[0].uid
        dispatch(ResetCart())

        const linkAPI = `${process.env.REACT_APP_API}/orders`

        axios.post(linkAPI, values).then(res => dispatch(AddOrder(res))).catch(err => console.log(err))
        form.resetFields();
        history.push("/")
        successCode()
    };

    useEffect(() => {
        let sumSub = 0;
        const subtotal = stateRoot.carts.map(c => {
            const sub = c.quantity*c.price;
            sumSub += sub
        })
        setTotal(sumSub)
        return subtotal
    }, [stateRoot])

    useEffect(() => {

        if(lg){ // lg
            setSizeListRight(12)
            setSizeListLeft(9)
        }else if(sm == true && md == false){ // sm
            setSizeListRight(9)
            setSizeListLeft(9)
        }else if(xs && md == false){ // xs
            setSizeListRight(11)
            setSizeListLeft(12)
        }else{ // md
            setSizeListRight(9)
            setSizeListLeft(13)
        }
    });


    const regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    return (
        <div>

            {
                stateRoot.carts.map(c => {
                    listData.push({
                        key: c.id,
                        name: c.name,
                        quantity: c.quantity,
                        total: c.quantity * c.price,
                        image: c.image,
                    })
                })
            }
            <Row justify="center" align="middle">
                <Col span={md ? 12 : 24}>
                
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ margin: "1em"}}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input type="text" placeholder="Nguyễn Văn A" />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: new RegExp(regexp), message: "Wrong phone number!" }]}>
                            <Input type="text" placeholder="0909259713" />
                        </Form.Item>
                        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <Input type="text" placeholder="139 Xuân Hồng" />
                        </Form.Item>
                        
                        <Form.Item {...sm ? tailLayout : null}>
                            <Button type="primary" htmlType="submit">
                            Order
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </Col>
                <Col span={1}>
                    
                </Col>
                <Col span={md ? 11 : 24}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.key}
                            >
                                <Row justify="space-between" align="middle">
                                    <Col span="10">
                                        <Row justify="start" align="middle">
                                            <Col span={sizeListLeft}>
                                                <Badge count={item.quantity}>
                                                    <Image
                                                        width="4.6em"
                                                        height="6em"
                                                        alt="logo"
                                                        src={item.image}
                                                    />
                                                </Badge>
                                            </Col>
                                            <Col span={sizeListRight}>
                                                <Text>{item.name}</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span="10">
                                        <Tag color="green">{financial(item.total)} vnđ</Tag>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    >

                    </List>
                    <Divider></Divider>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={listData}
                        renderItem={(item, n) => {
                            if(n === listData.length-1){
                                return(
                                    <List.Item
                                        key={item.key}
                                    >
                                        {
                                            stateRoot.promotion.length !== 0 && (
                                                <Row justify="space-between" align="middle">
                                                    <Col span="8">
                                                        <Row justify="space-between" align="middle">
                                                            <Col>
                                                                <span>Coupon:</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span="10">
                                                        <Tag color="green">{stateRoot.promotion[0].code}</Tag>
                                                        <Tag color="green">giảm {financial(stateRoot.promotion[0].price)} vnđ</Tag>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                        <Divider dashed style={{ marginTop: "0.2em", marginBottom: "0.2em" }}></Divider>
                                        <Row justify="space-between" align="middle">
                                            <Col span="8">
                                                <Row justify="space-between" align="middle">
                                                    <Col>
                                                        <Text>Total:</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span="10">
                                                {
                                                    stateRoot.promotion.length !== 0 && (
                                                        <Tag color="green">{financial(total - stateRoot.promotion[0].price)} vnđ</Tag>
                                                    ) || (
                                                        <Tag color="green">{financial(total)} vnđ</Tag>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )
                            }
                        }}
                    >

                    </List>    
                </Col>
            </Row>
        </div>
    )
}

export default Checkout
