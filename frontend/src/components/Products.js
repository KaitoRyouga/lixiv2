import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Card, Row, Col, Image } from "antd";
import { useSelector } from 'react-redux'
import axios from 'axios'
import ImgCrop from 'antd-img-crop';
import Header from './Header'

const ViewProduct = (props) => {

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log(values)
    }
    

    useEffect(() => {
        form.setFieldsValue({
            name: props.product.name,
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
    
        // const [products, setProducts] = useState({});
        const productsRaw = useSelector(state => state.products);
        const [form] = Form.useForm();

        const onFinish = values => {
            const newProduct = [
                {
                    name: values.Name,
                    quantity: values.Quantity,
                    price: values.Price,
                    image: fileList[0].thumbUrl
                }
            ]
            axios.post('http://localhost:3000/products', newProduct[0]).then(res => console.log(res)).catch(err => console.log(err))
            form.resetFields();
        };
        
        const onReset = () => {
            form.resetFields();
        };

        const [fileList, setFileList] = useState([
        ]);
        
        const onChange = async ({ fileList: newFileList }) => {
            setFileList(await newFileList);              
        };

        // useEffect(() => {
        //     async function fetchData() {
        //         await axios.post(
        //             'http://localhost:3000/products', products
        //         ).then(res => console.log(res)).catch(err => console.log(err))
        //     }
        //     fetchData();
        // }, [products]);
          
        return(
            <div>
                <Header name="Product"></Header>
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
                    <Form.Item name="Quantity" label="Quantity" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <ImgCrop rotate>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
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