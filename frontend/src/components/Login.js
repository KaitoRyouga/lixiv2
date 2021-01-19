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
import UserLogOut from '../actions/User/UserLogOut'
import { LoadingOutlined } from '@ant-design/icons'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [confirmCode, setConfirmCode] = useState({});
  const [checkCode, setCheckCode] = useState(false);
  const [,updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingPhone, setConfirmLoadingPhone] = useState(false);

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

    const phoneNumber = values.phone;

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

    }).catch((error) => {
      fail(error)
    });

  };

  const regexp = /(\+(84)+(9|3|7|8|5)+([0-9]{8})\b)/g;

  return (
    <div>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          <FirebaseAuthConsumer>
            {({ isSignedIn, firebase, user }) => {
              if (isSignedIn === true && user !== null) {
                return (
                  <div>
                    <h2>You're signed in, welcome {user.displayName} 🎉 </h2>
                    <Button
                      onClick={() => {
                        firebase
                          .app()
                          .auth()
                          .signOut();
                          dispatch(UserLogOut())
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div>
                    <h2>You're not signed in </h2>
                    <Button
                      onClick={() => {
                          const fbAuthProvider = new firebase.auth.FacebookAuthProvider
                          firebase.auth().signInWithRedirect(fbAuthProvider);
                      }}
                    >
                      Sign in FB
                    </Button>
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
                      Sign in with Google {confirmLoading && <LoadingOutlined />}
                    </Button>
                    <div id="recaptcha-container">
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
                        <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: new RegExp(regexp), message: "Wrong phone number, format phone number: +84xxxxxxxxx" }]}>
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