import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Form, Input, Button, Image, Alert} from "antd";
import ResetCart from '../actions/Cart/ResetCart'
import { useDispatch } from 'react-redux'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ViewCart = (props) => {

    const pricePresent = props.products.filter(p => p.name === props.cart.name)
    const checkErrorCount = props.errorquantity.filter(e => e.namequantity === props.cart.name)

    return (
        <div>
            <ul>
                <li>
                    <Image src={pricePresent[0].image} alt="image"></Image>
                </li>
                <li>Name: {props.cart.name}</li>
                <li>quantity: {checkErrorCount.length > 0 ? checkErrorCount[0].quantity : props.cart.quantity}</li>
                <li>price: {pricePresent[0].price}</li>
                <li>total: {checkErrorCount.length > 0 ? pricePresent[0].price*checkErrorCount[0].quantity : pricePresent[0].price*props.cart.quantity}</li>
            </ul>
            {
                checkErrorCount.map(c => {
                    return <MessengeQuantity errorcount={c}></MessengeQuantity>
                })
            }
        </div>
    )
}

const MessengeQuantity = (props) => {

    return (
        <Alert
            message="Warning"
            description={`Quantity of ${props.errorcount.namequantity} max is ${props.errorcount.quantity}`}
            type="warning"
            showIcon
            closable
        />
    )
}

const Cart = () => {

    const [data, setData] = useState("");
    const [path, setPath] = useState("");
    const [total, setTotal] = useState(0);
    const [change, setChange] = useState(0);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const stateRoot = useSelector(state => state);
    const [showMessengeWarning, setShowMessengeWarning] = useState(false);
    const [showMessengeSuccess, setShowMessengeSuccess] = useState(false);
    const [errorQuantity, setErrorQuantity] = useState([]);

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
        console.log(checkPromo[0])
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

    useEffect(() => {
        const subtotal = stateRoot.carts.map(c => {
            const prod = stateRoot.products.filter(pro => pro.name === c.name);
            let sub;
            let error = {
                namequantity: "",
                quantity: 0
            }
            if (prod[0].quantity < c.quantity) {
                sub = prod[0].quantity*prod[0].price;
                error.namequantity = c.name;
                error.quantity = prod[0].quantity;
                errorQuantity.push(error)
                setErrorQuantity(errorQuantity)
            } else {
                sub = c.quantity*prod[0].price;
            }
            
            return setTotal(prevState => (prevState + sub))
        })
        return subtotal
    }, [stateRoot, errorQuantity])

    return (
        <div>

            { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

            <article>This is Cart</article>
            <button onClick={() => {
                    setData("home")
                    setPath("/")
                    setChange(1)
                }}>
                    Home
                </button>

            { stateRoot.carts === undefined ||
                stateRoot.carts.map(c => {
                    return <ViewCart key={c.name} cart={c} products={stateRoot.products} carts={stateRoot.carts} errorquantity={errorQuantity}></ViewCart>
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
                </Form.Item>
            </Form>
        </div>
    )
}

export default Cart