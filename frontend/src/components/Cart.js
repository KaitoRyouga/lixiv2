import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Image, Alert, Row, Col} from "antd";
import ResetCart from '../actions/Cart/ResetCart'
import { LeftOutlined, RightOutlined} from '@ant-design/icons'
import EditCart from '../actions/Cart/EditCart'
import DeleteCart from '../actions/Cart/DeleteCart'
import Header from './Header'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ViewCart = (props) => {

    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [showMessengeCount, setShowMessengeCount] = useState(false);
    const pricePresent = props.products.filter(p => p.name === props.cart.name)

    const onDecrement = (id) => {
        dispatch(EditCart(id, -1))
        if (count - 1 !== 0) {
            props.updateTotal(-pricePresent[0].price)
        }
        setCount(count - 1)
        setShowMessengeCount(false)
    }

    const onIncrement = (id) => {
        if (count + 1 > pricePresent[0].quantity) {
            setShowMessengeCount(true)
        } else {
            dispatch(EditCart(id, 1))
            props.updateTotal(pricePresent[0].price)
            setCount(count + 1)
        }
    }

    const onDelete = (id) => {
        dispatch(DeleteCart(id))
    }

    useEffect(() => {
        setCount(props.cart.quantity)
    }, [props])

    return (
        <div>
            <ul>
                <li>
                    <Image src={pricePresent[0].image} alt="image"></Image>
                </li>
                <Button onClick={() => onDelete(props.cart.id)}>Delete</Button>
                <li>Name: {props.cart.name}</li>
                <Row>
                        <Col span={8}>
                            <Button onClick={() => {
                                onDecrement(props.cart.id)
                            }}>
                                <LeftOutlined />
                            </Button> 
                        </Col>
                        <Col span={8}>
                            <p>quantity: {count}</p>
                        </Col>
                        <Col span={8}>
                        <Button onClick={() => {
                                onIncrement(props.cart.id)
                            }}>
                                <RightOutlined />
                            </Button> 
                        </Col>
                    </Row>
                <li>price: {pricePresent[0].price}</li>
                <li>total: {pricePresent[0].price*props.cart.quantity}</li>
            </ul>
            {
                showMessengeCount && <MessengeQuantity error={pricePresent[0]}></MessengeQuantity>
            }
        </div>
    )
}

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

const Cart = () => {
    const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    const [showMessengeWarning, setShowMessengeWarning] = useState(false);
    const [showMessengeSuccess, setShowMessengeSuccess] = useState(false);

    const messageWarning = (<Alert
        message="Warning"
        description="Code incorrect"
        type="warning"
        showIcon
        closable
    />)

    const messageSuccess = (<Alert
        message="Success"
        description="Code correct"
        type="success"
        showIcon
        closable
    />)

    const onFinish = values => {
        const checkPromo = stateRoot.promos.filter(p => p.code === values.Code)
        if (checkPromo.length === 0) {
            setShowMessengeWarning(true)
            setShowMessengeSuccess(false)
            onReset()
        }else if(checkPromo[0].quantity > 0) {
            if (total - checkPromo[0].price < 0) {
                setTotal(0)
            }else{
                setTotal(total - checkPromo[0].price)
            }
            
            setShowMessengeSuccess(true)
            setShowMessengeWarning(false)
        }
    };
    
    const onReset = () => {
        form.resetFields();
    };

    const onResetCart = () => {
        dispatch(ResetCart([]))
        setTotal(0)
    }

    const updateTotal = (newTotal) => {
        setTotal(total + newTotal)
    }

    const onCheckout = () => {
        // console.log("check out")
        // history.push('/checkout')
        setChange(1)
    }

    useEffect(() => {
        let sumSub = 0;
        const subtotal = stateRoot.carts.map(c => {
            const prod = stateRoot.products.filter(pro => pro.name === c.name);
            let sub;
            if (prod[0].quantity < c.quantity) {
                sub = prod[0].quantity*prod[0].price;
            } else {
                sub = c.quantity*prod[0].price;
            }
            
            sumSub += sub
            return sumSub
        })
        setTotal(sumSub)
        return subtotal
    }, [stateRoot])

    return (
        <div>
            { change ? <Redirect to={{ pathname: "/checkout", data: total }} /> : null }

            <Header name="Cart"></Header>

            { stateRoot.carts === undefined ||
                stateRoot.carts.map(c => {
                    return <ViewCart key={c.name} cart={c} products={stateRoot.products} carts={stateRoot.carts} updateTotal={updateTotal}></ViewCart>
                })
            }
            <p>Subtotal: {total}</p>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="Code" label="Code" rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>
                {
                    showMessengeWarning && messageWarning
                }
                {
                    showMessengeSuccess && messageSuccess
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                    Reset
                    </Button>
                    <Button htmlType="button" onClick={onResetCart}>
                    Reset all cart
                    </Button>
                    <Button htmlType="button" onClick={onCheckout}>
                    Check out
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Cart