import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default (props) => {
  const { navigation, route } = props;
  const { MoreInfodata } = route.params;
  const [moreinfo, setmoreinfo] = useState([MoreInfodata]);
  console.log("MoreInfodata");
  const [Region, setRegion] = useState({
    latitude: Number(moreinfo[0]?.latitude),
    longitude: Number(moreinfo[0]?.longitude),
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  return (
    <>
      {moreinfo[0] !== undefined ? (
        <View style={{ flex: 1, paddingTop: heightPercentageToDP(2) }}>
          {moreinfo.map((data) => {
            return (
              <>
                <View style={{ flex: 1, paddingTop: heightPercentageToDP(2) }}>
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
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    {Ionicons("star", 17, Theme.colors.brandColor)}
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: -2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Theme.font.SemiBold,
                          fontSize: 17,
                          color: Theme.colors.textColor,
                          marginLeft: 10,
                        }}
                      >
                        4.3
                      </Text>
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 15,
                          color: Theme.colors.textColor,
                          marginLeft: 10,
                        }}
                      >
                        100 people rated
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: heightPercentageToDP(2),
                    }}
                  >
                    <Image
                      source={Images.map_marker}
                      style={{ height: 18, width: 18 }}
                      resizeMode="contain"
                      tintColor={Theme.colors.brandColor}
                    />

                    <Text
                      style={{
                        fontFamily: Theme.font.Medium,
                        fontSize: 15,
                        color: Theme.colors.textColor,
                        marginLeft: 10,
                      }}
                    >
                      {data.address}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {Ionicons(
                      "time-outline",
                      heightPercentageToDP(2.5),
                      Theme.colors.brandColor
                    )}
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          fontFamily: Theme.font.Medium,
                          fontSize: 15,
                          color: Theme.colors.textColor,
                          marginLeft: 10,
                        }}
                      >
                        Opening times
                      </Text>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            // marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).monday_opening === "closed"
                            ? JSON.parse(data.schedule).monday_opening
                            : JSON.parse(data.schedule).monday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).monday_closing === "closed"
                            ? ""
                            : JSON.parse(data.schedule).monday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            marginLeft: 10,
                          }}
                        >
                          Monday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            //   marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).tuesday_opening ===
                          "closed"
                            ? JSON.parse(data.schedule).tuesday_opening
                            : JSON.parse(data.schedule).tuesday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).tuesday_closing ===
                          "closed"
                            ? ""
                            : JSON.parse(data.schedule).tuesday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            marginLeft: 70,
                          }}
                        >
                          Tuesday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            // marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).wednesday_opening ===
                          "closed"
                            ? JSON.parse(data.schedule).wednesday_opening
                            : JSON.parse(data.schedule).wednesday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).wednesday_closing ===
                          "closed"
                            ? ""
                            : JSON.parse(data.schedule).wednesday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            marginLeft: 10,
                          }}
                        >
                          Wensday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            // marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).thursday_opening ===
                          "closed"
                            ? JSON.parse(data.schedule).thursday_opening
                            : JSON.parse(data.schedule).thursday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).thursday_closing ===
                          "closed"
                            ? ""
                            : JSON.parse(data.schedule).thursday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            marginLeft: 10,
                          }}
                        >
                          Thursday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            // marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).friday_opening === "closed"
                            ? JSON.parse(data.schedule).friday_opening
                            : JSON.parse(data.schedule).friday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).friday_closing === "closed"
                            ? ""
                            : JSON.parse(data.schedule).friday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            marginLeft: 10,
                          }}
                        >
                          Friday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 14,
                            color: Theme.colors.textColor,
                            // marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).saturday_opening ===
                          "closed"
                            ? JSON.parse(data.schedule).saturday_opening
                            : JSON.parse(data.schedule).saturday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).saturday_closing ===
                          "closed"
                            ? ""
                            : JSON.parse(data.schedule).saturday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            //  marginLeft: 10,
                          }}
                        >
                          Saturday
                        </Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            //   marginLeft: 10,
                          }}
                        >
                          {JSON.parse(data.schedule).sunday_opening === "closed"
                            ? JSON.parse(data.schedule).sunday_opening
                            : JSON.parse(data.schedule).sunday_opening +
                              " " +
                              "AM"}{" "}
                          -{" "}
                          {JSON.parse(data.schedule).sunday_closing === "closed"
                            ? ""
                            : JSON.parse(data.schedule).sunday_closing +
                              " " +
                              "PM"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Theme.font.Regular,
                            fontSize: 15,
                            color: Theme.colors.textColor,
                            //  marginLeft: 10,
                          }}
                        >
                          Sunday
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      borderBottomWidth: 3,
                      margin: widthPercentageToDP(8),
                      paddingBottom: 5,
                      borderBottomColor: Theme.colors.brandColor,
                      width: widthPercentageToDP(14),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: Theme.colors.textColor,
                        fontFamily: Theme.font.Bold,
                      }}
                    >
                      About
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: heightPercentageToDP(20),
                      width: undefined,
                      marginBottom:20,
                    }}
                  >
                    {/* <Image
                          source={Images.map_image}
                          style={{ height: "100%", width: "100%" }}
                          resizeMode="cover"
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
                </View>
              </>
            );
          })}
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#E41717" />
        </View>
      )}
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
    marginBottom:100,
  },
});
