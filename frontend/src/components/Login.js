import React, { useState } from 'react';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { Button, Form, Input } from 'antd'

import { config } from "./test-credentials";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [form] = Form.useForm();
  const [confirmCode, setConfirmCode] = useState({});

  const capcha = () => {
    console.log("check")
    window.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: function (response) {
        console.log('It works!');
        console.log(response);
      },
    });

    const phoneNumber = '+84909259713';

    const appVerifier = window.reCaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmCode(confirmationResult)
      }).catch((error) => {
        console.log("error")
        console.log(error)
      });
  }
  

  const onFinish = values => {
    window.confirmationResult = confirmCode
    window.confirmationResult.confirm(values.code).then((result) => {

      console.log(result)
      console.log("OK!")

    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <div>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          <FirebaseAuthConsumer>
            {({ isSignedIn, firebase, user }) => {
                console.log(user)
              if (isSignedIn === true) {
                return (
                  <div>
                    <h2>You're signed in, welcome {user.displayName} 🎉 </h2>
                    <Button
                      onClick={() => {
                        firebase
                          .app()
                          .auth()
                          .signOut();
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
                          firebase.auth().signInWithRedirect(fbAuthProvider).then(res => console.log(res));
                      }}
                    >
                      Sign in FB
                    </Button>
                    <Button
                      onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                      }}
                    >
                      Sign in with Google
                    </Button>
                    <div id="recaptcha-container">
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" onClick={capcha} id="sign-in-button">
                            Send Code
                            </Button>
                            <Button type="primary" htmlType="submit">
                            Login with Phone
                            </Button>
                        </Form.Item>
                    </Form>
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