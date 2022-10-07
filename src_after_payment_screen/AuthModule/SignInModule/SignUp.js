import React, { useState, useContext } from "react";
import { View, Text, ToastAndroid, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../Components/responsive-ratio";
import { Theme } from "../../Constant/Theme";
import InputBox, { Fumi } from "../../Components/InpuBox";
import ThemeButton from "../../Components/ThemeButton";
import { Context as AuthContext } from "../../Context/AuthContext";

const SignUp = ({ navigation }) => {
  const { state, signup, signin, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  /**
   * @function validation
   * @description it will check the validation for email,pass,firstname,lastname and save the cred
   */

  const signupmethod = async () => {
    console.warn(
      email + " " + first_name + " " + last_name + " " + pass + " " + phone
    );
    try {
      if (email === "") {
        ToastAndroid.show("email is empty!", ToastAndroid.BOTTOM);
      } else if (first_name === "") {
        ToastAndroid.show("first name is empty!", ToastAndroid.BOTTOM);
      } else if (phone === "") {
        ToastAndroid.show("mobile number is empty!", ToastAndroid.BOTTOM);
      } else if (pass === "") {
        ToastAndroid.show("password is empty!", ToastAndroid.BOTTOM);
      } else {
        const response = await fetch(
          `http://13.233.230.232:8086/api/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password: pass,
              first: first_name,
              last: last_name,
              phone,
            }),
          }
        );
        const res = await response.json();

        if (res.status === true) {
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
          signin(res.data);
          navigation.navigate("NewAdd");
        } else {
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        }
      }
    } catch (error) {
      console.log(error);
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
        Let's create your account
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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: heightPercentageToDP(2),
        }}
      >
        <View
          style={{ borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5 }}
        >
          <Fumi
            label={"First name"}
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
              width: widthPercentageToDP(40),
            }}
            labelStyle={{
              color: "gray",
              fontFamily: Theme.font.Regular,
              alignItems: "center",
            }}
            onChangeText={(val) => setFirstName(val)}
            // inputHeight={40}
          />
        </View>
        <View
          style={{ borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5 }}
        >
          <Fumi
            label={"Last name"}
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
              width: widthPercentageToDP(40),
            }}
            labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
            onChangeText={(val) => setLastName(val)}
            // inputHeight={40}
          />
        </View>
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
          label={"Mobile"}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
          maxLength={10}
          onChangeText={(val) => setPhone(val)}
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
          }}
          onPress={() => signupmethod()}
        />
      </View>
    </View>
  );
};
export default SignUp;
