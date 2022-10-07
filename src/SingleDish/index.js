import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
//import { ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "../Components/IconManager";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import CheckBox from "../Components/CheckBox";
import ThemeButton from "../Components/ThemeButton";
import { Context as AuthContext } from "../Context/AuthContext";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
export default (props) => {
  let data;
  const { navigation, route } = props;

  const { dishesItem } = route.params;
  console.log("dishesItem", dishesItem);
  const { state, clearErrorMessage, addcart } = useContext(AuthContext);
  const [C_id, setId] = useState();
  const [fav, setFav] = useState(false);
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const initialState = 1;
  const reducer = (state, action) => {
    switch (action) {
      case "add":
        return state + 1;
      case "subtract":
        return state == 1 ? state : state - 1;
      case "reset":
        return 1;
      default:
        throw new Error("Unexpected action");
    }
  };
  const [count, dispatch] = useReducer(reducer, initialState);
  const [variant, setVariant] = useState([]);
  const [variantid, setVariantid] = useState();
  const [selectedvariant, setselectedVariant] = useState([]);
  const [itemChecked, setItemChecked] = useState(false);
  const [note, setnote] = useState("");
  const [price, setprice] = useState(0);
  const [addons, setaddons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [addonsid, setaddonsid] = useState([]);
  const getFavmenu = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      const response = await fetch(
        `http://13.233.230.232:8086/api/favourites/${id.id}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      const response3 = res.filter((data) => data.menu_id === dishesItem.id);
      if (response3.length > 0) {
        setFav(true);
        setIsLoading(false);
      } else {
        setFav(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function userData() {
      try {
        const id = JSON.parse(await AsyncStorage.getItem("sign"));
        setId(id.id === undefined ? null : id?.id);
        await variantdata(dishesItem.id);
        await variant_opt(dishesItem.id);
        await addon(dishesItem.id);
      } catch (error) {}
    }

    userData();
    getFavmenu();
  }, []);

  const variantdata = async (id) => {
    try {
      const response = await fetch(
        `http://13.233.230.232:8086/api/variants/${id}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log("first", json);
      // setselectedVariant(json)
      data = json;
    } catch (error) {}
  };

  const variant_opt = async (id) => {
    try {
      const response = await fetch(
        `http://13.233.230.232:8086/api/variant_options/${id}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log("json", json, data);
      let demodata = [];
      let ff;
      ff = json;
      demodata.push(...ff);
      let gg = demodata.concat(data);
      let obj = Object.assign({}, ...gg);
      console.log("demodata", gg, obj);

      let fcheck = [];
      const merged = data.reduce((arr, item) => {
        for (let index = 0; index < arr.length; index++) {
          console.log("arr[index].id", arr[index].id, item.id);
          if (arr[index].id === item.id) {
            let check = {
              ...arr[index],
              ...item,
            };
            fcheck.push(check);
            console.log("check", fcheck);
          }
        }
        arr.push(item);
        return arr;
      }, json);
      console.log("merged", fcheck);
      setVariant(fcheck);
    } catch (error) {}
  };

  const addon = async (id) => {
    try {
      const response = await fetch(
        `http://13.233.230.232:8086/api/addons/${id}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();

      let tempdata = json.data.map((v) => ({ ...v, selected: false }));
      console.log("adons", tempdata);
      setaddons(tempdata);
    } catch (error) {}
  };
  // console.log("setVariant", variant);
  /**
   * @function addTocart
   * @description it will add the product to cart
   */
  const addTocart = async (dish, id, variant, note, price) => {
    console.log("checking id", id);
    try {
      console.log("addTocart", dish, dish.id);
      const customer_id = await id;
      const menu_id = await dish.id;
      const restaurant_id = await dish.restaurant_id;
      const servings = "menu";
      const quantity = await count;
      const pricing = (await price) === 0 ? JSON.parse(dish.price).menu : price;

      const variant_id =
        variant[0] !== undefined && variant[0].selected === "checked"
          ? variant[0].id
          : null;
      const addons =
        addonsid[0] !== undefined ? JSON.stringify(addonsid) : null;

      const response = await fetch(`http://13.233.230.232:8086/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id,
          menu_id,
          restaurant_id,
          servings,
          quantity,
          pricing,
          variant_id,
          note,
          addons,
        }),
      });
      const json = await response.json();
      console.log("cart", json);
      navigation.navigate("CartData");
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * @function select
   * @param item
   * @description it will select the dish
   */
  const FavMethod = async () => {
    try {
      const response = await fetch(
        "http://13.233.230.232:8086/api/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customer_id: C_id, menu_id: dishesItem.id }),
        }
      );

      setFav(true);
    } catch (error) {}
  };
  const UnFavMethod = async () => {
    try {
      const response = await fetch(
        `http://13.233.230.232:8086/api/favourites/${C_id}/${dishesItem.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFav(false);
    } catch (error) {}
  };

  const select = (e, item) => {
    // if (itemChecked === false) {
    console.log("varint ", item.id);
    let tempuser = variant.map((data) =>
      data.id === item.id
        ? { ...data, selected: "checked" }
        : data && data.id !== item.id
        ? { ...data, selected: "unchecked" }
        : data
    );
    for (let index = 0; index < variant.length; index++) {
      if (variant[index].id === item.id) {
        setprice(parseInt(variant[index].price));
      }
    }
    setVariant(tempuser);
    // } else {
    //   let tempuser = variant.map((data) =>
    //     data.id === item.id ? { ...data, selected: false } : data
    //   );
    //   setVariant(tempuser);
    //   setprice(0);
    // }
    //console.log("checking note", e,item);
  };
  // console.log("checking note", price);

  const selectExtra = async (item) => {
    if (item.selected === false) {
      let tempuser = addons.map((data) =>
        data.id === item.id ? { ...data, selected: !data.selected } : data
      );
      setaddons(tempuser);
      setprice(price + parseInt(item.price));
      let id = {
        addonid: item.id,
      };
      addonsid.push(id);
    } else {
      let tempuser = addons.map((data) =>
        data.id === item.id ? { ...data, selected: !data.selected } : data
      );
      setaddons(tempuser);
      let addonprice = price - parseInt(item.price);
      setprice(price > 0 ? addonprice : 0);
      const filteredaddon = addonsid.filter((data) => data.addonid !== item.id);
      setaddonsid(filteredaddon);
    }
  };
  // const checking = () => {
  //   console.log("checking data");

  //   navigation.navigate("NewAdd", { title: "new", item: dishesItem });
  // };

  const toggleModal = (item) => {
    console.log("item", item);
    setModalVisible(!isModalVisible);
    setmodaldata([item]);
  };
  // console.log("price", price, addonsid);
  return (
    <>
      {isLoading ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              flexGrow: 1,
              marginVertical: heightPercentageToDP(2),
              alignSelf: "stretch",
            }}
          >
            <View>
              <ScrollView
                style={{
                  flexGrow: 1,
                  marginVertical: heightPercentageToDP(2),
                  alignSelf: "stretch",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: heightPercentageToDP(1),
                  }}
                >
                  <View style={{ flexDirection: "column" ,flex:4,marginRight:20}}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: Theme.colors.textColor,
                        fontFamily: Theme.font.Bold,
                      }}
                    >
                      {dishesItem?.name}
                    </Text>
                    <Text
                      style={{
                       
                        fontSize: 15,
                        color: "gray",
                        fontFamily: Theme.font.Medium,
                        marginVertical: heightPercentageToDP(1),
                      }}
                    >
                    { dishesItem.details }
                    </Text>
                  </View>
                  {C_id ? (
                    fav ? (
                      <TouchableOpacity
                        onPress={() => UnFavMethod()}
                        style={{ marginTop: 15 ,flex:1}}
                      >
                        {Ionicons("heart", 25, "gray")}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => FavMethod()}
                        style={{ marginTop: 15,flex:1 }}
                      >
                        {Ionicons("heart-outline", 25, "red")}
                      </TouchableOpacity>
                    )
                  ) : null}

                  {C_id ? (
                    <TouchableOpacity
                      //onPress={() => checking()}
                      onPress={() => toggleModal(dishesItem)}
                      style={{ marginTop: 15, marginRight: 10,flex:1 }}
                    >
                      {Ionicons("information-circle-outline", 25, "gray")}
                    </TouchableOpacity>
                  ) : null}
                </View>
                {variant.length>0?<Text
                  style={{
                    fontSize: 17,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.SemiBold,
                    marginVertical: heightPercentageToDP(2),
                  }}
                >
                  Variants
                </Text>:null}
                {/* /////end of variants////// */}
                {variant.map((item) => {
                  return (
                    <>
                      <View
                        style={{
                          width: widthPercentageToDP(92),
                          justifyContent: "space-between",
                          paddingVertical: 3,
                          paddingBottom: 5,
                          flexDirection: "row",
                        }}
                      >
                        {/* <CheckBox
                      text={item.options}
                   onPress={(e) => select(e, item)}
                      selected={item?.selected || false}
                      textStyle={{
                        fontFamily: Theme.font.Medium,
                        fontSize: 16,
                        color: Theme.colors.textColor,
                      }}
                    /> */}
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                          }}
                        >
                          <RadioButton
                            color={Theme.colors.brandColor}
                            uncheckedColor={Theme.colors.brandColor}
                            value={item.options}
                            status={item?.selected || "unchecked"}
                            onPress={(e) => select(e, item)}
                          />
                          <Text
                            style={{
                              fontFamily: Theme.font.Medium,
                              fontSize: 18,
                              color: Theme.colors.textColor,
                              width: widthPercentageToDP(35),
                            }}
                          >
                            {item.options}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: Theme.font.Medium,
                              fontSize: 16,
                              color: Theme.colors.textColor,
                              width: widthPercentageToDP(35),
                            }}
                          >
                            +{item.price}$
                          </Text>
                        </View>
                      </View>
                    </>
                  );
                })}

                {/* /////end of variants////// */}
                {addons[0] !== undefined ? (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: heightPercentageToDP(2),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: Theme.colors.textColor,
                          fontFamily: Theme.font.SemiBold,
                        }}
                      >
                        Extra Ingredient
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "lightgray",
                          fontFamily: Theme.font.SemiBold,
                        }}
                      >
                        Optional
                      </Text>
                    </View>
                    {addons.map((item) => {
                      return (
                        <>
                          <View
                            style={{
                              width: widthPercentageToDP(92),
                              justifyContent: "space-between",
                              paddingVertical: 3,
                              paddingBottom: 5,
                              flexDirection: "row",
                            }}
                            key={item.id}
                          >
                            <CheckBox
                              text={item.name}
                              onPress={() => selectExtra(item)}
                              selected={item.selected}
                              textStyle={{
                                fontFamily: Theme.font.Medium,
                                fontSize: 16,
                                color: Theme.colors.textColor,
                              }}
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: widthPercentageToDP(35),
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: Theme.font.Medium,
                                  fontSize: 16,
                                  color: Theme.colors.textColor,
                                }}
                              >
                                +{item.price}$
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("ProductInfo")
                                }
                              >
                                {Ionicons(
                                  "information-circle-outline",
                                  20,
                                  "gray"
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <View></View>
                )}
                {/* /////end of addons////// */}
                <View
                  style={{
                    flexDirection: "column",
                    marginVertical: heightPercentageToDP(2),
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: Theme.colors.textColor,
                      fontFamily: Theme.font.SemiBold,
                    }}
                  >
                    Note to Restaurant
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      fontFamily: Theme.font.Medium,
                      marginVertical: heightPercentageToDP(1),
                    }}
                  >
                    write any instruction to restaurant regarding your order
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.postInput}
                    onChangeText={(text) => setnote(text)}
                    multiline={true}
                    value={note}
                    numberOfLines={5}
                    placeholder="eg -i am allergic to red sause"
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    require={true}
                    maxLength={200}
                  />
                </View>
              </ScrollView>
            </View>
          </ScrollView>

          {C_id == undefined ? (
            <ThemeButton
              title="Login/SignUp"
              onPress={() => navigation.navigate("SignIn")}
              buttonStyle={{
                height: heightPercentageToDP(6),
                backgroundColor: Theme.colors.brandColor,
                borderRadius: 10,
              }}
              titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
              containerStyle={{
                width: widthPercentageToDP(50),
                alignSelf: "center",
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                width: widthPercentageToDP(100),
                left: widthPercentageToDP(-5),
                paddingHorizontal: widthPercentageToDP(4),
                height: heightPercentageToDP(10),
                borderTopColor: "lightgray",
                borderTopWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: widthPercentageToDP(20),

                  height: Platform.OS === "ios" ? undefined : "100%",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => dispatch("subtract")}>
                  {Ionicons(
                    "remove-circle",
                    heightPercentageToDP(5),
                    count == 0 ? "lightgray" : Theme.colors.brandColor
                  )}
                </TouchableOpacity>

                <Text
                  style={{
                    width: "25%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    height: Platform.OS === "ios" ? undefined : "100%",
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.SemiBold,
                  }}
                >
                  {count}
                </Text>

                <TouchableOpacity onPress={() => dispatch("add")}>
                  {Ionicons(
                    "add-circle",
                    heightPercentageToDP(5),
                    Theme.colors.brandColor
                  )}
                </TouchableOpacity>
              </View>
              {/* </View> */}

              <ThemeButton
                title="Add to cart"
                onPress={() =>
                  addTocart(dishesItem, C_id, variant, note, price)
                }
                buttonStyle={{
                  height: heightPercentageToDP(6),
                  backgroundColor: Theme.colors.brandColor,
                  borderRadius: 10,
                }}
                titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                containerStyle={{
                  width: widthPercentageToDP(60),
                }}
              />
            </View>
          )}
          <Modal isVisible={isModalVisible} swipeDirection="up">
            <View style={{ flex: 1 }}>
              {/* <Text>Hello!{ data?.menu?.name }</Text> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    marginRight: 28,

                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: Theme.font.Medium,
                      marginTop: 10,
                    }}
                  >
                    {"Menu"}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: Theme.font.Medium,
                      marginTop: 10,
                    }}
                  >
                    :{"   "}
                    {modaldata[0]?.name}
                  </Text>
                  {/* <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.restaurants?.name}
                            </Text> */}
                </View>
              </View>
              <Button
                title="close"
                onPress={toggleModal}
                style={{
                  fontSize: 18,
                  color: Theme.colors.textColor,
                  fontFamily: Theme.font.SemiBold,
                }}
              />
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  postInput: {
    fontSize: 15,
    width: widthPercentageToDP(90),
    height: 100,
    fontFamily: Theme.font.Regular,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 10,
  },
});
