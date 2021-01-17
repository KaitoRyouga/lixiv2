import React, { useState, useEffect, useRef } from 'react'
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
    const Option = Select.Option;
    const formRef = useRef(null);
    const dispatch = useDispatch()
    const stateUser = useSelector(state => state.users)
    const [admin, setAdmin] = useState(false)
    
    const checkAdmin = (res) => {
        setAdmin(res.data.admin)
    }

    axios.get(
        'http://localhost:3000/admin', {
          headers: {
            'uid': stateUser[0].uid
          }
        }
    ).then(res => checkAdmin(res)).catch(err => console.log(err))

    const onFinish = values => {
        console.log(values)
        const newProduct = [
            {
                status: values.status
            }
        ]
        axios.put(`http://localhost:3000/order/${props.order._id}`, newProduct[0]).then(res => dispatch(EditOrder(props.order._id, res))).catch(err => console.log(err))
    };

    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                status: props.order.status,
            })
        }, 600);
    }, [props]);
    
    return(
        <>
            <ul>
                <li>Name: {props.order.name}</li>
                <li>Phone: {props.order.phone}</li>
                <li>Address: {props.order.address}</li>
                {
                    props.order.cart.stateCart.map(c => {
                        return (
                            <div key={c.name}>
                                <li>{c.name}</li>
                                <li>{c.quantity}</li>
                            </div>
                        )
                    })
                }
                <li>Subtotal: {props.order.subtotal}</li>
            
            {
                admin && (
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} ref={formRef}>
                        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                            <Select>
                                <Option selected value={props.order.status}>{props.order.status}</Option>
                                <Option value={props.order.status !== "processing" ? "processing" : "delivered"}>{props.order.status !== "processing" ? "processing" : "delivered"}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) || <li>{props.order.status}</li>
            }
            </ul>
        </>
    )
}


const Order = () => {

    const stateRoot = useSelector(state => state.orders);
    const stateUser = useSelector(state => state.users)
    const [admin, setAdmin] = useState(false)
    const checkAdmin = (res) => {
        setAdmin(res.data.admin)
    }

    axios.get(
        'http://localhost:3000/admin', {
          headers: {
            'uid': stateUser[0].uid
          }
        }
    ).then(res => checkAdmin(res)).catch(err => console.log(err))

    return (
        <div>
            {/* <Header name="Order"></Header> */}
            {
                stateRoot.map(s => {
                    if(s.author === stateUser[0].uid && admin === false) {
                        return <ViewOrder key={s._id} order={s}></ViewOrder>
                    }
                })
            }

            {
                stateRoot.map(s => {
                    if(admin === true) {
                        return <ViewOrder key={s._id} order={s}></ViewOrder>
                    }
                })
            }
        </div>
    )
}

export default Order
