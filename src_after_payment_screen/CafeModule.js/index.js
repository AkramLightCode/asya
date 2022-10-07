import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "../Components/IconManager";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import { Theme } from "../Constant/Theme";

export default (props) => {
  const { navigation, route } = props;
  const [category, setcategory] = useState({
    id: "",
    name: "",
  });
  const [dishes, setdishes] = useState([]);

  const [restaurants, setrestaurants] = useState([]);
  useEffect(() => {
    if (route.params) {
      setcategory({
        id: route.params.id,
        name: route.params.name,
      });
      getfoodmenu(route.params.id)
    }
 else{
  getAllfoodmenu()
}
  }, [route?.params?.id]);

  const getfoodmenu = async (id) => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/food_menus/${id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // const data= await JSON.parse(json)
    console.log("food_menus", json[0].restaurant_id);
    setdishes(json);
    if (json) {
      await getrestro(json[0].restaurant_id);
    }
  };

 const getAllfoodmenu = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/food_menus`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // const data= await JSON.parse(json)
    console.log("food_menus", json[0].restaurant_id);
    setdishes(json);
    if (json) {
      await getrestro();
    }
  };

  const getrestro = async (id) => {
    if(id){
      const response = await fetch(
        `http://13.233.230.232:8086/api/restaurants/1`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      //console.log("first", json);
      setrestaurants([json]);
    }else{
      const response = await fetch(
        `http://13.233.230.232:8086/api/restaurants/1`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      //console.log("first", json);
      setrestaurants([json]);
    }
  
  };



  // console.log("restaurants line no 65r", restaurants, dishes);
  return (
    <>
      {restaurants[0] !== undefined ? (
        <View style={{ flex: 1, paddingTop: heightPercentageToDP(2) }}>
          {restaurants.map((data,index) => 
          
              <View key={index}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Theme.colors.textColor,
                    fontFamily: Theme.font.Bold,
                  }}
                >
                  {data.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    fontFamily: Theme.font.Medium,
                    marginVertical: heightPercentageToDP(1),
                  }}
                >
                  Indian | Chinese
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "gray",
                        fontFamily: Theme.font.Medium,
                      }}
                    >
                      450 away |{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "gray",
                        fontFamily: Theme.font.Medium,
                      }}
                    >
                      {data.rating} ratings
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MoreInfo", { MoreInfodata: data })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: Theme.colors.brandColor,
                        fontFamily: Theme.font.Bold,
                      }}
                    >
                      More info
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: heightPercentageToDP(0.5),
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    <Text
                      style={{
                        fontSize: 15,
                        color: Theme.colors.brandColor,
                        fontFamily: Theme.font.Regular,
                      }}
                    >
                      {data.maximum_time_to_deliver} minutes
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 15,
                      color: Theme.colors.brandColor,
                      fontFamily: Theme.font.Bold,
                    }}
                  >
                    Change
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: heightPercentageToDP(3),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: widthPercentageToDP(40),
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setSelectpasta(true);
                        setSelectCold(false);
                      }}
                      style={{
                        borderBottomWidth: 3,
                        paddingBottom: 5,
                        borderBottomColor: Theme.colors.brandColor,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: Theme.colors.textColor,
                          fontFamily: Theme.font.Bold,
                        }}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
              { /*   <TouchableOpacity
                    onPress={() => navigation.navigate("Filter")}
                  >
                    {Ionicons(
                      "options",
                      heightPercentageToDP(3),
                      Theme.colors.brandColor
                    )}
                    </TouchableOpacity>*/}
                </View>
                </View>
           
          )}
          {/* <View style={{ marginVertical: 15 }}>
            <Text
              style={{
                fontSize: 15,
                color: Theme.colors.textColor,
                fontFamily: Theme.font.Bold,
                marginVertical: heightPercentageToDP(1),
              }}
            >
              {"selectedpasta "}
            </Text>
          </View> */}
          <ScrollView>
          {dishes.map((data, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleDish", { dishesItem: data  })
                  }
                >
                  <View
                    style={{
                      width: widthPercentageToDP(92),
                      justifyContent: "space-between",
                      paddingVertical: 3,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "lightgray",
                      paddingBottom: 5,
                      flexDirection: "row",
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: widthPercentageToDP(65),
                      }}
                    >
                      <Text
                        style={{
                          color: Theme.colors.darkColor,
                          justifyContent: "center",
                          fontFamily: Theme.font.Bold,
                          fontSize: 14,
                          marginVertical: 5,
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          color: Theme.colors.darkColor,
                          justifyContent: "center",
                          fontFamily: Theme.font.Regular,
                          fontSize: 15,
                        }}
                      >
                        {data.details === null ? " " : data.details}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: heightPercentageToDP(1),
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text   style={{
                          color: Theme.colors.darkColor,
              
                        }}>{JSON.parse(data.price).menu}$</Text>
                        {Ionicons(
                          "information-circle-outline",
                          heightPercentageToDP(2),
                          Theme.colors.textColor
                        )}
                      </View>
                    </View>

                    <Image
                      source={{
                        uri: `http://sample.adeeinfotech.com/diginn/uploads/menu/${data.thumbnail}`,
                      }}
                      style={{
                        height: heightPercentageToDP(11),
                        width: widthPercentageToDP(92) / 3,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#E41717" />
        </View>
      )}
    </>
  );
};
