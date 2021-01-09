import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux'
import AddProduct from '../actions/Product/AddProduct'
import { Image, Card, Form, Input, Button, Upload } from "antd";
import axios from 'axios'
import ImgCrop from 'antd-img-crop';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ViewProduct = (params) => {
    return(
        <div>            
            <Card size="small" title={params.product.name} style={{ width: 300 }} cover={<Image
                width={200}
                src={params.product.image}
            />}>
                <p>{params.product.price}$</p>
            </Card>
        </div>
    )
}


const Products = () => {
    
        const [data, setData] = useState("");
        const [path, setPath] = useState("");
        const [change, setChange] = useState(0);
        const [products, setProducts] = useState([]);
        // const products = useSelector(state => state.product);
        const dispatch = useDispatch();
        const [form] = Form.useForm();
        // const { register, handleSubmit } = useForm() 

        const addProduct = (info) => {
            dispatch(AddProduct(info))
        }

        const onFinish = values => {
            const newProduct = [
                {
                    name: values.Name,
                    quantity: values.Quantity,
                    price: values.Price,
                    image: fileList[0].thumbUrl
                }
            ]
            addProduct(newProduct)
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
                const result = await axios.get(
                    'http://localhost:3000/products',
                );
                setProducts(result.data.Products);
            }
            fetchData();
            
        }, []);
          
        return(
            <div>
                { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

                <article>this is Products</article>
                <button onClick={() => {
                    setData("Home")
                    setPath("/")
                    setChange(1)
                }}>
                    Home
                </button>
                <div>
                {
                    
                    products.map((product, id) => {
                        return <ViewProduct key={id} product={product}></ViewProduct>
                    })
                }
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