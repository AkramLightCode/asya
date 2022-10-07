import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../Constant/Theme";
import Searchbar from "../Components/Searchbar";
const { height, width } = Dimensions.get("window");
import { Ionicons } from "../Components/IconManager";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Images } from "../Constant/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default (props) => {
  const { navigation } = props;

  const Food = [
    {
      name: "Food Delivery",
      detail: "order food you love",
      image: Images.image_15,
      navigation: "Cafe",
    },
    {
      name: "               Pick-up",
      detail: "your food",
      image: Images.imageman_hold,
      navigation: "Cafe",
    },
  ];
  const [Cuisine, setCuisine] = useState([]);
  const [cartlenght, setcartlenght] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const check = async () => {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      if (id == null) {
        getAllfoodmenu();
        getCuisine();
      } else {
        getCuisine();
        fetchcart(id.id);
        getAllfoodmenu();
      }
    };
    check();
  }, []);

  const getAllfoodmenu = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/food_menus`,
      {
        method: "GET",
      }
    );
    const res = await response.json();
    setProductData(res);
  };

  const getCuisine = async () => {
    const response = await fetch(
      "http://13.233.230.232:8086/api/food_categories",
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // console.log("signup", json);
    setCuisine(json);
    setIsLoading(false);
  };

  /**
   * @function fetchcart
   *  it will render the UI
   */
  const fetchcart = async (id) => {
    try {
      const response = await fetch(
        `http://13.233.230.232:8086/api/cart/${id}`,
        {
          method: "GET",
        }
      );
      const json = (await response.jso) + n();
      console.log("cart dta", json);
      setcartlenght(json.data);
    } catch (error) {}
  };
  /**
   * @function renderItem
   * @param item
   * @description it will render the UI
   */

  const renderItem = ({ item }) => {
    // console.log("navigate item", item, item.navigation);
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.navigation)}>
        <View
          style={{
            height: 165,
            borderRadius: 10,
            width: width / 2.3,
            backgroundColor: Theme.colors.brandColor,
          }}
        >
          {/* `http://sample.adeeinfotech.com/diginn/uploads/cuisine/${item.image} */}
          <Image
            source={`${item.image}`}
            style={{
              height: 150 / 2,
              width: width / 2.2 / 2,
              left: width / 2.4 / 2,
              overflow: "hidden",
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              color: "#fff",
              fontFamily: Theme.font.Medium,
              fontSize: 22,
              paddingLeft: 10,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: Theme.font.Regular,
              fontSize: 13,
              paddingLeft: 13,
            }}
          >
            {item.detail}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * @function renderItemCuisine
   * @param item
   * @description it will render the UI for Cuisine items
   */

  const renderItemCuisine = ({ item }) => {
    // console.log("navigate renderItemCuisine", `${item.thumbnail}`);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cafe", {
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        }
      >
        <View
          style={{
            // height: 80,
            // borderRadius: 10,
            // width: width / 2.3,
            // backgroundColor: Theme.colors.brandColor,
            // justifyContent: "space-between",
            alignItems: "center",
            // paddingLeft: 10,
            // flexDirection: "row",

            width: "100%",
            height: 100,
            marginBottom: 25,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: `http://sample.adeeinfotech.com/diginn/uploads/category/${item.thumbnail}`,
            }}
            // source='http://sample.adeeinfotech.com/diginn/uploads/cuisine/w8qBZKavsCPM97Tm2JFh.jpg'
            style={{
              height: 70,
              width: 100,
              borderBottomRightRadius: 30,
              borderTopLeftRadius: 30,
              //marginRight: 10,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: Theme.colors.darkColor,
                justifyContent: "center",
                fontFamily: Theme.font.Bold,
                fontSize: 15,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />
      <View style={{ marginVertical: 20 }}>
        <Searchbar
          onChangeText={(text) => setSearchData(text)}
          value={searchData}
        />
      </View>

      {searchData == "" ? (
        <View>
          <View>
            <FlatList
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 20,
              }}
              data={Food}
              renderItem={renderItem}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>

          <Text
            style={{
              fontFamily: Theme.font.ExtraBold,
              fontSize: 20,
              marginVertical: 10,
              color: Theme.colors.darkColor,
            }}
          >
            Category
          </Text>

          <FlatList
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginVertical: 10,
            }}
            data={Cuisine}
            renderItem={renderItemCuisine}
            numColumns={2}
            scrollEnabled={true}
          />
        </View>
      ) : (
        <ScrollView>
          <View>
            {productData
              .filter((value) => {
                if (searchData === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchData.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((data, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SingleDish", { dishesItem: data })
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
                            <Text>{JSON.parse(data.price).menu}$</Text>
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};
