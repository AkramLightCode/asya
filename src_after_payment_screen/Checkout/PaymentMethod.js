import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "../Components/IconManager";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import { Context as AuthContext } from "../Context/AuthContext";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";

export default (props) => {
  const { navigation, route } = props;

  const { state, setpaymentmethod } = useContext(AuthContext);

  const [paymethod, setpaymethod] = useState([
    {
      method: "Pay With Card",
      selected: false,
      image: Images.visa,
    },
    {
      method: "Pay on delivery",
      selected: false,
      image: Images.cod,
    },
  ]);

  useEffect(async () => {
    await fetchpaymentoption();
  }, []);
  const fetchpaymentoption = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/payment_settings`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log("payment_settings", json.data);

    setpaymethod([
      {
        method:
          json.data[1].key !== undefined ? json.data[1].key : "Pay With Card",
        selected: false,
        image: Images.visa,
      },
      {
        method:
          json.data[0].key !== undefined
            ? json.data[0].key === "cash_on_delivery"
              ? "Pay on delivery"
              : "Pay on delivery"
            : "Pay on delivery",
        selected: false,
        image: Images.cod,
      },
    ]);
  };

  /**
   * @function onSelect
   * @param item
   * @description it will select the payment method and return
   */

  const onSelect = async (item) => {
    // console.log('item', item);

    item.selected = !item.selected;

    const updated = paymethod.map((it) => {
      it.selected = false;
      if (it.method === item.method) {
        it.selected = !it.selected;
      }
      return it;
    });

    setpaymethod(updated);
    if (item.method == "Pay on delivery") {
      setpaymentmethod(item.method);
      navigation.goBack();
    } else {
      // navigation.navigate("BillDesk");
      setpaymentmethod(item.method);
      navigation.goBack();
    }
  };

  /**
   * @function renderItem
   * @description it will render the UI of payment method
   */

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: item.selected ? Theme.colors.brandColor : "#eeee",
            // shadowColor: "#000",
            marginTop: heightPercentageToDP(2),
            paddingVertical: heightPercentageToDP(3),
            paddingHorizontal: heightPercentageToDP(2),

            // padding:10,

            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            justifyContent: "space-between",

            elevation: Platform.OS == "ios" ? 10 : 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.image}
                style={{
                  height: 60,
                  width: 60,
                  marginRight: widthPercentageToDP(5),
                }}
              />
              <Text
                style={{
                  fontFamily: Theme.font.SemiBold,
                  fontSize: 16,
                  color: Theme.colors.textColor,
                }}
              >
                {item.method}
              </Text>
            </View>
            {Ionicons("arrow-forward", 20, Theme.colors.brandColor)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: heightPercentageToDP(2) }}>
      <FlatList data={paymethod} renderItem={renderItem} />
    </View>
  );
};
