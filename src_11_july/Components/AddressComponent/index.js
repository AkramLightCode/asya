import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../Components/responsive-ratio";
import { MaterialIcons } from "../../Components/IconManager";
import { Theme } from "../../Constant/Theme";
import { Images } from "../../Constant/Images";

export default (props) => {

  return (
    <View
      style={{
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: "#eeee",
        shadowColor: "#000",
        marginTop: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(3),
        paddingHorizontal: heightPercentageToDP(2),

        padding: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: "space-between",

        elevation: Platform.OS == "ios" ? 10 : 0,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" ,flex:1}}>
          <View style={{ flexDirection: "column",flex:6 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                  //  justifyContent: "space-around",
                paddingTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: Theme.font.Regular,
                  fontSize: 14,
                  color: Theme.colors.textColor,
                  flexWrap: "wrap",
                  
                }}
              >
                Address :
              </Text>
              <Text
                style={{
                  fontFamily: Theme.font.Regular,
                  fontSize: 14,
                  color: Theme.colors.textColor,
                  flexWrap: "wrap",
              
                }}
              >
                {props.House}
              </Text>
            </View>
            {/* <Text
            style={{
              fontFamily: Theme.font.Regular,
              color: Theme.colors.textColor,
              fontSize: 14,
            }}>
           
          </Text> */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                //  justifyContent: "space-around",
                paddingTop: 12,
                flexWrap: "wrap",
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
                Lattitude :
              </Text>
              <Text
                style={{
                  fontFamily: Theme.font.Regular,
                  fontSize: 14,
                  color: Theme.colors.textColor,
                  // marginLeft: 10,
                }}
              >
                {props.Landmark}
              </Text>
            </View>
            {/* <Text
            style={{
              fontFamily: Theme.font.Regular,
              color: Theme.colors.textColor,
              fontSize: 14,
              marginTop: heightPercentageToDP(1),
              width: widthPercentageToDP(60),
            }}>
            {props.Landmark}, {props.City}
          </Text> */}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-around",
                paddingTop: 12,
                flexWrap: "wrap",
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
                Langitude :
              </Text>
              <Text
                style={{
                  fontFamily: Theme.font.Regular,
                  fontSize: 14,
                  color: Theme.colors.textColor,
                  // marginLeft: 10,
                }}
              >
                {props.City}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column",marginLeft:30,flex:1 }}>
            <View style={{ marginRight: 10 ,marginTop:15}}>
              <Image
                source={Images.map_marker}
                style={{ height: 18, width: 18 }}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              onPress={props.onEdit}
              style={{ marginTop:15, marginRight: 10 }}
            >
              <Image
                source={Images.edit}
                style={{ height: 17, width: 17 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onRemove}
              style={{ marginTop:15 }}
            >
              <Image
                source={Images.delete}
                style={{ height: 17, width: 17 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
  );
};
