import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Select, Button, Descriptions, Typography, Table, Row, Col, Space, Tag, Image, Divider, Badge } from 'antd'
import axios from 'axios'
import EditOrder from '../actions/Order/EditOrder'
import financial from './financial'

let data = [];
  
const tailLayout = {
    wrapperCol: { offset: 22, span: 24 },
};

const ViewOrder = (props) => {

    const { Text } = Typography;
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const Option = Select.Option;
    const formRef = useRef(null);
    const dispatch = useDispatch()
    const stateUser = useSelector(state => state.users)
    const stateRoot = useSelector(state => state);
    const [admin, setAdmin] = useState(false)

    const columns = [
        {
          title: 'PRODUCT',
          dataIndex: 'product',
          responsive: ['sm'],
          render: (product) => (
            <Row type="flex" align="middle">
                <Space size="middle">
                    <Col span={12}>
                        <Image src={`${product[1]}`} alt={product[0]} width={120} height={150}></Image>
                    </Col>
                    <Col>             
                        <Row>
                            <Col span={12}>
                                <Tag color="green">{product[0]}</Tag>
                            </Col>
                        </Row>
                    </Col>
                </Space>
            </Row>
          ),
        },
        {
            title: 'PRODUCT',
            dataIndex: 'product',
            responsive: ["xs"],
            render: (product, all) => (
                <Row type="flex" align="middle">
                    <Space size="middle">
                        <Col>
                            <Badge count={all.quantity}>
                                <Image src={`${product[1]}`} alt={product[0]}></Image>
                            </Badge>
                        </Col>
                        <Col>        
                            <Row>
                                <Col>
                                    <Tag color="green">{product[0]}</Tag>
                                </Col>
                            </Row>
                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                            <Row>
                                <Col>
                                    <Tag color="green">{financial(all.price)} vnđ</Tag>
                                </Col>
                            </Row>
                            <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></div>
                        </Col>
                    </Space>
                </Row>
            ),
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          responsive: ['sm'],
          render: (price) => (
            <Tag color="green">{financial(price)}</Tag>
          )
        },
        {
          title: 'QUANTITY',
          dataIndex: 'quantity',
          responsive: ['sm'],
          render: (quantity) => (
            <Row type="flex" align="stretch">
                <Col type="flex" align="center" justify="center" style={{marginTop: "1em"}}>
                    <Tag color="green">{quantity}</Tag>
                </Col>
            </Row>
          )
        },
        {
            title: 'TOTAL',
            dataIndex: 'total',
            render: (totalItem) => (
                <Tag color="green">
                    {financial(totalItem)} vnđ
                </Tag>
            )
        },
    ];

    data = []

    
    const checkAdmin = (res) => {
        setAdmin(res.data.admin)
    }

    axios.get(
        `http://${process.env.REACT_APP_API}/admin`, {
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
        axios.put(`http://${process.env.REACT_APP_API}/order/${props.order._id}`, newProduct[0]).then(res => dispatch(EditOrder(props.order._id, res))).catch(err => console.log(err))
    };

    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                status: props.order.status,
            })
        }, 600);

        stateRoot.orders.map(o => {
            if (o.author === props.order.author && o._id === props.order._id) {
                setTotal(o.subtotal)
            }
        })

    }, [props, stateRoot]);
    
    return(
        <div style={{ padding: "1em" }}>
                <Descriptions style={{ paddingLeft: "1em" }}>
                    <Descriptions.Item label="Name">{props.order.name}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{props.order.phone}</Descriptions.Item>
                    <Descriptions.Item label="Address">{props.order.address}</Descriptions.Item>
                    <Descriptions.Item label="Total">{financial(props.order.subtotal)}</Descriptions.Item>
                    <Descriptions.Item label="Status">{props.order.status}</Descriptions.Item>
                </Descriptions>
                {
                    props.order.cart.stateCart.map(c => {
                        const product = stateRoot.products.filter(p => p._id === c.id)
                        if(product){
                            data.push({
                                key: c.id,
                                product: [c.name, product[0].image],
                                price: product[0].price,
                                quantity: c.quantity,
                                total:product[0].price * c.quantity,  
                            })
                        }
                    })
                }

                <Table columns={columns} dataSource={data} pagination={false} />
                <Text>TOTAL: </Text>
                <Tag color="green">
                    <Text type="success">{financial(total)} vnđ</Text>
                </Tag>

                <br></br>
                <br></br>
                <Divider></Divider>
            
            {
                admin && (
                    <Form form={form} name="control-hooks" onFinish={onFinish} ref={formRef}>
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
                )
            }
        </div>
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
        `http://${process.env.REACT_APP_API}/admin`, {
          headers: {
            'uid': stateUser[0].uid
          }
        }
    ).then(res => checkAdmin(res)).catch(err => console.log(err))

    return (
        <div>
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
