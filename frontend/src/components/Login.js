import React, { useState, useCallback } from 'react';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase/app";
import { useDispatch } from 'react-redux'
import "firebase/auth";
import { Button, Form, Input, Modal } from 'antd'
import { config } from "./credentials";
import AddUser from '../actions/User/AddUser'
import AllOrder from '../actions/Order/AllOrder'
import UserLogOut from '../actions/User/UserLogOut'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";
import "../assets/css/login.css"
import { FaFacebookF } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmCode, setConfirmCode] = useState({});
  const [checkCode, setCheckCode] = useState(false);
  const [,updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingPhone, setConfirmLoadingPhone] = useState(false);
  const [confirmLoadingFB, setConfirmLoadingFB] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
  };

  const success = (victim) => {
    Modal.success({
      title: 'Login Success',
      content: `Login with ${victim} success, happy shopping !!!`,
    });
  }

  const successCode = () => {
    Modal.success({
      title: 'Send verify code success',
      content: `Please wait for an SMS to be delivered to your phone. The SMS will contain a 6-digit verification code, which you can enter on the verification screen.`,
    });
  }
  
  const fail = (victim) => {
    Modal.error({
      title: 'Login fail',
      content: `${victim}, try again !!!`,
    });
    forceUpdate()
  }

  const capcha = (values) => {

    window.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: function () {
        successCode()
        setCheckCode(true)
        setConfirmLoadingPhone(false)
      }
    });

    const phoneNumber = "+84" + values.phone.slice(1, values.phone.length)

    const appVerifier = window.reCaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmCode(confirmationResult)
      }).catch((error) => {
        fail(error)
      });
  }

  const onFinish = values => {
    
    window.confirmationResult = confirmCode
    window.confirmationResult.confirm(values.code).then((result) => {

      success("Phone")
      setConfirmLoadingPhone(false)
      dispatch(AddUser(result.user))
      history.push("/cart")

    }).catch((error) => {
      fail(error)
    });

  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  

  const regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  return (
    <div>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          <FirebaseAuthConsumer>
            {({ isSignedIn, firebase, user }) => {
              if (isSignedIn === true && user !== null) {
                return (
                  <div style={{ textAlign: "center" }}>
                      <h2>You're signed in, welcome {user.displayName} 🎉 </h2>
                      <Button
                      onClick={() => {
                        firebase
                          .app()
                          .auth()
                          .signOut()
                          .then(() => dispatch(AllOrder([])))
                          dispatch(UserLogOut())
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div className="container">
                    <h2 className="sign-in-title">SIGN IN</h2>
                    <div className="sign-in-container">
                        <div className="sign-in-facebook btn">
                          <Button 
                            onClick={() => {
                                const fbAuthProvider = new firebase.auth.FacebookAuthProvider
                                firebase.auth().signInWithRedirect(fbAuthProvider).then(res => {
                                dispatch(AddUser(res.user))
                                setConfirmLoadingFB(false)
                                success("FB")
                              }).catch(err => {
                                setConfirmLoadingFB(false);
                                fail(err)}
                              );
                            }}
                          >
                            <FaFacebookF /> Login with Facebook {confirmLoadingFB && <LoadingOutlined />}
                          </Button>
                        </div>
                        <div className="sign-in-google btn">
                          <Button
                            onClick={() => {
                              handleOk()
                              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                              firebase.auth().signInWithPopup(googleAuthProvider).then(res => {
                                dispatch(AddUser(res.user))
                                setConfirmLoading(false)
                                success("Google")
                              }).catch(err => {
                                setConfirmLoading(false);
                                fail(err)}
                              );
                            }}
                          >
                            <FaGoogle /> Login with Google+  {confirmLoading && <LoadingOutlined />}
                          </Button>
                        </div>
                      </div>
                    <div className="capcha">
                        {
                        checkCode && (
                          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                            <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                            
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={() => {
                                  setConfirmLoadingPhone(true)
                                }}>
                                Login with Phone {confirmLoadingPhone && <LoadingOutlined />}
                                </Button>
                            </Form.Item>
                          </Form>
                        ) || (
                          <Form {...layout} form={form} name="control-hooks" onFinish={capcha}>
                      <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: new RegExp(regexp), message: "Wrong phone number, try again !!!" }]}>
                          <Input type="text" />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                          <Button type="primary" htmlType="submit" onClick={() => {
                            setConfirmLoadingPhone(true)
                          }}>
                          Send Code {confirmLoadingPhone && <LoadingOutlined />}
                          </Button>
                      </Form.Item>
                    </Form>
                        )
                      }
                      <div id="sign-in-button"></div>
                      </div>
                  </div>
                );
              }
            }}
          </FirebaseAuthConsumer>
        </div>
      </FirebaseAuthProvider>
    </div>
  );
};

export default Login