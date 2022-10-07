import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Theme} from '../Constant/Theme';
import InputBox, {Fumi} from '../Components/InpuBox';
import ThemeButton from '../Components/ThemeButton';
import {Context as AuthContext} from '../Context/AuthContext';
import {navigationRef} from '../../RootNavigation';

export default props => {
  const {navigation,route} = props;
  const {Carttotal} = route.params;
  console.log('Carttotal',Carttotal)
  const {state, signup, clearErrorMessage, setpaymentmethod} =
    useContext(AuthContext);

  const [fName, setFname] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [monthyear, setMonthyear] = useState('');

  /**
   * @function total
   * @description it will return total amount of the dishes for bill
   */

   const sumTotal = (cartdata) =>
   cartdata.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  /**
   * @function validation
   * @description it will return if payment method is card or checkout 
   */

  const validation = () => {
    if (fName.length < 0) alert('add proper fullname');
    else if (cardnumber.length < 16)
      alert('add proper card number of 16 digit');
    else if (monthyear.length <= 3) alert('add month and year i.e 02/22');
    else if (cvv.length > 3) alert('add cvv');
    else {
      setpaymentmethod('Card payment');
      navigation.navigate('Checkout');
    }
  };

  return (
    <View style={{flex: 1, paddingTop: heightPercentageToDP(8)}}>
      <Text
        style={{
          fontFamily: Theme.font.SemiBold,
          fontSize: 20,
          color: Theme.colors.textColor,
          marginBottom: heightPercentageToDP(2),
        }}>
        Enter Card Details
      </Text>

      <View style={{borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5}}>
        <Fumi
          label={'Full Name'}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
          onChangeText={val => setFname(val)}
          // inputHeight={40}
        />
      </View>

      <View
        style={{
          borderWidth: 0.7,
          borderRadius: 10,
          paddingHorizontal: 5,
          marginTop: heightPercentageToDP(2),
        }}>
        <Fumi
          label={'card number'}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
          // secureTextEntry
          onChangeText={val => setCardnumber(val)}
          // inputHeight={40}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: heightPercentageToDP(2),
        }}>
        <View
          style={{borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5}}>
          <Fumi
            label={'Month/Year'}
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
              width: widthPercentageToDP(40),
            }}
            labelStyle={{
              color: 'gray',
              fontFamily: Theme.font.Regular,
              alignItems: 'center',
            }}
            onChangeText={val => setMonthyear(val)}
            // inputHeight={40}
          />
        </View>
        <View
          style={{borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5}}>
          <Fumi
            label={'CVV'}
            inputStyle={{
              color: Theme.colors.textColor,
              fontFamily: Theme.font.Regular,
              fontSize: 16,
              width: widthPercentageToDP(40),
            }}
            labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
            onChangeText={val => setCvv(val)}
            // inputHeight={40}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          bottom: heightPercentageToDP(1),
          position: 'absolute',
          width: widthPercentageToDP(100),
          left: widthPercentageToDP(-5),
          height: heightPercentageToDP(15),
          borderTopColor: 'lightgray',
          borderTopWidth: 0.5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: widthPercentageToDP(90),
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Total:
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
             {sumTotal(Carttotal)+5}$
          </Text>
        </View>
        <ThemeButton
          title="Place order"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
          titleStyle={{fontFamily: Theme.font.Medium, fontSize: 18}}
          containerStyle={{
            width: widthPercentageToDP(92),
          }}
          onPress={() => validation()}
        />
      </View>
    </View>
  );
};
