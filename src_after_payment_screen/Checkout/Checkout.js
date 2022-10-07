import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import { Context as AuthContext } from "../Context/AuthContext";
import ThemeButton from "../Components/ThemeButton";
import { RadioButton } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const { state } = useContext(AuthContext);
  const { navigation, route } = props;
  const { Cartdata } = route.params;
  const [Region, setRegion] = useState({
    latitude: 35.6762,
    longitude: 74.6503,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  // const tokyoRegion = {
  //   latitude: 35.6762,
  //   longitude: 139.6503,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // };
  const [address1, setaddress1] = useState("unchecked");
  const [address2, setaddress2] = useState("unchecked");
  const [address3, setaddress3] = useState("unchecked");
  const [paymetoptions, setpaymetoptions] = useState([]);
  console.log("cartdata", Cartdata);

  const [customeraddress, setcustomeraddress] = useState([]);
  const sumTotal = (cartdata) =>
    cartdata.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  useEffect(async () => {
    if (Cartdata[0] !== undefined) {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      await fetchAddress(id?.id);
      await fetchpaymentoption();
    }
  }, []);
  const fetchAddress = async (id) => {
    console.log("check id", id);
    const response = await fetch(
      `http://13.233.230.232:8086/api/customers/getcustomer/${id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // const data= await JSON.parse(json)
    console.log("get customer", json);
    setcustomeraddress([json.data]);
    setRegion({
      latitude: Number(JSON.parse(json.data.coordinate_1).latitude),
      longitude: Number(JSON.parse(json.data.coordinate_1).longitude),
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
    setaddress1("checked");
  };

  //
  const fetchpaymentoption = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/payment_settings`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log("payment_settings", json.data);
    setpaymetoptions(json.data);
  };

  const select = async (e, long, latt) => {
    console.log("long", long, "latt", latt);

    setRegion({
      latitude: Number(long),
      longitude: Number(latt),
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
  };

  const cashon = async (Cartdata) => {
    var val = parseInt((Math.random() * 9 + 1) * Math.pow(10, 9 - 2), 10);
    console.log(val);
    let order = [];
    let orderdetails = [];
    // console.log(
    //   "cartdata",
    //   address1 === "checked"
    //     ? 1
    //     : address2 === "checked"
    //     ? 2
    //     : address3 === "checked"
    //     ? 3
    //     : 0
    // );
    const paymetdata = {
      order_code: `OR-16${val}-${Cartdata[0].customer_id}`,
      amount_to_pay: sumTotal(Cartdata) + 5,
      amount_paid:
        state.payment === "Cash on delivery" ? 0 : sumTotal(Cartdata) + 5,
      payment_method: state.payment,
      identifier: null,
      data: "[]",
    };

    let fdata = {
      code: `OR-16${val}-${Cartdata[0].customer_id}`,
      customer_id: Cartdata[0].customer_id,
      customer_address_id:
        address1 === "checked"
          ? 1
          : address2 === "checked"
          ? 2
          : address3 === "checked"
          ? 3
          : 0,
      driver_id: 0,
      note: Cartdata[0].note,
      total_menu_price: sumTotal(Cartdata),
      total_delivery_charge: 0,
      total_vat_amount: 5,
      grand_total: sumTotal(Cartdata) + 5,
      order_status: "pending",
      order_placed_at: parseInt(Date.now() / 1000),
    };
    order.push(fdata);
    Cartdata.map(async (data) => {
      let ordert = {
        order_code: `OR-16${val}-${data.customer_id}`,
        menu_id: data.menu_id,
        servings: "menu",
        quantity: data.quantity,
        total: parseInt(data.price) * parseInt(data.quantity) + 5,
        restaurant_id: data.restaurant_id,
        note: data.note,
        variant_id: data.variant_id,
        addons: data.addons,
      };
      orderdetails.push(ordert);
    });

    console.log("final", paymetdata);
    if (paymetdata) {
      const orderres = await fetch(
        `http://13.233.230.232:8086/api/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymetdata }),
        }
      );
      const orderjson = await orderres.json();
      console.log("signup", orderjson);
      if (order[0] !== undefined && orderjson.status === true) {
        const response = await fetch(
          `http://13.233.230.232:8086/api/order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order }),
          }
        );
        const json = await response.json();
        console.log("signup", json);
        if (json.status === true) {
          const response1 = await fetch(
            `http://13.233.230.232:8086/api/orderdetails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderdetails }),
            }
          );
          const json1 = await response1.json();
          console.log("order", json1);
          if (json1.status === true) {
            const response2 = await fetch(
              `http://13.233.230.232:8086/api/cart/remove/${order[0].customer_id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const json2 = await response2.json();
            console.log("cart", json2);
            if (json2.status === true) {
              navigation.navigate("Thankyou");
            }
          }
        }
      }
    }
  };
  return (
    <View style={{ flex: 1, marginTop: heightPercentageToDP(2) }}>
      <ScrollView
        style={{
          marginBottom: heightPercentageToDP(Platform.OS === "ios" ? 16 : 18),
        }}
      >
        {customeraddress[0] !== undefined ? (
          customeraddress.map((data) => {
            return (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: "#eeee",
                  shadowColor: "#000",
                  marginTop: heightPercentageToDP(2),
                  paddingVertical: heightPercentageToDP(3),
                  paddingHorizontal: heightPercentageToDP(2),

                  padding: 10,

                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  justifyContent: "space-between",
                  // borderRadius:5,

                  elevation: Platform.OS == "ios" ? 10 : 1,
                }}
              >
                {/* ////cheking map end/// */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: widthPercentageToDP(50),
                    }}
                  >
                    <Image
                      source={Images.map_marker}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: Theme.font.SemiBold,
                        fontSize: 18,
                        color: Theme.colors.textColor,
                        marginTop: 5,
                      }}
                    >
                      Delivery address
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MyAdd")}
                  >
                    <Image
                      source={Images.edit}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {Region.latitude !== undefined || Region.latitude !== null ? (
                  <View
                    style={{
                      height: heightPercentageToDP(15),
                      width: undefined,
                      marginBottom: 15,
                    }}
                  >
                    {/* <Image
    source={Images.map_image}
    style={{height: '100%', width: '100%'}}
  /> */}
                    <MapView
                      style={styles.map}
                      provider={PROVIDER_GOOGLE}
                      showsUserLocation={true}
                      showsCompass={true}
                      showsBuildings={false}
                      showsTraffic={true}
                      showsIndoors={true}
                      region={Region}
                    >
                      <Marker coordinate={Region} />
                    </MapView>
                  </View>
                ) : (
                  <Text>No map</Text>
                )}
                {/* <Text
                style={{
                  fontFamily: Theme.font.Medium,
                  fontSize: 14,
                  color: Theme.colors.textColor,
                }}
              >
                {data?.address_1}
              </Text> */}
                {data.address_1 !== null &&
                data.address_2 !== null &&
                data.address_3 !== null ? (
                  <View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address1}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_1).latitude,
                            JSON.parse(data.coordinate_1).longitude
                          );
                          setaddress1("checked");
                          setaddress2("unchecked");
                          setaddress3("unchecked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_1}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address2}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_2).latitude,
                            JSON.parse(data.coordinate_2).longitude
                          );
                          setaddress1("unchecked");
                          setaddress2("checked");
                          setaddress3("unchecked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_2}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address3}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_3).latitude,
                            JSON.parse(data.coordinate_3).longitude
                          );
                          setaddress1("unchecked");
                          setaddress2("unchecked");
                          setaddress3("checked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_3}
                      </Text>
                    </View>
                  </View>
                ) : data.address_1 !== null && data.address_2 !== null ? (
                  <View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address1}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_1).latitude,
                            JSON.parse(data.coordinate_1).longitude
                          );
                          setaddress1("checked");
                          setaddress2("unchecked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_1}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address2}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_2).latitude,
                            JSON.parse(data.coordinate_2).longitude
                          );
                          setaddress1("unchecked");
                          setaddress2("checked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_2}
                      </Text>
                    </View>
                  </View>
                ) : data.address_1 !== null && data.address_3 !== null ? (
                  <View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address1}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_1).latitude,
                            JSON.parse(data.coordinate_1).longitude
                          );
                          setaddress1("checked");
                          setaddress3("unchecked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_1}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address3}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_3).latitude,
                            JSON.parse(data.coordinate_3).longitude
                          );
                          setaddress1("unchecked");
                          setaddress3("checked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_3}
                      </Text>
                    </View>
                  </View>
                ) : data.address_2 !== null && data.address_3 !== null ? (
                  <View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address2}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_2).latitude,
                            JSON.parse(data.coordinate_2).longitude
                          );
                          setaddress2("checked");
                          setaddress3("unchecked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_2}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton
                        color={Theme.colors.brandColor}
                        uncheckedColor={Theme.colors.brandColor}
                        //   value={item.options}
                        status={address3}
                        onPress={(e) => {
                          select(
                            e,
                            JSON.parse(data.coordinate_3).latitude,
                            JSON.parse(data.coordinate_3).longitude
                          );
                          setaddress2("unchecked");
                          setaddress3("checked");
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 14,
                          color: Theme.colors.textColor,
                        }}
                      >
                        {data?.address_3}
                      </Text>
                    </View>
                  </View>
                ) : data.address_3 !== null ? (
                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      color={Theme.colors.brandColor}
                      uncheckedColor={Theme.colors.brandColor}
                      //   value={item.options}
                      status={address3}
                      onPress={(e) => {
                        select(
                          e,
                          JSON.parse(data.coordinate_3).latitude,
                          JSON.parse(data.coordinate_3).longitude
                        );
                        setaddress3("checked");
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Theme.font.Medium,
                        fontSize: 14,
                        color: Theme.colors.textColor,
                      }}
                    >
                      {data?.address_3}
                    </Text>
                  </View>
                ) : data.address_2 !== null ? (
                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      color={Theme.colors.brandColor}
                      uncheckedColor={Theme.colors.brandColor}
                      //   value={item.options}
                      status={address2}
                      onPress={(e) => {
                        select(
                          e,
                          JSON.parse(data.coordinate_2).latitude,
                          JSON.parse(data.coordinate_2).longitude
                        );
                        setaddress2("checked");
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Theme.font.Medium,
                        fontSize: 14,
                        color: Theme.colors.textColor,
                      }}
                    >
                      {data?.address_2}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      color={Theme.colors.brandColor}
                      uncheckedColor={Theme.colors.brandColor}
                      //   value={item.options}
                      status={address1}
                      onPress={(e) =>
                        select(
                          e,
                          JSON.parse(data.coordinate_1).latitude,
                          JSON.parse(data.coordinate_1).longitude
                        )
                      }
                    />
                    <Text
                      style={{
                        fontFamily: Theme.font.Medium,
                        fontSize: 14,
                        color: Theme.colors.textColor,
                      }}
                    >
                      {data?.address_1}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    borderTopWidth: 0.5,
                    width: widthPercentageToDP(92),
                    marginVertical: 15,
                    borderColor: "#eee",
                    left: widthPercentageToDP(-4.5),
                  }}
                />
                <Text
                  style={{
                    fontFamily: Theme.font.SemiBold,
                    fontSize: 12,
                    color: Theme.colors.brandColor,
                  }}
                >
                  Note:order once placed cannot be canceled
                </Text>
              </View>
            );
          })
        ) : (
          <View>
            <ActivityIndicator size="large" color="#E41717" />
          </View>
        )}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#eeee",
            shadowColor: "#000",
            marginTop: heightPercentageToDP(2),
            paddingVertical: heightPercentageToDP(3),
            paddingHorizontal: heightPercentageToDP(2),

            padding: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            justifyContent: "space-between",

            elevation: Platform.OS == "ios" ? 10 : 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "space-between",
              width: widthPercentageToDP(50),
            }}
          >
            <Image
              source={Images.payment}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("PaymentMethod")}
            >
              <Text
                style={{
                  fontFamily: Theme.font.SemiBold,
                  fontSize: 18,
                  color: Theme.colors.textColor,
                  marginTop: 5,
                }}
              >
                Payment method
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: Theme.font.SemiBold,
              fontSize: 12,
              color: Theme.colors.textColor,
            }}
          >
            {state.payment != null
              ? state.payment
              : "Please select payment method"}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#eeee",
            shadowColor: "#000",
            marginTop: heightPercentageToDP(2),
            paddingVertical: heightPercentageToDP(3),
            paddingHorizontal: heightPercentageToDP(2),

            padding: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            justifyContent: "space-between",

            elevation: Platform.OS == "ios" ? 10 : 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "space-between",
              width: widthPercentageToDP(50),
            }}
          >
            <Image
              source={Images.payment}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: Theme.font.SemiBold,
                fontSize: 18,
                color: Theme.colors.textColor,
                marginTop: 5,
              }}
            >
              Order summary
            </Text>
          </View>
          {Cartdata != null &&
            Cartdata.map((item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Theme.font.Medium,
                      fontSize: 14,
                      color: Theme.colors.textColor,
                    }}
                  >
                    {item.quantity} X {item.food_menu.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Theme.font.Medium,
                      fontSize: 14,
                      color: Theme.colors.textColor,
                    }}
                  >
                    {item.quantity !== undefined
                      ? item.price * item.quantity
                      : item.price}
                    $
                  </Text>
                </View>
              );
            })}

          <View
            style={{
              borderTopWidth: 0.5,
              width: widthPercentageToDP(92),
              marginVertical: 15,
              borderColor: "#eee",
              left: widthPercentageToDP(-4.5),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 14,
                color: Theme.colors.textColor,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 14,
                color: Theme.colors.textColor,
              }}
            >
              {sumTotal(Cartdata)}$
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 14,
                color: Theme.colors.textColor,
              }}
            >
              Delivery fees
            </Text>
            <Text
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 14,
                color: Theme.colors.textColor,
              }}
            >
              5$
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
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
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}
          >
            {sumTotal(Cartdata) + 5}$
          </Text>
        </View>
        <ThemeButton
          title="Place order"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
          titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 18 }}
          containerStyle={{
            width: widthPercentageToDP(92),
          }}
          onPress={() =>
            state.payment != null
              ? state.payment === "Cash on delivery"
                ? cashon(Cartdata)
                : state.payment === "paypal"
                ? navigation.navigate("BillDesk", {
                    Carttotal: Cartdata,
                  })
                : navigation.navigate("PaymentMethod")
              : navigation.navigate("PaymentMethod")
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
});
