import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity,ToastAndroid } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../Components/responsive-ratio";
import { Theme } from "../../Constant/Theme";
import InputBox, { Fumi } from "../../Components/InpuBox";
import ThemeButton from "../../Components/ThemeButton";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { Context as AuthContext } from "../../Context/AuthContext";

const SignIn = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  /**
   * @function validation
   * @description it will check the validation for email and pass and save the cred
   */


  const signinmethod =async () => {
    try {
      if (email ==="") {
         ToastAndroid.show(
           'email is empty!',
           ToastAndroid.BOTTOM,
         );
       } else if (pass ==="") {
        ToastAndroid.show(
          'password is empty!',
          ToastAndroid.BOTTOM,
        );
      } 
       else{

    const response = await fetch(`http://13.233.230.232:8086/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,password:pass}),
    });
    const res = await response.json();

    if(res.status === true)
    {
      ToastAndroid.show(
        res.message,
        ToastAndroid.BOTTOM,
      );
      signin(res.data);
      navigation.navigate('home')
    }else{
      ToastAndroid.show(
        res.message,
        ToastAndroid.BOTTOM,
      );
    }
  
  }
}catch(error){
  console.log(error)
}
        };

  return (
    <View style={{ flex: 1, paddingTop: heightPercentageToDP(8) }}>
      <Text
        style={{
          fontFamily: Theme.font.SemiBold,
          fontSize: 20,
          color: Theme.colors.textColor,
          marginBottom: heightPercentageToDP(2),
        }}
      >
        Login
      </Text>

      <View
        style={{ borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5 }}
      >
        <Fumi
          label={"Email"}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
          onChangeText={(val) => setEmail(val)}
          // inputHeight={40}
        />
      </View>
      <View
        style={{
          borderWidth: 0.7,
          borderRadius: 10,
          paddingHorizontal: 5,
          marginTop: heightPercentageToDP(2),
        }}
      >
        <Fumi
          label={"Password"}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
          secureTextEntry
          onChangeText={(val) => setPass(val)}
          // inputHeight={40}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: heightPercentageToDP(1.5),
        }}
      >
        <Text
          style={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Medium,
            fontSize: 16,
          }}
        >
          Don't have account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={{
              color: Theme.colors.brandColor,
              fontFamily: Theme.font.SemiBold,
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          bottom: 10,
          position: "absolute",
          width: widthPercentageToDP(100),
          left: widthPercentageToDP(-5),
          height: heightPercentageToDP(10),
          borderTopColor: "lightgray",
          borderTopWidth: 0.5,
        }}
      >
        <ThemeButton
          title="Continue"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
          titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
          containerStyle={{
            width: widthPercentageToDP(92),

            // height:heightPercentageToDP(6)
          }}
          onPress={() => signinmethod()}
        />
      </View>
    </View>
  ); 
};
export default SignIn;
