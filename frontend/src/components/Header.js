import React, { useState, useEffect } from 'react'
import { useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Button, Menu, Grid, Drawer, Row, Col } from "antd";
import axios from 'axios'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import '../assets/css/header.css'

const SubMenu = Menu.SubMenu;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  const history = useHistory()

  const changePage = (path) => {
      history.push(path)
  }

  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <ShoppingCartOutlined style={{ fontSize: '1.2em' }} onClick={() => changePage("/cart")} />
      </Menu.Item>
      <Menu.Item key="app">
        <UserOutlined style={{ fontSize: '1.2em' }} onClick={() => changePage("/login")} />
      </Menu.Item>
    </Menu>
  );
}

const LeftMenu = () => {
  const { md } = useBreakpoint()
  const history = useHistory()

  const stateUser = useSelector(state => state.users)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
      async function fetchData() {

          const linkAPI = `${process.env.REACT_APP_API}/admin`

          const result = await axios.get(
              linkAPI, {
                headers: {
                  'uid': stateUser[0].uid
                }
              }
          );
          setAdmin(result.data.admin);
      }
        fetchData();
  }, [stateUser]);

  const changePage = (path) => {
      history.push(path)
  }

  return (
    <Menu theme="light" mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <a onClick={() => changePage("/")}>Home</a>
      </Menu.Item>
      <SubMenu key="sub1" title={<span>Products</span>}>
          <Menu.Item key="setting:1">Lì xì</Menu.Item>
          <Menu.Item key="setting:2">Đồ Khô</Menu.Item>
          <Menu.Item key="setting:3">Áo thường</Menu.Item>
          <Menu.Item key="setting:4">Áo in</Menu.Item>
      </SubMenu>
      <Menu.Item key="orders">
        <a onClick={() => changePage("/orders")}>Order</a>
      </Menu.Item>
      {
        admin && (
          <>
          <Menu.Item key="all">
            <a onClick={() => changePage("/products")}>All Products</a>
          </Menu.Item>
          <Menu.Item key="promo">
            <a onClick={() => changePage("/promotions")}>Promotions</a>
          </Menu.Item>
          </>
        )
      }
    </Menu>
  );
}


const Header = () => {

    const [visible, setVisible] = useState(false)
    const history = useHistory()

    const changePage = (path) => {
      history.push(path)
    }

    const showDrawer = () => {
      setVisible(true)
    };

    const onClose = () => {
      setVisible(false)
    };

    return (
      <Row justify="space-between">
        <Col span={3}>
          <a onClick={() => changePage("/")}>logo</a>
        </Col>
        <Col span={20}>
          <Row justify="start" align="middle">
            <Col span={18}>
              <div className="leftMenu">
                <LeftMenu />
              </div>
            </Col>
            <Col span={6}>
              <Row justify="end">
                <div className="rightMenu">
                  <RightMenu />
                </div>
              </Row>
            </Col>
          </Row>
          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </Col>
        </Row>
    )
}

export default Header
