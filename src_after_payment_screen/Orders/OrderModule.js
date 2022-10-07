import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import { Ionicons } from "../Components/IconManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/**
 * @function LiveOrderFunction
 * @param data,navigation
 * @description it will render the UI for current order
 */

function LiveOrderFunction({ data, navigation }) {
  // console.log('data',navigation);

  /**
   * @function renderItem
   * @param item
   * @description it will render the UI for ordered item
   */ console.log("data", data);

  const renderItem = ({ item }) => {
    //   console.log("item", new Date(1650644094912));
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OrderDetail", {
            code: item.code,
            order_status: "pending",
          })
        }
      >
        <View
          style={{
            marginTop: heightPercentageToDP(2),
            borderRadius: 10,
            borderWidth: 0.7,
            borderColor: "#000",
            shadowColor: "#000",
            padding: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // backgroundColor: "#000",
            elevation: Platform.OS === "ios" ? 10 : 0,
          }}
        >
          <View
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
              Order no:#{item?.code}
            </Text>
          </View>
          {/* {item.dishes.map(items => {
            return ( */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                // backgroundColor: '#000',
                // marginRight: 10,
                //height:30,
                padding: 10,
                // width: heightPercentageToDP(9),
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                }}
              >
                {item?.order_status}
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#000',
                // marginRight: 10,
                //height:30,
                padding: 10,
                // width: heightPercentageToDP(9),
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                }}
              >
                {new Date(parseInt(item?.order_placed_at) * 1000).getDate()}-
                {
                  monthNames[
                    new Date(parseInt(item?.order_placed_at) * 1000).getMonth()
                  ]
                }
                -
                {new Date(parseInt(item?.order_placed_at) * 1000).getFullYear()}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                  textAlign: "center",
                }}
              >
                {Ionicons(
                  "time",
                  heightPercentageToDP(Platform.OS == "ios" ? 2 : 2),
                  Theme.colors.brandColor
                )}{" "}
                {new Date(
                  parseInt(item?.order_placed_at) * 1000
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
            </View>
          </View>
          {/* );
          })}  */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

/**
 * @function PastOrderFunction
 * @param data,navigation
 * @description it will render the UI for previous order
 */

function PastOrderFunction({ data, navigation }) {
  const renderItem = ({ item }) => {
    
    return (
      <>
      {item !== null 
      ? 
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OrderDetail", {
            code: item.code,
            order_status: "delivered",
          })
        }
      >
        <View
          style={{
            marginTop: heightPercentageToDP(2),
            borderRadius: 10,
            borderWidth: 0.7,
            borderColor: "#000",
            shadowColor: "#000",
            padding: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // backgroundColor: "#000",
            elevation: Platform.OS === "ios" ? 10 : 0,
          }}
        >
          <View
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
              Order no:#{item?.code}
            </Text>
          </View>
          {/* {item.dishes.map(items => {
            return ( */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                // backgroundColor: '#000',
                // marginRight: 10,
                //height:30,
                padding: 10,
                // width: heightPercentageToDP(9),
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                }}
              >
                {item?.order_status}
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#000',
                // marginRight: 10,
                //height:30,
                padding: 10,
                // width: heightPercentageToDP(9),
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                }}
              >
                {new Date(parseInt(item?.order_placed_at) * 1000).getDate()}-
                {
                  monthNames[
                    new Date(parseInt(item?.order_placed_at) * 1000).getMonth()
                  ]
                }
                -
                {new Date(parseInt(item?.order_placed_at) * 1000).getFullYear()}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: Theme.colors.brandColor,
                  fontFamily: Theme.font.Medium,
                  textAlign: "center",
                }}
              >
                {Ionicons(
                  "time",
                  heightPercentageToDP(Platform.OS == "ios" ? 2 : 2),
                  Theme.colors.brandColor
                )}{" "}
                {new Date(
                  parseInt(item?.order_placed_at) * 1000
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
     : 
     <View
      style={{
        flex: 1,
        height: heightPercentageToDP(78),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{fontFamily: Theme.font.Bold, color: '#afafaf', fontSize: 18,textAlign:'center'}}>
      NO Completed Orders
      </Text>
    </View>}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

export default (props) => {
  const { navigation } = props;
  const [PastOrders, setPastOrders] = useState(false);
  const [LiveOrders, setLiveOrders] = useState(true);
  const [orderdata, setorderdata] = useState([]);
  const data = [
    {
      id: 344,
      date: new Date(),
      dishes: [
        {
          dishname: "1x cheese pasta",
          image: Images.image_15,
        },
        {
          dishname: "1x Orange juice",
          image: Images.pepsi,
        },
      ],
    },
    {
      id: 345,
      date: new Date(),
      dishes: [
        {
          dishname: "1x garlik pasta",
          image: Images.image_15,
        },
        {
          dishname: "1x pepsi",
          image: Images.pepsi,
        },
      ],
    },
  ];

  useEffect(async () => {
    const id = JSON.parse(await AsyncStorage.getItem("sign"));

    fetchorder(id?.id);
  }, []);
  /**
   * @function fetchcart
   *  it will render the UI
   */
  const fetchorder = async (id) => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/order/${id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log("order", json.data);
    setorderdata(json.data);
  };

  return (
    <View style={{ flex: 1, paddingTop: heightPercentageToDP(1) }}>
      <View
        style={{
          flexDirection: "row",
          width: widthPercentageToDP(55),
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setLiveOrders(true);
            setPastOrders(false);
          }}
          style={{
            borderBottomWidth: 3,
            paddingBottom: 5,
            borderBottomColor: LiveOrders ? Theme.colors.brandColor : "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Bold,
            }}
          >
            Live Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLiveOrders(false);
            setPastOrders(true);
          }}
          style={{
            borderBottomWidth: 3,
            paddingBottom: 5,
            borderBottomColor: PastOrders ? Theme.colors.brandColor : "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Bold,
            }}
          >
            Past orders
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          marginTop: 0.5,
          width: widthPercentageToDP(100),
          backgroundColor: "#eee",
          left: widthPercentageToDP(-4),
        }}
      />
      {LiveOrders ? (
        <LiveOrderFunction
          data={orderdata.filter((str) => str.order_status === "pending" || str.order_status === "approved")}
          navigation={navigation}
        />
      ) : (
        <PastOrderFunction
          data={orderdata.filter((str) => str.order_status === "delivered")}
          navigation={navigation}
        />
      )}
    </View>
  );
};
