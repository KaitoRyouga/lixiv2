import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import { Layout } from 'antd'
import './App.css';

import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import AllOrder from './actions/Order/AllOrder'
import AddUser from './actions/User/AddUser'
// import Products from './components/Products'
const Products = lazy(() => import('./components/Products'));
import Home from './components/Home'
// import Cart from './components/Cart'
const Cart = lazy(() => import('./components/Cart'));
import Promo from './components/Promo'
// import Checkout from './components/Checkout'
const Checkout = lazy(() => import('./components/Checkout'));
import Order from './components/Order'
// import Login from './components/Login'
const Login = lazy(() => import('./components/Login'));
import HeaderRaw from './components/Header'
import FooterRaw from './components/Footer'
import Banner from './components/Banner'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import "firebase/auth";
import { config } from "../src/components/credentials";
import Slide from "./components/Slide"
import { Spin } from "antd"

function App() {
  
  const { Header, Content, Footer } = Layout;
  const dispatch = useDispatch()
  const stateUser = useSelector(state => state.users)
  const [admin, setAdmin] = useState(false)
  const [countUser, setCountUser] = useState(0)

  useEffect(() => {
    async function fetchData() {
      
      const linkApi = `${process.env.REACT_APP_API}/allinfo`

      const allInfo = await axios.get(
        linkApi, {
          headers: {
            'uid': stateUser[0].uid,
            'phone': stateUser[0].phoneNumber,
          }
        }
      );

      const info = allInfo.data.allInfo
      if (info[0].Order.length !== 0) {
        dispatch(AllOrder(info[0].Order));
      }

      setAdmin(info[3].Admin);
      dispatch(AllProduct(info[1].Product));
      dispatch(AllPromo(info[2].Promo));
    }
    fetchData();
    
  }, [stateUser]);

  return (
    <Layout className="App">
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {       
          if(isSignedIn  && countUser === 0 ){
            setCountUser(countUser + 1)
            dispatch(AddUser(user))
          }
      }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
      <BrowserRouter>
        <Header style={{ background: "#fff" }}>
          <HeaderRaw></HeaderRaw>
        </Header>
        <Banner></Banner>
        <Content>
        <Suspense fallback={<Spin size="large" />}>
            <Switch>
            
              <Route exact path="/" component={Home}></Route>
              {
                admin && (
                    <Route path="/products" component={Products}></Route>
                )
              }
              <Route path="/cart" component={Cart}></Route>
              {
                admin && (
                    <Route path="/promotions" component={Promo}></Route>      
                )
              }
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" component={Order}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/slide" component={Slide}></Route>
              <Route path="/category/:categoryName" component={Home}></Route>
            </Switch>
          </Suspense>
          <MessengerCustomerChat
            pageId="102235194617391"
            appId="446677652971923"
          />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            <FooterRaw></FooterRaw>
        </Footer>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
