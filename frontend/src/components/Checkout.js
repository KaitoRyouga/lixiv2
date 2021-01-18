import React, { useState } from 'react'
import { Form, Input, Button, List, Badge, Image, Row, Col, Divider, Typography } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import AddOrder from '../actions/Order/AddOrder'
import ResetCart from '../actions/Cart/ResetCart'

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
    const stateCart = useSelector(state => state.carts);
    const stateUser = useSelector(state => state.users);
    const stateProduct = useSelector(state => state.products);

    listData = []

    const onFinish = values => {
        values.cart = {stateCart}
        values.subtotal = props.location.data
        values.status = 'processing'
        values.author = stateUser[0].uid
        dispatch(ResetCart())
        axios.post('http://localhost:3000/orders', values).then(res => dispatch(AddOrder(res))).catch(err => console.log(err))
        form.resetFields();
        history.push("/")
    };

    const regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    return (
        <div>

            {
                stateCart.map((c, n) => {
                    const temp = stateProduct.filter(p => p._id === c.id)
                    if(n !== 0){
                        const tempPreTotal = listData[n-1].total[1]
                        listData.push({
                            key: temp[0]._id,
                            name: temp[0].name,
                            quantity: c.quantity,
                            total: [c.quantity * temp[0].price, tempPreTotal + c.quantity * temp[0].price],
                            image: temp[0].image,

                        })
                    }else{
                        listData.push({
                            key: temp[0]._id,
                            name: temp[0].name,
                            quantity: c.quantity,
                            total: [c.quantity * temp[0].price, c.quantity * temp[0].price],
                            image: temp[0].image,

                        })   
                    }
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
                                        <Text>{item.total[0]} vnđ</Text>
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
                                        <Row justify="space-between" align="middle">
                                            <Col span="8">
                                                <Row justify="space-between" align="middle">
                                                    <Col span={12}>
                                                        <Text>Subtotal:</Text>
                                                    </Col>
                                                    <Col span={12}>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span="14">
                                                <Text>{listData[listData.length-1].total[1]} vnđ</Text>
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
