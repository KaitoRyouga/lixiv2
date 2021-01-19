import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Badge, Image, Row, Col, Divider, Typography, Tag } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import AddOrder from '../actions/Order/AddOrder'
import ResetCart from '../actions/Cart/ResetCart'
import financial from './financial'

let listData = [];

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const Checkout = (props) => {

    const { Text } = Typography;

    const [form] = Form.useForm();
    const history = useHistory()
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    const [total, setTotal] = useState(0);

    listData = []

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
        axios.post(`http://${process.env.REACT_APP_API}/orders`, values).then(res => dispatch(AddOrder(res))).catch(err => console.log(err))
        form.resetFields();
        history.push("/")
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

    const regexp = /(\+(84)+(9|3|7|8|5)+([0-9]{8})\b)/g;

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
            <Row justify="space-between">
                <Col span={12}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input type="text" placeholder="Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: new RegExp(regexp), message: "Wrong phone number!" }]}>
                        <Input type="text" placeholder="0909259713" />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input type="text" placeholder="139 Xuân Hồng" />
                    </Form.Item>
                    
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Order
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
                <Col span={1}>
                    
                </Col>
                <Col span={11}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.key}
                            >
                                <Row justify="space-between" align="middle">
                                    <Col span="8">
                                        <Row justify="space-between" align="middle">
                                            <Col span={12}>
                                                <Badge count={item.quantity}>
                                                    <Image
                                                        width="4.6em"
                                                        height="6em"
                                                        alt="logo"
                                                        src={item.image}
                                                    />
                                                </Badge>
                                            </Col>
                                            <Col span={12}>
                                                <Text>{item.name}</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span="14">
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
                                                                <Text>Coupon:</Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span="14">
                                                        <Text><Tag color="green">{stateRoot.promotion[0].code}</Tag>giảm {financial(stateRoot.promotion[0].price)} vnđ</Text>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                        <Row justify="space-between" align="middle">
                                            <Col span="8">
                                                <Row justify="space-between" align="middle">
                                                    <Col>
                                                        <Text>Total:</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span="14">
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
