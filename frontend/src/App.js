import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
// Css
import './App.css';
// action redux
import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import AllOrder from './actions/Order/AllOrder'
import AddUser from './actions/User/AddUser'
// component
import Home from './components/Home'
import Promo from './components/Promo'
import Order from './components/Order'
import HeaderRaw from './components/Header'
import FooterRaw from './components/Footer'
import Banner from './components/Banner'
import Slide from "./components/Slide"
// firebaase with login
import firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import "firebase/auth";
import { config } from "../src/components/credentials";
// component antd
import { Spin, Layout } from "antd"
// layzy with component
const Login = lazy(() => import('./components/Login'));
const Checkout = lazy(() => import('./components/Checkout'));
const Cart = lazy(() => import('./components/Cart'));
const Products = lazy(() => import('./components/Products'));

const { Header, Content, Footer } = Layout;

function App() {

  // redux
  const dispatch = useDispatch()
  const stateUser = useSelector(state => state.users)
  // state
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
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            <FooterRaw></FooterRaw>
        </Footer>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
