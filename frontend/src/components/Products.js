import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload } from "antd";
import axios from 'axios'
import ImgCrop from 'antd-img-crop';
import Header from './Header'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Products = () => {
    
        const [products, setProducts] = useState({});
        // const products = useSelector(state => state.product);
        const [form] = Form.useForm();
        // const { register, handleSubmit } = useForm() 

        const onFinish = values => {
            const newProduct = [
                {
                    name: values.Name,
                    quantity: values.Quantity,
                    price: values.Price,
                    image: fileList[0].thumbUrl
                }
            ]

            setProducts(newProduct[0])
        };
        
        const onReset = () => {
            form.resetFields();
        };

        const [fileList, setFileList] = useState([
        ]);
        
        const onChange = async ({ fileList: newFileList }) => {
            setFileList(await newFileList);              
        };

        useEffect(() => {
            async function fetchData() {
                await axios.post(
                    'http://localhost:3000/products', products
                ).then(res => console.log(res)).catch(err => console.log(err))
            }
            fetchData();
        }, [products]);
          
        return(
            <div>
                <Header name="Product"></Header>
                <div>
                </div>
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