import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Theme } from "../Constant/Theme";
import InputBox, { Fumi } from "../Components/InpuBox";
import ThemeButton from "../Components/ThemeButton";
import { Context as AuthContext } from "../Context/AuthContext";
import { Rating, AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const { navigation, route } = props;
  const { ordercode, orderstatus, menu_id, restaurant_id } = route.params;
  console.log(
    "ordercode",
    ordercode,
    "orderstatus",
    orderstatus,
    menu_id,
    restaurant_id
  );
  const { state, signup, setreview, myreview, clearErrorMessage } =
    useContext(AuthContext);

  const [review, setReviews] = useState("");
  const [rating, setRating] = useState(3);
  const [checkdata, setcheckdata] = useState([]);

  useEffect(() => {
    const checkid = async () => {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      if (id) {
        fetchreview(id?.id, ordercode);
      }
    };
    checkid();
  }, []);

  const fetchreview = async (id, code) => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/review/${id}/${code}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setcheckdata(json.data);
    console.log("order detail inside add revioew", json.data);
    if (json.status === true) {
      setReviews(json.data[0] === undefined ? "" : json.data[0].review);
    }
  };

  /**
   * @function validation
   * @description it will check the review has text or not and post
   */

  const validation = async () => {
    if (review.length < 0) alert("please add some valuable review..");
    else {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      if (id) {
        let add = {
          ordercode: ordercode,
          orderstatus: orderstatus,
          restaurant_id: restaurant_id,
          rating: rating,
          review: review,
          customer_id: id.id,
        };
        console.log("add", add);
        const response = await fetch(
          `http://13.233.230.232:8086/api/review`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              add,
            }),
          }
        );
        const json = await response.json();
        console.log("json", json);
        setReviews(" ");
        navigation.navigate("Review");
      } else {
        alert("please Login First");
      }
      // let oldData = state.myreview != null ? state.myreview : [];
    }
  };
  const ratingCompleted = (rating) => {
    setRating(rating);
  };
 console.log("review", orderstatus,checkdata);
  return (
    <>
      {orderstatus === "delivered" || checkdata[0] !== undefined ? (
        <View style={{ flex: 1, paddingTop: heightPercentageToDP(4) }}>
          <Rating
            showRating
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10, marginBottom: 60 }}
          />

          <Text
            style={{
              fontFamily: Theme.font.SemiBold,
              fontSize: 20,
              color: Theme.colors.textColor,
              marginBottom: heightPercentageToDP(2),
              textAlign: "center",
            }}
          >
            Write your review here
          </Text>

          <View
            style={{
              borderWidth: 0.7,
              borderRadius: 10,
              paddingHorizontal: 5,
              height: heightPercentageToDP(22),
            }}
          >
            <Fumi
              label={""}
              containerStyle={{ maxHeight: heightPercentageToDP(20) }}
              inputStyle={{
                minHeight: heightPercentageToDP(20),
                color: Theme.colors.darkColor,
                fontFamily: Theme.font.Regular,
                fontSize: 16,
              }}
              value={review === null ? "" : review}
              labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
              onChangeText={(val) => setReviews(val)}
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              inputHeight={heightPercentageToDP(9)}
              inputPadding={heightPercentageToDP(9)}
              style={{
                fontSize: 16,
                color: Theme.colors.darkColor,
                fontFamily: Theme.font.Regular,
              }}
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
              title="Save"
              buttonStyle={{
                height: heightPercentageToDP(6),
                backgroundColor: Theme.colors.brandColor,
                borderRadius: 10,
              }}
              titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
              containerStyle={{
                width: widthPercentageToDP(92),
              }}
              onPress={() => validation()}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            height: heightPercentageToDP(78),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Theme.font.Bold,
              color: "#afafaf",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Add Review After Ordered Completed
          </Text>
        </View>
      )}
    </>
  );
};
