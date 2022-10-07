import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Theme } from "../Constant/Theme";
import InputBox, { Fumi } from "../Components/InpuBox";
import ThemeButton from "../Components/ThemeButton";
import { Context as AuthContext } from "../Context/AuthContext";
import { Images } from "../Constant/Images";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default (props) => {
  const { state, signup, setaddress, clearErrorMessage } =
    useContext(AuthContext);

  const { navigation, route } = props;
  const { params } = route;
  const { title, item } = params;

  console.log("title, item", title, item);
  const [Region, setRegion] = useState({
    latitude: 35.6762,
    longitude: 74.6503,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [City, setCity] = useState(
    item.address_2 != null ? item.address_2 : null
  );

  const [House, setHouse] = useState(
    item.coordinate_2 != null ? JSON.parse(item.coordinate_2).latitude : null
  );
  const [Landmark, setLandmark] = useState(
    item.coordinate_2 != null ? JSON.parse(item.coordinate_2).longitude : null
  );

  useEffect(() => {
    const setloc = () => {
      Geolocation.getCurrentPosition((info) => {
        setHouse(
          item.coordinate_2 != null
            ? JSON.parse(item.coordinate_2).latitude
            : info.coords.latitude
        );
        setLandmark(
          item.coordinate_2 != null
            ? JSON.parse(item.coordinate_2).longitude
            : info.coords.longitude
        );
        setRegion({
          latitude: Number(
            item.coordinate_2 != null
              ? JSON.parse(item.coordinate_2).latitude
              : info.coords.latitude
          ),
          longitude: Number(
            item.coordinate_2 != null
              ? JSON.parse(item.coordinate_2).longitude
              : info.coords.longitude
          ),
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        });
        const pos = {
          lat: Number(
            item.coordinate_2 != null
              ? JSON.parse(item.coordinate_2).latitude
              : info.coords.latitude
          ),
          lng:
            item.coordinate_2 != null
              ? JSON.parse(item.coordinate_2).longitude
              : info.coords.longitude,
        };
        if (item.address_2 === null || item.address_2 === undefined) {
          setadd(pos);
        }
      });
    };
    const setadd = (data) => {
      Geocoder.geocodePosition(data)
        .then((res) => {
          setCity(res[0].formattedAddress);
        })
        .catch((error) => alert("Address Not Found"));
    };
    setloc();
  }, []);
  /**
   * @function newAdd
   * @description it will redirect to NewAdd for new Address
   */

  const newAdd = (item, house, city, landmark) => {
    console.log("checking all", house, city, landmark);
    let newitem = {
      address_1: item.address_1 !== null ? item.address_1 : null,
      coordinate_1: item.coordinate_1 !== null ? item.coordinate_1 : null,
      address_2: city !== null ? city : null,
      coordinate_2:
        house !== null || landmark !== null
          ? JSON.stringify({
              latitude: house !== null ? house : null,
              longitude: landmark !== null ? landmark : null,
            })
          : null,
      user_id: item.user_id,
    };

    navigation.navigate("NewAdd3", { title: "new", item: newitem });
  };

  console.log("city", City, Landmark, House);

  const UpdateAdd = async (id, house, city, landmark) => {
    let user_id = id;
    let address_2 = house;
    let coordinate_2 = JSON.stringify({ latitude: city, longitude: landmark });
    // const response = await fetch(
    //   `http://13.233.230.232:8086/api/customers/updatesecond`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ user_id, address_2, coordinate_2 }),
    //   }
    // );
    // const json = await response.json();
    // console.log("update", json);
    // if (json.status === true) {
    //   navigation.navigate("MyAdd");
    // }
  };
  console.log("user_id", House);
  return (
    <>
      <View style={{ flex: 1, paddingTop: heightPercentageToDP(0.1) }}>
        <View
          style={{
            marginBottom: heightPercentageToDP(4),
            height: heightPercentageToDP(25),
            width: widthPercentageToDP(100),
            left: widthPercentageToDP(-4),
          }}
        >
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
        <Text
          style={{
            fontFamily: Theme.font.SemiBold,
            fontSize: 20,
            color: Theme.colors.textColor,
            marginBottom: heightPercentageToDP(2),
          }}
        >
          Add new address
        </Text>
        <View
          style={{
            borderWidth: 0.7,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginTop: heightPercentageToDP(2),
          }}
        >
          <Fumi
            label={"Address 2"}
            value={City === null ? "" : City}
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
              height: 80,
            }}
            labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
            onChangeText={(val) => setCity(val)}
            inputHeight={40}
          />
        </View>
        <View
          style={{
            borderWidth: 0.7,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginTop: heightPercentageToDP(2),
          }}
        >
          <Fumi
            label={" Longitude"}
            value={
              Landmark === null
                ? ""
                : item.coordinate_2 != null
                ? JSON.stringify(Landmark)
                : JSON.stringify(Landmark)
            }
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
            }}
            labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
            onChangeText={(val) => {
              setLandmark(val);
              setRegion({
                latitude: Region.latitude,
                longitude: Number(val),
                latitudeDelta: Region.latitudeDelta,
                longitudeDelta: Region.longitudeDelta,
              });
            }}
            inputHeight={40}
          />
          <Text
            style={{ color: "blue", textAlign: "right" }}
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/watch?v=CgFiSJ11Uk8&feature=youtu.be"
              )
            }
          >
            How to get it?
          </Text>
        </View>

        <View
          style={{
            borderWidth: 0.7,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginTop: heightPercentageToDP(2),
          }}
        >
          <Fumi
            label={"Latitude"}
            value={
              House === null
                ? ""
                : item.coordinate_2 != null
                ? JSON.stringify(House)
                : JSON.stringify(House)
            }
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
            }}
            labelStyle={{ color: "gray", fontFamily: Theme.font.Regular }}
            onChangeText={(val) => {
              setHouse(val);
              setRegion({
                latitude: Number(val),
                longitude: Region.longitude,
                latitudeDelta: Region.latitudeDelta,
                longitudeDelta: Region.longitudeDelta,
              });
            }}
            inputHeight={40}
          />
          <Text
            style={{ color: "blue", textAlign: "right" }}
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/watch?v=CgFiSJ11Uk8&feature=youtu.be"
              )
            }
          >
            How to get it?
          </Text>
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
        ></View>
      </View>
      {/* 
    //////footer button///// */}
      <View style={{ flex: 1 }}>
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
            {item.address_2 === null || item.coordinate_2 === null  || item.address_2 === undefined? (
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
                onPress={() => newAdd(item, House, City, Landmark)}
              />
            ) : (
              <ThemeButton
                title="Apply Changes"
                buttonStyle={{
                  height: heightPercentageToDP(6),
                  backgroundColor: Theme.colors.brandColor,
                  borderRadius: 10,
                }}
                titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
                containerStyle={{
                  width: widthPercentageToDP(92),
                }}
                onPress={() => UpdateAdd(item.user_id, House, City, Landmark)}
              />
            )}
          </View>
        </View>
      </View>
    </>
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
