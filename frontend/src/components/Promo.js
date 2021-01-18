import React, { useEffect } from 'react';
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import EditPromo from '../actions/Promo/EditPromo'
import DeletePromo from '../actions/Promo/DeletePromo'
import AddPromo from '../actions/Promo/AddPromo'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ViewPromo = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinish = values => {
        const newPromo = [
            {
                name: values.name,
                quantity: values.quantity,
                price: values.price,
                code: values.code
            }
        ]
        
        axios.put(
            `http://${process.env.REACT_APP_API}:3000/promotion/${props.promo._id}`, newPromo[0]
        ).then(res => dispatch(EditPromo(props.promo._id, res))).catch(err => console.log(err))

    };

    const onDelete = (id) => {
        axios.delete(
            `http://${process.env.REACT_APP_API}:3000/promotion/${id}`
        ).then(res => dispatch(DeletePromo(res))).catch(err => console.log(err))
    }
    

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        form.setFieldsValue({
            name: props.promo.name,
            quantity: props.promo.quantity,
            price: props.promo.price,
            code: props.promo.code,
        })
    }, [props]);

    return(
        <>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                    Reset
                    </Button>
                    <Button htmlType="button" onClick={() => onDelete(props.promo._id)}>
                    Delete
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}


const Promo = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const statePromos = useSelector(state => state.promos)

    const onFinish = values => {
        const newPromo = [
            {
                name: values.Name,
                quantity: values.Quantity,
                price: values.Price,
                code: values.Code
            }
        ]

        axios.post(
            `http://${process.env.REACT_APP_API}:3000/promotions`, newPromo[0]
        ).then(res => dispatch(AddPromo(res))).catch(err => console.log(err))
        onReset()
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            {
                statePromos.map(p => {
                    return(
                        <ViewPromo key={p._id} promo={p}></ViewPromo>
                    )
                })
            }

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