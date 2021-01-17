import React from 'react'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Select, Button } from 'antd'
import axios from 'axios'
import EditOrder from '../actions/Order/EditOrder'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ViewOrder = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinish = values => {
        console.log(values)
        const newProduct = [
            {
                status: values.status
            }
        ]
        axios.put(`http://localhost:3000/order/${props.order._id}`, newProduct[0]).then(res => dispatch(EditOrder(props.order._id, res))).catch(err => console.log(err))
        // form.resetFields();
    };
    
    return(
        <>
            <ul>
                <li>Name: {props.order.name}</li>
                <li>Phone: {props.order.phone}</li>
                <li>Address: {props.order.address}</li>
                {
                    props.order.cart.stateCart.map(c => {
                        return (
                            <>
                                <li>{c.name}</li>
                                <li>{c.quantity}</li>
                            </>
                        )
                    })
                }
                <li>Subtotal: {props.order.subtotal}</li>
            </ul>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select defaultValue={props.order.status}>
                        <Option selected value={props.order.status}>{props.order.status}</Option>
                        <Option selected value={props.order.status !== "processing" ? "processing" : "delivered"}>{props.order.status !== "processing" ? "processing" : "delivered"}</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}


const Order = () => {

    const stateRoot = useSelector(state => state.orders);

    return (
        <div>
            <Header name="Order"></Header>
            {
                stateRoot.map(s => {
                    return <ViewOrder key={s._id} order={s}></ViewOrder>
                })
            }
        </div>
    )
}

export default Order
