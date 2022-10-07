import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import EmptyCartFile from "./EmptyCartFile";
import { Context as AuthContext } from "../Context/AuthContext";
import { Ionicons } from "../Components/IconManager";
import ThemeButton from "../Components/ThemeButton";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default (props) => {
  const { navigation } = props;
  const { state, clearErrorMessage, addcart } = useContext(AuthContext);
  const [cartdata, setcartdata] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    fetchmenu();
    fetchcart();
  }, []);

  const fetchmenu = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/food_menus`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    
  };

  const fetchcart = async () => {
    try{
    const id = JSON.parse(await AsyncStorage.getItem('sign'));
    const response = await fetch(
      `http://13.233.230.232:8086/api/cart/${id.id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log("cart dta", json);
    setcartdata(json.data);
  setIsLoading(false);
    }catch(error)
    {
      console.log(error);
      setIsLoading(false);
    }

  };
  

  const addquantity = (item) => {
    let data = cartdata.map((dt) => {
      if (dt.id == item.id) {
        console.log("true", dt.id == item.id, dt.quantity);
        return {
          ...dt,
          quantity: parseInt(dt.quantity) + parseInt(1),
          // price: item.price * (dt.quantity + 1),
        };
      } else return dt;
    });

    setcartdata(data);
  };

  /**
   * @function removequantity
   * @param cartItem
   * @description
   */

  const removequantity = (item) => {
    let data = cartdata.map((dt) => {
      if (dt.id == item.id)
        return {
          ...dt,
          //  itemQty: dt.itemQty == 1 ? 1 : dt.itemQty - 1,
          quantity: dt.quantity == 1 ? 1 : parseInt(dt.quantity) - parseInt(1),
          // price:
          //   dt.quantity == 1 ? item.price * 1 : item.price * (dt.quantity - 1),
        };
      else return dt;
    });

    setcartdata(data);
  };


  const removeCart= async(item) =>{
    console.log('removeCart',item)
    const customer_id =item.customer_id;
    const menu_id=item.menu_id;
    const response = await fetch(`http://13.233.230.232:8086/api/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({customer_id, menu_id }),
    });
    const json = await response.json();
    if (json.status === true) {
     fetchcart();
    }
  }
  const sumTotal = (cartdata) =>
    cartdata.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
  console.log("sumTotal", sumTotal);

  return (
    <>
    { isLoading?(<View style={{justifyContent:'center',flex:1}}><ActivityIndicator size="large"/></View>):cartdata.length!==0?
      <View style={{ flex: 1, paddingTop: heightPercentageToDP(1) }}>
        <View style={{ maxHeight: heightPercentageToDP(100 - 30) }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: heightPercentageToDP(2),
              marginBottom: heightPercentageToDP(1),
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: widthPercentageToDP(50),
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: Theme.colors.textColor,
                  fontFamily: Theme.font.SemiBold,
                }}
              >
                Delivery
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Regular,
                }}
              >
                50 minutes
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: Theme.colors.brandColor,
                fontFamily: Theme.font.Medium,
              }}
            >
              change
            </Text>
          </View>
          {/*cart array*/}

          <ScrollView>
            <View>
              {cartdata.map((item,index) => (
                  <View style={{ marginTop: heightPercentageToDP(2) }} key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#000",
                                height: heightPercentageToDP(9),
                                width: heightPercentageToDP(9),
                                overflow: "hidden",
                                borderRadius: 10,
                              }}
                            >
                              <Image
                                source={{
                                  uri: `http://sample.adeeinfotech.com/diginn/uploads/menu/${item.food_menu.thumbnail}`,
                                }}
                                style={{ height: "100%", width: "100%" }}
                                resizeMode="cover"
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                width: heightPercentageToDP(9),
                                marginTop: heightPercentageToDP(1),
                                height:
                                  Platform.OS === "ios" ? undefined : undefined,
                                alignItems: "center",
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => removequantity(item)}
                              >
                                {Ionicons(
                                  "remove-circle",
                                  heightPercentageToDP(
                                    Platform.OS == "ios" ? 3 : 3
                                  ),
                                  item.quantity == 0
                                    ? "lightgray"
                                    : Theme.colors.brandColor
                                )}
                              </TouchableOpacity>

                              <Text
                                style={{
                                  width: "25%",
                                  // marginHorizontal:10,
                                  textAlign: "center",
                                  textAlignVertical: "center",
                                  height:
                                    Platform.OS === "ios" ? undefined : "100%",
                                    color: Theme.colors.darkColor,
                                  fontFamily: Theme.font.SemiBold,
                                }}
                              >
                                {item.quantity}
                              </Text>

                              <TouchableOpacity
                                onPress={() => addquantity(item)}
                              >
                                {Ionicons(
                                  "add-circle",
                                  heightPercentageToDP(
                                    Platform.OS == "ios" ? 3 : 3
                                  ),
                                  Theme.colors.brandColor
                                )}
                              </TouchableOpacity>
                            </View>
                            {/* ///start of remove//// */}
                            {/* <View
                              style={{
                                flexDirection: "row",
                                width: heightPercentageToDP(9),
                                marginTop: heightPercentageToDP(1),
                                height:
                                  Platform.OS === "ios" ? undefined : undefined,
                                alignItems: "center",
                              }}
                            > */}
                              <TouchableOpacity
                                onPress={() => removeCart(item)}
                              >
                                <Text
                                  style={{
                                    width: "100%",
                                    //  marginHorizontal:10,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    // height:
                                    //   Platform.OS === "ios"
                                    //     ? undefined
                                    //     : "10%",
                                    marginTop: heightPercentageToDP(1),
                                    fontSize: 16,
                                    color: Theme.colors.brandColor,
                                    fontFamily: Theme.font.SemiBold,
                                  }}
                                >
                                  Remove
                                </Text>
                              </TouchableOpacity>
                            {/* </View> */}
                            {/* ///end of remove/// */}
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              width: widthPercentageToDP(70),
                              marginTop: heightPercentageToDP(4),
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: Theme.font.Medium,
                                color: Theme.colors.darkColor,
                              }}
                            >
                              {item.food_menu.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: Theme.font.Medium,
                                color: Theme.colors.darkColor,
                              }}
                            >
                              {item.quantity !== undefined
                                ? item.price * item.quantity
                                : item.price}
                              $
                            </Text>
                          </View>
                        </View>
                      </View>)
              )
            
            }
              
            </View>
          </ScrollView>

          {/*cart array*/}
          <View style={{ marginTop: heightPercentageToDP(2) }}>
            <Text
              onPress={() => navigation.navigate("home")}
              style={{
                fontSize: 18,
                color: Theme.colors.brandColor,
                fontFamily: Theme.font.SemiBold,
              }}
            >
              Add more items
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            bottom: heightPercentageToDP(1),
            position: "absolute",
            width: widthPercentageToDP(100),
            left: widthPercentageToDP(-5),
            height: heightPercentageToDP(15),
            borderTopColor: "lightgray",
            borderTopWidth: 0.5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: widthPercentageToDP(90),
            }}
          >
            <Text
              style={{
                fontSize: 18,
                // color: Theme.colors.textColor,
                color: Theme.colors.darkColor,
                fontFamily: Theme.font.SemiBold,
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Theme.colors.darkColor,
                fontFamily: Theme.font.SemiBold,
              }}
            >
              {sumTotal(cartdata)}$
            </Text>
          </View>
          <ThemeButton
            title="Proceed to checkout"
            buttonStyle={{
              height: heightPercentageToDP(6),
              backgroundColor: Theme.colors.brandColor,
              borderRadius: 10,
            }}
            titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 , }}
            containerStyle={{
              width: widthPercentageToDP(92),
            }}
            onPress={() => navigation.navigate("Checkout",{Cartdata:cartdata})}
          />
        </View>
      </View>:<EmptyCartFile />
          }
    </>
  );
};
