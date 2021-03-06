import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Image } from "antd";
import { useSelector , useDispatch} from 'react-redux'
import axios from 'axios'
import AddProduct from '../actions/Product/AddProduct'
import EditProduct from '../actions/Product/EditProduct'
import DeleteProduct from '../actions/Product/DeleteProduct'

const ViewProduct = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const newProduct = [
            {
                name: values.name,
                size: values.size,
                quantity: values.quantity,
                price: values.price,
                image: '/images/ao_1.jpg'
            }
        ]

        const linkAPI = `${process.env.REACT_APP_API}/product/${props.product._id}`
        
        axios.put(
            linkAPI, newProduct[0]
        ).then(res => dispatch(EditProduct(props.product._id, res))).catch(err => console.log(err))
    }
    
    const onDelete = (id) => {

        const linkAPI = `${process.env.REACT_APP_API}/product/${id}`

        axios.delete(
            linkAPI
        ).then(res => dispatch(DeleteProduct(res))).catch(err => console.log(err))
    }

    useEffect(() => {
        form.setFieldsValue({
            name: props.product.name,
            size: props.product.size,
            quantity: props.product.quantity,
            price: props.product.price,
        })
    }, [props]);

    return(
        <Col span={8}>
            <Card size="small" title={props.product.name} style={{ width: 300 }} cover={<Image
                width={200}
                src={props.product.image}
            />}>
                <Form onFinish={onFinish} form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="size" label="Size">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                        Reset
                        </Button>
                        <Button htmlType="button" onClick={() => onDelete(props.product._id)}>
                        Delete
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    )
}


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



const Products = () => {
        const productsRaw = useSelector(state => state.products);
        const dispatch = useDispatch()
        const [form] = Form.useForm();

        const onFinish = values => {
            
            const newProduct = [
                {   
                    name: values.Name,
                    size: values.Size,
                    category: values.Category,
                    quantity: values.Quantity,
                    price: values.Price,
                    image: values.Image,
                    listimage: values.ListImage,
                }
            ]

            const linkAPI = `${process.env.REACT_APP_API}/products`

            axios.post(linkAPI, newProduct[0]).then(res => dispatch(AddProduct(res))).catch(err => console.log(err))
            form.resetFields();
        };
        
        const onReset = () => {
            form.resetFields();
        };
          
        return(
            <div>
                <Row>
                    {
                        productsRaw.map(r => {
                            return <ViewProduct key={r._id} product={r}></ViewProduct>
                        })
                    }
                </Row>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Size" label="Size">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="Category" label="Category">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="Image" label="Image">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="ListImage" label="ListImage">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="Quantity" label="Quantity" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
                        <Input type="number" />
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

export default Products