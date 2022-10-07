import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {Images} from '../Constant/Images';
import ThemeButton from '../Components/ThemeButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Theme} from '../Constant/Theme';
import {Context as AuthContext} from '../Context/AuthContext';

export default props => {
  const {navigation} = props;
  const {state, clearErrorMessage, addcart} = useContext(AuthContext);


  /**
   * @function goHome
   * @description it will jum the user to homepage 
   */

  const goHome = () => {
    addcart(null);
    navigation.navigate('home');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Image source={Images.thankyou} style={{height: 150, width: 150}} />
      <Text
        style={{
          width: widthPercentageToDP(50),
          fontFamily: Theme.font.SemiBold,
          fontSize: 24,
          color: Theme.colors.textColor,
        }}>
        Thankyou your order is placed
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: heightPercentageToDP(1),
          position: 'absolute',
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(10),
          borderTopColor: 'lightgray',
          borderTopWidth: 0.5,
        }}>
        <ThemeButton
          title="Go to home page"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
          titleStyle={{fontFamily: Theme.font.SemiBold, fontSize: 18}}
          containerStyle={{
            width: widthPercentageToDP(92),
          }}
          onPress={() => goHome()}
        />
      </View>
    </View>
  );
};
