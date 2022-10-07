import React, { useEffect } from "react";
import { NativeModules, ToastAndroid } from "react-native";
import createDataContext from "./createDataContext";
import * as RootNavigation from "../../RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
const authReducer = (state, action) => {
  switch (action.type) {
    case "signup":
      return { ...state, errorMessage: "", token: action.payload };
    case "address":
      return { ...state, errorMessage: "", myaddress: action.payload };
    case "cartdata":
      return { ...state, errorMessage: "", mycart: action.payload };
    case "review":
      return { ...state, errorMessage: "", myreview: action.payload };
    case "paymentmethod":
      return { ...state, errorMessage: "", payment: action.payload };
    case "signin":
      return { ...state, errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };

    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

useEffect(() => {
  getdata();
}, []);

const getdata = async (dispatch) => {
  try {

    const value = JSON.parse(await AsyncStorage.getItem("sign"));

    if (value !== null) {
      console.log("value", value, dispatch);
      dispatch({
        type: "signin",
        payload: value,
      });
      RootNavigation.navigate("home");
    }
  } catch (error) {
    console.log("errror", error);
  }
};
const signup = (dispatch) => async (email, firstname, lastname, password) => {
  const user = {
    email,
    firstname,
    lastname,
    password,
    islogin: true,
  };

  storeData(user, dispatch);
};
//sotre async data
const storeData = async (user, dispatch) => {
  try {
    const name = `${user.firstname} ${user.lastname}`;
    const email = user.email;
    const password = user.password;
    const response = await fetch(`http://13.233.230.232:8086/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const json = await response.json();
    console.log("signup", json);
    const jsonValue = JSON.stringify(user);
    //await AsyncStorage.setItem("sign", jsonValue);
    dispatch({
      type: "signup",
      payload: user,
    });
    RootNavigation.navigate("home");
    console.log("dispatch", dispatch);
  } catch (e) {
    // saving error
    console.log("e", e);
  }
};

const update = (dispatch) => (email, firstname, lastname, password) => {
  const user = {
    email,
    firstname,
    lastname,
    password,
    islogin: true,
  };
  dispatch({
    type: "signup",
    payload: user,
  });
  RootNavigation.goback();
};

const signin = (dispatch) => async (data) => {
 
  await AsyncStorage.setItem("sign", JSON.stringify(data));
  dispatch({
    type: "signin", 
    payload: data,
  });
  RootNavigation.navigate("home",{refresh:1});
};

const setaddress = (dispatch) => (data) => {
  console.log("data", data);
  dispatch({
    type: "address",
    payload: data,
  });
  RootNavigation.goback();
};

const setpaymentmethod = (dispatch) => (data) => {
  dispatch({
    type: "paymentmethod",
    payload: data,
  });
};

const addcart = (dispatch) => (data) => {
  dispatch({
    type: "cartdata",
    payload: data,
  });
};

const removeAddress = (dispatch) => (data) => {
  dispatch({
    type: "address",
    payload: data,
  });
};

const setreview = (dispatch) => (data) => {
  dispatch({
    type: "review",
    payload: data,
  });
  RootNavigation.goback();
};

const removeReview = (dispatch) => (data) => {
  dispatch({
    type: "review",
    payload: data,
  });
};

const signout = (dispatch) => async () => {
  
  await AsyncStorage.removeItem("sign");
  dispatch({ type: "signout" });
NativeModules.DevSettings.reload();
ToastAndroid.show(
  'Logout SuccessFully!',
   ToastAndroid.BOTTOM,
 );
//  RootNavigation.navigate("home");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    update,
    setpaymentmethod,
    signout,
    addcart,
    clearErrorMessage,
    setaddress,
    setreview,
    removeAddress,
    removeReview,
  },
  {
    token: null,
    errorMessage: "",
    myaddress: null,
    myreview: null,
    mycart: null,
    payment: null,
  }
);
