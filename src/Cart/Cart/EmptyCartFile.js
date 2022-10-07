import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Images} from '../Constant/Images';
import {Theme} from '../Constant/Theme';
import ThemeButton from '../Components/ThemeButton';
import {NavigationContainer} from '@react-navigation/native';

// D43548

export default props => {
  const {navigation} = props;
  console.log('navigation', navigation);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: heightPercentageToDP(15),
      }}>
      <View
        style={{
          height: heightPercentageToDP(25),
          width: heightPercentageToDP(25),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: heightPercentageToDP(2),
        }}>
        <Image
          source={Images.noImage}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <Text
        style={{
          fontFamily: Theme.font.Medium,
          fontSize: 14,
          color: Theme.colors.textColor,
        }}>
        No item found
      </Text>
      <ThemeButton
        onPress={() => navigation.navigate('home')}
        title="Explore food here"
        buttonStyle={{
          height: heightPercentageToDP(6),
          backgroundColor: '#D43548',
          borderRadius: 10,
          marginTop: heightPercentageToDP(2),
        }}
        titleStyle={{fontFamily: Theme.font.Medium, fontSize: 14}}
        containerStyle={{
          width: widthPercentageToDP(84),
          // height:heightPercentageToDP(6)
        }}
      />
    </View>
  );
};
