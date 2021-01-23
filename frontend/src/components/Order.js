import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Select, Button, Descriptions, Typography, Table, Row, Col, Space, Tag, Image, Divider, Badge, Empty } from 'antd'
import axios from 'axios'
import EditOrder from '../actions/Order/EditOrder'
import AddOrder from '../actions/Order/AddOrder'
import financial from './financial'
import Messenge from './Messenge'

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
          title: Messenge("products"),
          dataIndex: 'product',
          responsive: ['sm'],
          render: (product, all) => (
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
                            {
                                all.size && (
                                    <Col span={24}>
                                        <Tag color="green">Size: {all.size}</Tag>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Space>
            </Row>
          ),
        },
        {
            title: Messenge("products"),
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
                                {
                                    all.size && (
                                        <Col span={24}>
                                            <Tag color="green">Size: {all.size}</Tag>
                                        </Col>
                                    )
                                }
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
          title: Messenge("price"),
          dataIndex: 'price',
          responsive: ['sm'],
          render: (price) => (
            <Tag color="green">{financial(price)}</Tag>
          )
        },
        {
          title: Messenge("quantity"),
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
            title: Messenge("total"),
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

    const linkAPI = `${process.env.REACT_APP_API}/admin`

    axios.get(
        linkAPI, {
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

        const linkAPIOrder = `${process.env.REACT_APP_API}/order/${props.order._id}`

        axios.put(linkAPIOrder, newProduct[0]).then(res => dispatch(EditOrder(props.order._id, res))).catch(err => console.log(err))
    };

    useEffect(() => {
        if(admin){
            setTimeout(() => {
                form.setFieldsValue({
                    status: props.order.status,
                })
            }, 500);
        }

        stateRoot.orders.map(o => {
            if (o.author === props.order.author && o._id === props.order._id) {
                setTotal(o.subtotal)
            }
        })

    }, [props, stateRoot]);
    
    return(
        <div style={{ padding: "1em" }}>
                <Descriptions style={{ paddingLeft: "1em" }}>
                    <Descriptions.Item label={Messenge("name")}>{props.order.name}</Descriptions.Item>
                    <Descriptions.Item label={Messenge("phone")}>{props.order.phone}</Descriptions.Item>
                    <Descriptions.Item label={Messenge("address")}>{props.order.address}</Descriptions.Item>
                    <Descriptions.Item label={Messenge("total")}>{financial(props.order.subtotal)}</Descriptions.Item>
                    <Descriptions.Item label={Messenge("status")}>{props.order.status === "processing" ? "Chưa giao" : "Đã giao"}</Descriptions.Item>
                </Descriptions>
                {
                    props.order.cart.stateCart.map(c => {
                        const product = stateRoot.products.filter(p => p._id === c.id)
                        if(product.length !== 0){
                            data.push({
                                key: c.id,
                                product: [c.name, product[0].image],
                                price: product[0].price,
                                size: c.size,
                                quantity: c.quantity,
                                total:product[0].price * c.quantity,  
                            })
                        }
                    })
                }

                <Table columns={columns} dataSource={data} pagination={false} />
                <Text>{Messenge("total")}: </Text>
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

    const stateOrder = useSelector(state => state.orders);
    const stateUser = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {

        if (stateUser[0].uid !== "") {
         
            const linkAPI = `${process.env.REACT_APP_API}/orders`

            axios.get(
                linkAPI, {
                headers: {
                    'uid': stateUser[0].uid,
                    'phone': stateUser[0].phoneNumber,
                }
                }
            ).then(res => dispatch(AddOrder(res))).catch(err => console.log(err))   
        }
    }, [stateUser])

    return (
        <div>
            {
                stateOrder.length !== 0 && stateOrder[0] !== undefined && stateOrder[0] !== null &&
                stateOrder.map(s => {
                    return <ViewOrder key={s._id} order={s}></ViewOrder>
                })
            }
        </div>
    )
}

export default Order
