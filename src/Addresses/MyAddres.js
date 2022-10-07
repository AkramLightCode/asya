import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { MaterialIcons } from "../Components/IconManager";
import { Theme } from "../Constant/Theme";
import { Context as AuthContext } from "../Context/AuthContext";
import ThemeButton from "../Components/ThemeButton";
import AddressComponent from "../Components/AddressComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default (props) => {
  const { state, signup, setaddress, removeAddress, clearErrorMessage } =
    useContext(AuthContext);

  const [address, setadress] = useState([]);
  const [userid, setuserid] = useState([]);
  const { navigation, route } = props;
  //const {  status } =ro const id = JSON.parse(await AsyncStorage.getItem('sign'));ute.paramas;

  const [loading, setloading] = useState(false);
 
    useEffect(async () => {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      setuserid(id?.id);
      await fetchaddress(id?.id);
      console.log("user id", id?.id);
      if (route !== undefined) {
        // if (route.params.status === true) {
        //    console.log("status",route.params.status)
        // }
        console.log("status", route.params);
      }

      setloading(false);
    }, [loading])
  
  const fetchaddress = async (id) => {
    console.log("id checking", id);
    const response = await fetch(
      `http://13.233.230.232:8086/api/customers/getcustomer/${id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    // const data= await JSON.parse(json)
    console.log("get customer", json.data);
    setadress([json.data]);
  };
  /**
   * @function newAdd
   * @description it will redirect to NewAdd for new Address
   */

  const newAdd = (item) => {
    if (item?.address_1 === null || item?.address_1 === undefined) {
      navigation.navigate("NewAdd", { title: "new", item: item });
    } else if (item?.address_2 === null || item?.address_2 === undefined) {
      navigation.navigate("NewAdd2", { title: "new", item: item });
    } else {
      navigation.navigate("NewAdd3", { title: "new", item: item });
    }
  };
  let x;
  console.log("address", address);
  /**
   * @function editAdd
   * @param Address
   * @description it will get redirect to NewAdd file for edit
   */

  const editAdd = (item) => {
    navigation.navigate("NewAdd", { title: "edit", item: item });
  };

  const editAdd2 = (item) => {
    navigation.navigate("NewAdd2", { title: "edit2", item: item });
  };
  const editAdd3 = (item) => {
    navigation.navigate("NewAdd3", { title: "edit3", item: item });
  };
  /**
   * @function onRemove
   * @param address
   * @description it will remove the address from the list
   */

  const onRemove2 = async (id) => {
    // console.log("onremove2", id);
    // let removalbeitm = state.myaddress.filter((it) => it.House != item.House);
    // removeAddress(id);
    const response = await fetch(
      `http://13.233.230.232:8086/api/customers/updatesecond/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log("delete address1", json);
    if (json.status === true) {
      await fetchaddress(userid);
    }
  };

  const onRemove3 = async (id) => {
    // console.log("onremove3", id);
    // let removalbeitm = state.myaddress.filter((it) => it.House != item.House);
    // removeAddress(id);
    const response = await fetch(
      `http://13.233.230.232:8086/api/customers/updatethird/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log("delete address1", json);
    if (json.status === true) {
      await fetchaddress(userid);
    }
  };

  const onRemove = async (id) => {
    console.log("onremove1", id);
    const response = await fetch(
      `http://13.233.230.232:8086/api/customers/updatefirst/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log("delete address1", json);
    if (json.status === true) {
      await fetchaddress(userid);
    }
  };

  return (
    <>
      {address[0] !== undefined ? (
        <View>
          {address.map((item, index) => {
            return (
              <>
                {item.address_1 !== null &&
                item.address_2 !== null &&
                item.address_3 !== null ? (
                  <>
                    <View key={item?.address_1}>
                      <AddressComponent
                        House={item?.address_1}
                        City={JSON.parse(item?.coordinate_1)?.longitude}
                        Landmark={JSON.parse(item?.coordinate_1)?.latitude}
                        onEdit={() => editAdd(item)}
                        onRemove={() => onRemove(item.user_id)}
                      />
                    </View>

                    <View key={item?.address_2}>
                      <AddressComponent
                        House={item?.address_2}
                        City={JSON.parse(item?.coordinate_2)?.longitude}
                        Landmark={JSON.parse(item?.coordinate_2)?.latitude}
                        onEdit={() => editAdd2(item)}
                        onRemove={() => onRemove2(item?.user_id)}
                      />
                    </View>

                    <View key={item?.address_3}>
                      <AddressComponent
                        House={item?.address_3}
                        City={JSON.parse(item?.coordinate_3)?.longitude}
                        Landmark={JSON.parse(item?.coordinate_3)?.latitude}
                        onEdit={() => editAdd3(item)}
                        onRemove={() => onRemove3(item?.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_1 !== null && item.address_3 !== null ? (
                  <>
                    <View key={item.address_1}>
                      <AddressComponent
                        House={item.address_1}
                        City={JSON.parse(item.coordinate_1).longitude}
                        Landmark={JSON.parse(item.coordinate_1).latitude}
                        onEdit={() => editAdd(item)}
                        onRemove={() => onRemove(item.user_id)}
                      />
                    </View>
                    <View key={item.address_3}>
                      <AddressComponent
                        House={item.address_3}
                        City={JSON.parse(item.coordinate_3).longitude}
                        Landmark={JSON.parse(item.coordinate_3).latitude}
                        onEdit={() => editAdd3(item)}
                        onRemove={() => onRemove3(item.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_1 !== null && item.address_2 !== null ? (
                  <>
                    <View key={item.address_1}>
                      <AddressComponent
                        House={item.address_1}
                        City={JSON.parse(item.coordinate_1).longitude}
                        Landmark={JSON.parse(item.coordinate_1).latitude}
                        onEdit={() => editAdd(item)}
                        onRemove={() => onRemove(item.user_id)}
                      />
                    </View>

                    <View key={item.address_2}>
                      <AddressComponent
                        House={item.address_2}
                        City={JSON.parse(item.coordinate_2).longitude}
                        Landmark={JSON.parse(item.coordinate_2).latitude}
                        onEdit={() => editAdd2(item)}
                        onRemove={() => onRemove2(item.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_2 !== null && item.address_3 !== null ? (
                  <>
                    <View key={item.address_2}>
                      <AddressComponent
                        House={item.address_2}
                        City={JSON.parse(item.coordinate_2).longitude}
                        Landmark={JSON.parse(item.coordinate_2).latitude}
                        onEdit={() => editAdd2(item)}
                        onRemove={() => onRemove2(item.user_id)}
                      />
                    </View>

                    <View key={item.address_3}>
                      <AddressComponent
                        House={item.address_3}
                        City={JSON.parse(item.coordinate_3).longitude}
                        Landmark={JSON.parse(item.coordinate_3).latitude}
                        onEdit={() => editAdd3(item)}
                        onRemove={() => onRemove3(item.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_3 !== null ? (
                  <>
                    <View key={item.address_3}>
                      <AddressComponent
                        House={item.address_3}
                        City={JSON.parse(item.coordinate_3).longitude}
                        Landmark={JSON.parse(item.coordinate_3).latitude}
                        onEdit={() => editAdd3(item)}
                        onRemove={() => onRemove3(item.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_2 !== null ? (
                  <>
                    <View key={item.address_2}>
                      <AddressComponent
                        House={item.address_2}
                        City={JSON.parse(item.coordinate_2).longitude}
                        Landmark={JSON.parse(item.coordinate_2).latitude}
                        onEdit={() => editAdd2(item)}
                        onRemove={() => onRemove2(item.user_id)}
                      />
                    </View>
                  </>
                ) : item.address_1 !== null ? (
                  <>
                    <View key={item.address_1}>
                      <AddressComponent
                        House={item.address_1}
                        City={JSON.parse(item.coordinate_1).longitude}
                        Landmark={JSON.parse(item.coordinate_1).latitude}
                        onEdit={() => editAdd(item)}
                        onRemove={() => onRemove(item.user_id)}
                      />
                    </View>
                  </>
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
                      }}
                    >
                      No address found
                    </Text>
                  </View>
                )}
              </>
            );
          })}
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
            }}
          >
            No address found
          </Text>
        </View>
      )}

      {/* 
    //////footer button///// */}

      <View style={{ flex: 1 }}>
        {/* <FlatList
        data={state.myaddress}
        renderItem={renderItem}
        ListEmptyComponent={emptyCompo}
      /> */}

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
          <View
            style={{
              paddingBottom: 10,
            }}
          >
            {address[0] !== undefined ? (
              <View>
                {address[0].address_1 === null ? (
                  <ThemeButton
                    title="Add Address"
                    buttonStyle={{
                      height: heightPercentageToDP(6),
                      backgroundColor: Theme.colors.brandColor,
                      borderRadius: 10,
                    }}
                    titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                    containerStyle={{
                      width: widthPercentageToDP(92),
                    }}
                    onPress={() => newAdd(...address)}
                  />
                ) : address[0].address_2 === null ? (
                  <ThemeButton
                    title="Add Address 2"
                    buttonStyle={{
                      height: heightPercentageToDP(6),
                      backgroundColor: Theme.colors.brandColor,
                      borderRadius: 10,
                    }}
                    titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                    containerStyle={{
                      width: widthPercentageToDP(92),
                    }}
                    onPress={() => newAdd(...address)}
                  />
                ) : (
                  <ThemeButton
                    title="Add Address 3"
                    buttonStyle={{
                      height: heightPercentageToDP(6),
                      backgroundColor: Theme.colors.brandColor,
                      borderRadius: 10,
                    }}
                    titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                    containerStyle={{
                      width: widthPercentageToDP(92),
                    }}
                    onPress={() => newAdd(...address)}
                  />
                )}
              </View>
            ) : (
              <ThemeButton
                title="Add Addresss"
                buttonStyle={{
                  height: heightPercentageToDP(6),
                  backgroundColor: Theme.colors.brandColor,
                  borderRadius: 10,
                }}
                titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                containerStyle={{
                  width: widthPercentageToDP(92),
                }}
                onPress={() => newAdd(...address)}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};
