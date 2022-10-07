import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  Button,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";
import ThemeButton from "../Components/ThemeButton";
import { Context as AuthContext } from "../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @function LiveOrderFunction
 * @param data,navigation
 * @description it will render the UI for current order
 */

function LiveOrderFunction({ data, navigation }) {
  // console.log('data',navigation);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: heightPercentageToDP(2),
          borderRadius: 10,
          borderWidth: 0.7,
          borderColor: "#eeee",
          shadowColor: "#000",
          padding: 10,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: Platform.OS == "ios" ? 10 : 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: heightPercentageToDP(1),
            marginBottom: heightPercentageToDP(1),
            //  justifyContent: "space-between",
          }}
        >
          {/* <Text
            style={{
              fontSize: 18,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}
          >
            Order Code {'   '}:
          </Text> */}
          <View
            style={{
              //marginRight: 28,
              // height: heightPercentageToDP(9),
              // width: heightPercentageToDP(9),
              // overflow: "hidden",
              // borderRadius: 10,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              {"Order Code"}
              {"  "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              {"Restaurant "}
              {"  "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              {"Rating"}
              {"  "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              {"Review"}
              {"  "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              {"Action"}
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
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
                flexWrap: "wrap",
              }}
            >
              :{"   "}
              {item?.order_code}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              :{"   "}
              {item?.restaurant?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 10,
              }}
            >
              :{"   "}
              {item?.rating}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.font.Medium,
                marginTop: 5,
              }}
            >
              :{"   "}
              {item?.review}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: Theme.colors.textColor,
                fontFamily: Theme.font.SemiBold,
                backgroundColor: "#007bff",
                borderRadius: 100,
                width: 100,
                height: 30,
                marginLeft: 10,
              }}
              onPress={() =>
                navigation.navigate("AddReview", {
                  ordercode: item.order_code,
                  rating: item.rating,
                  review: item.review,
                  restaurant_id: item.restaurant_id,
                })
              }
            >
               {"   "}update
            </Text>
          </View>
        </View>
        {/* {item.dishes.map((items) => {
          return ( */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          {/* <View
            style={{
              backgroundColor: "#000",
              marginRight: 10,
              height: heightPercentageToDP(9),
              width: heightPercentageToDP(9),
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <Image
              source={"items.image"}
              style={{ height: "100%", width: "100%" }}
              resizeMode="stretch"
            />
          </View> */}
        </View>
        {/* );
         })} */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

// /**
//  * @function PastOrderFunction
//  * @param data,navigation
//  * @description it will render the UI for previous order
//  */

// function PastOrderFunction({ data, navigation }) {
//   const { state, signup, removeReview, clearErrorMessage } =
//     useContext(AuthContext);

//   const onRemove = (item) => {
//     console.log("onremove", item);
//     let removalbeitm = data.filter((it) => it.id != item.id);
//     removeReview(removalbeitm);
//   };

//   const emptyCompo = () => (
//     <View
//       style={{
//         flex: 1,
//         height: heightPercentageToDP(78),
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text
//         style={{ fontFamily: Theme.font.Bold, color: "#afafaf", fontSize: 18 }}
//       >
//         No Reviews found
//       </Text>
//     </View>
//   );

//   const renderItem = ({ item }) => {
//     return (
//       <View
//         style={{
//           marginTop: heightPercentageToDP(2),
//           borderRadius: 10,
//           borderWidth: 0.7,
//           borderColor: "#eeee",
//           shadowColor: "#000",
//           padding: 10,
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,

//           elevation: Platform.OS == "ios" ? 10 : 0,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             marginTop: heightPercentageToDP(2),
//             marginBottom: heightPercentageToDP(1),
//             justifyContent: "space-between",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 18,
//               color: Theme.colors.textColor,
//               fontFamily: Theme.font.SemiBold,
//             }}
//           >
//             Order no:#{item.order}
//           </Text>
//           <TouchableOpacity onPress={() => onRemove(item)}>
//             <Image
//               source={Images.delete}
//               style={{ height: 17, width: 17 }}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//         <Text>{item.date.toLocaleDateString()}</Text>
//         <Text
//           style={{
//             marginVertical: heightPercentageToDP(2),
//             fontFamily: Theme.font.Medium,
//             fontSize: 12,
//             color: Theme.colors.textColor,
//           }}
//         >
//           {item.review}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         ListEmptyComponent={() => emptyCompo()}
//       />
//     </View>
//   );
// }

export default (props) => {
  const { state, signup, setreview, clearErrorMessage } =
    useContext(AuthContext);

  const { navigation } = props;
  const [PastOrders, setPastOrders] = useState(false);
  const [LiveOrders, setLiveOrders] = useState(true);
  const [ReviewData, setReviewData] = useState([]);

  useEffect(async () => {
    const checkid = async () => {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      if (id) {
        await fetchreviews(id?.id);
      }
    };
    checkid();
  }, []);

  const fetchreviews = async (id) => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/review/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log("Review", json);
    setReviewData(json.data);
  };

  return (
    <View style={{ flex: 1, paddingTop: heightPercentageToDP(1) }}>
      <View
        style={{
          flexDirection: "row",
          width: widthPercentageToDP(Platform.OS === "ios" ? 55 : 60),
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
            Your reviews
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
          {/* <Text
            style={{
              fontSize: 15,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Bold,
            }}
          >
            Your reviews
          </Text> */}
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
      {/* {LiveOrders ? ( */}
        <LiveOrderFunction data={ReviewData} navigation={navigation} />
      {/* )
       : (
        <PastOrderFunction
          data={state.myreview || []}
          navigation={navigation}
        />
      )} */}
    </View>
  );
};
