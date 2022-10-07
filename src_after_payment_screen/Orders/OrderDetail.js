import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import { Ionicons } from "../Components/IconManager";
import Modal from "react-native-modal";
export default (props) => {
  const { navigation, route } = props;
  const { code, order_status } = route.params;
  const [orderdetaildata, setorderdetaildata] = useState([]);
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (item) => {
    console.log("item", item);
    setModalVisible(!isModalVisible);
    setmodaldata([item]);
  };
  useEffect(() => {
    fetchdetails(code);
  }, []);
  const fetchdetails = async (code) => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/orderdetails/${code}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log("order details", json.data);
    setorderdetaildata(json.data);
  };

  return (
    <>
      {orderdetaildata.map((item) => {
        return (
          <View>
            <View></View>
            <View
              style={{
                marginTop: heightPercentageToDP(2),
                borderRadius: 30,
                // borderWidth:.5,
                borderColor: "#000",
                shadowColor: "#000",
                padding: 10,
               // backgroundColor:"#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,

                // elevation: Platform.OS == 'ios' ? 10 : 1,
              }}
            >
              {/* <View
                style={{
                  flexDirection: "row",
                  marginTop: heightPercentageToDP(2),
                  marginBottom: heightPercentageToDP(1),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.SemiBold,
                  }}
                >
                  Order no:#{"item.id"}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Theme.colors.brandColor,
                    fontFamily: Theme.font.Medium,
                  }}
                >
                  Preparing
                </Text>
              </View> */}
              {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: heightPercentageToDP(1),
            marginBottom: heightPercentageToDP(1),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Medium,
            }}>
            Krishna caf'e
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Medium,
            }}>
            {'item.date.toLocaleDateString()'}
          </Text>
        </View> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: heightPercentageToDP(2),
                  paddingBottom: heightPercentageToDP(1),
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#eeee",
                  justifyContent: "space-between",
                }}
              >
                {Ionicons(
                  "time-outline",
                  heightPercentageToDP(3),
                  Theme.colors.brandColor
                )}
                <Text
                  style={{
                    fontSize: 15,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.Medium,
                  }}
                >
                  {" "}
                  Delivery{" "}
                </Text>
              </View> */}

              {/* {item.dishes.map(items => {
          return ( */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                  //justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    
                    marginRight: 30,
                    height: heightPercentageToDP(9),
                    width: heightPercentageToDP(9),
                    overflow: "hidden",
                    borderRadius: 10,
                    
                  }}
                >
                  <Image
                    source={{
                      uri: `http://sample.adeeinfotech.com/diginn/uploads/menu/${item.menu.thumbnail}`,
                    }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="stretch"
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium,color:Theme.colors.brandColor }}>
                    {item.menu.name}
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium ,color:Theme.colors.textColor  }}>
                    {"Restaurant"} : {item.restaurants.name}
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium,color:Theme.colors.textColor   }}>
                    {"Total"} : {item.total}
                  </Text>
                </View>

                {/* <View>
                  <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium }}>
                    {"Variant"}
                  </Text> */}
                {/* <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium }}>
                    {item.variant.name}:
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontFamily: Theme.font.Medium }}
                    onPress={toggleModal}
                  >
                    {item.variant.options}
                  </Text> */}
                {/* </View> */}
              </View>
              {/* <Modal isVisible={isModalVisible}>
                  <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>

                    <Button title="Hide modal" onPress={toggleModal} />
                  </View>
                </Modal> */}
              {/*    );
         })} */}
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 0.5,
                  borderTopColor: "#eee",
                  paddingTop: heightPercentageToDP(2),
                  marginTop: heightPercentageToDP(2),
                  marginBottom: heightPercentageToDP(1),
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Details"
                  style={{
                    fontSize: 18,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.SemiBold,
                  }}
                  onPress={() => toggleModal(item)}
                />
                <Button
                  title="Reviews"
                  style={{
                    fontSize: 18,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.SemiBold,
                  }}
                  onPress={() =>
                    navigation.navigate("AddReview", {
                      ordercode: item.order_code,
                      orderstatus: order_status,
                      menu_id: item.menu.id,
                      restaurant_id: item.restaurants.id,
                    })
                  }
                />
                {modaldata.map((data) => {
                  return (
                    <Modal isVisible={isModalVisible} swipeDirection="up">
                      <View style={{ flex: 1 }}>
                        {/* <Text>Hello!{ data?.menu?.name }</Text> */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 5,
                            //justifyContent: "space-between",
                            // backgroundColor: "#ffff",
                            // color: "#000",
                          }}
                        >
                          <View
                            style={{
                              marginRight: 28,
                              // height: heightPercentageToDP(9),
                              // width: heightPercentageToDP(9),
                              // overflow: "hidden",
                              // borderRadius: 10,
                              flexDirection: "column",
                            }}
                          >
                            {/* <Image
                    source={{
                      uri: `http://sample.adeeinfotech.com/diginn/uploads/menu/${item.menu.thumbnail}`,
                    }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="stretch"
                  /> */}
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
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              {"Restrarant"}
                              {"  "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              {"Variants"}
                              {"  "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              {"Addon"}
                              {"  "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              {"Quantity"}
                              {"  "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              {"Total"}
                              {"  "}
                            </Text>
                          </View>
                          <View
                            style={{
                              // backgroundColor: "#000",

                              // height: heightPercentageToDP(9),
                              // width: heightPercentageToDP(9),
                              // overflow: "hidden",
                              // borderRadius: 10,
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
                              {data?.menu?.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.restaurants?.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.variant === null
                                ? "No variant selected"
                                : data?.variant?.options}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.addon === null
                                ? "No addon selected"
                                : data?.addon?.options}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.quantity}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: Theme.font.Medium,
                                marginTop: 10,
                              }}
                            >
                              :{"   "}
                              {data?.total}$
                            </Text>
                          </View>

                          {/* <View>
                  <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium }}>
                    {"Variant"}
                  </Text> */}
                          {/* <Text style={{ fontSize: 15, fontFamily: Theme.font.Medium }}>
                    {item.variant.name}:
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontFamily: Theme.font.Medium }}
                    onPress={toggleModal}
                  >
                    {item.variant.options}
                  </Text> */}
                          {/* </View> */}
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
                  );
                })}
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};
