import React from 'react'
import { Form, Input, Button } from "antd";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Header from './Header'
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const VIewCart = (props) => {
    return (
        <>
            <ul>
                <li>{props.cart.name}</li>
                <li>{props.cart.quantity}</li>
            </ul>
        </>
    )
}


const Checkout = (props) => {

    const [form] = Form.useForm();
    const history = useHistory()
    const stateCart = useSelector(state => state.carts);

    const onFinish = values => {
        values.cart = {stateCart}
        values.subtotal = props.location.data
        axios.post('http://localhost:3000/order', values).then(res => console.log(res)).catch(err => console.log(err))
        form.resetFields();
        history.push("/")
    };
    
    const onReset = () => {
        form.resetFields();
    };

    const regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    return (
        <div>
            <Header name="Check out"></Header>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: new RegExp(regexp), message: "Wrong phone number!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                    Reset
                    </Button>
                </Form.Item>
            </Form>

            {
                stateCart.map(c => {
                    return <VIewCart key={c.name} cart={c}></VIewCart>
                })
            }
            <p>Subtotal: {props.location.data}</p>
        </div>
    )
}

export default Checkout
