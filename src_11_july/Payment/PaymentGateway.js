import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedbackBase,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "../Components/IconManager";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import { Context as AuthContext } from "../Context/AuthContext";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";

const PaymentGateway = (props) => {
  const { navigation, route } = props;
  const { Carttotal } = route.params;
  const { customer_address_id } = route.params;
  console.log("Carttotal", Carttotal, customer_address_id);

  const { state, setpaymentmethod } = useContext(AuthContext);
  const sumTotal = (cartdata) =>
    cartdata.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  return (
    <View style={{ flex: 1, marginTop: heightPercentageToDP(2) }}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginLeft: 10,
              fontWeight: "600",
            }}
          >
            Payable Amount
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginRight: 10,
              fontWeight: "600",
            }}
          >
            ${sumTotal(Carttotal) + 5}
          </Text>
        </View>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          cards
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("addnewcard", {
              Carttotal: Carttotal,
              customer_address_id: customer_address_id,
            })
          }
        >
          <View
            style={{
              backgroundColor: "#fff",
              margin: 5,
              borderRadius: 8,
              elevation: 5,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 30,
                paddingLeft: 25,
                paddingBottom: 0,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {Ionicons("card-outline", 20, Theme.colors.brandColor)}
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "600",
                    marginLeft: 20,
                  }}
                >
                  credit / debit cards
                </Text>
              </View>
              {Ionicons("chevron-forward-outline", 20, Theme.colors.brandColor)}
            </View>
            <Image
              source={Images.visa}
              style={{
                height: 35,
                width: 35,
                marginLeft: widthPercentageToDP(20),
              }}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          UPI
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 30,
            paddingLeft: 25,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            margin: 5,
            borderRadius: 8,
            elevation: 5,
          }}
        >
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/googlepay.png")}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text style={{ color: "#000", opacity: 0.3, fontSize: 10 }}>
                Google Pay
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/phonepe.png")}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text style={{ color: "#000", opacity: 0.3, fontSize: 10 }}>
                PhonePe
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/bhim.png")}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text style={{ color: "#000", opacity: 0.3, fontSize: 10 }}>
                BHIM
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/paytm.jpg")}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text style={{ color: "#000", opacity: 0.3, fontSize: 10 }}>
                Paytm
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          Cash on delivery
        </Text>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 30,
              paddingLeft: 25,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              margin: 5,
              borderRadius: 8,
              elevation: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={Images.cod}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 20,
                }}
              >
                Cash on delivery
              </Text>
            </View>
            {Ionicons("chevron-forward-outline", 20, Theme.colors.brandColor)}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentGateway;
