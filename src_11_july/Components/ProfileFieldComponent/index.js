import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {heightPercentageToDP} from '../../Components/responsive-ratio';
import {MaterialIcons} from '../../Components/IconManager';
import {Theme} from '../../Constant/Theme';
import {Images} from '../../Constant/Images';

export default props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#eeee',
        shadowColor: '#000',
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
        justifyContent: 'space-between',

        elevation: Platform.OS == 'ios' ? 10 : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: heightPercentageToDP(2),
        }}>
        <Text
          style={{
            fontFamily: Theme.font.Regular,
            color: Theme.colors.textColor,
            fontSize: 14,
          }}>
          {props.label}
        </Text>
        <TouchableOpacity onPress={props.onPress}>
          <Image
            source={Images.edit}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: Theme.font.SemiBold,
          color: Theme.colors.textColor,
          fontSize: 16,
        }}>
        {props.value}
      </Text>
    </View>
  );
};
