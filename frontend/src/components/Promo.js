import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Promo = () => {

    const [form] = Form.useForm();
    const [promo, setPromo] = useState({});
    const [data, setData] = useState("");
    const [path, setPath] = useState("");
    const [change, setChange] = useState(0);

    const onFinish = values => {
        const newPromo = [
            {
                name: values.Name,
                quantity: values.Quantity,
                price: values.Price,
                code: values.Code
            }
        ]

        setPromo(newPromo[0])
        onReset()
    };

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        async function fetchData() {
            await axios.post(
                'http://localhost:3000/promos', promo
            ).then(res => console.log(res)).catch(err => console.log(err))
        }
        fetchData();
    }, [promo]);

    return (
        <div>

            { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

            <article>this is Home</article>
            <button onClick={() => {
                setData("products")
                setPath("products")
                setChange(1)
            }}>
                Products
            </button>
            <button onClick={() => {
                setData("cart")
                setPath("cart")
                setChange(1)
            }}>
                Cart
            </button>
            <button onClick={() => {
                setData("promos")
                setPath("promos")
                setChange(1)
            }}>
                Promo
            </button>

            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="Quantity" label="Quantity" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="Code" label="Code" rules={[{ required: true }]}>
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
        </div>
    )
}

export default Promo