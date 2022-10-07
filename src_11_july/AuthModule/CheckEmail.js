import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Theme} from '../Constant/Theme';
import InputBox, {Fumi} from '../Components/InpuBox';
import ThemeButton from '../Components/ThemeButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {Context as AuthContext} from '../Context/AuthContext';

export default props => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);
  console.log('state', state);

  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

   /**
   * @function validation
   * @description it will check if there is email already available in list 
   */

  const validation = () => {
    if (state.token && state.token.email == email) navigation.navigate('Cafe');
    else navigation.navigate('SignUp');
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
        What's your email?
      </Text>
      <Text
        style={{
          fontFamily: Theme.font.Regular,
          fontSize: 16,
          color: Theme.colors.textColor,
          marginBottom: heightPercentageToDP(2),
        }}>
        We will check if you have account
      </Text>

      <View style={{borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5}}>
        <Fumi
          label={'Email'}
          inputStyle={{
            color: Theme.colors.textColor,
            fontFamily: Theme.font.Regular,
            fontSize: 16,
          }}
          labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
          onChangeText={val => setEmail(val)}
          // inputHeight={40}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 10,
          position: 'absolute',
          width: widthPercentageToDP(100),
          left: widthPercentageToDP(-5),
          height: heightPercentageToDP(10),
          borderTopColor: 'lightgray',
          borderTopWidth: 0.5,
        }}>
        <ThemeButton
          title="Continue"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
          }}
          titleStyle={{fontFamily: Theme.font.Medium, fontSize: 14}}
          containerStyle={{
            width: widthPercentageToDP(92),

            // height:heightPercentageToDP(6)
          }}
          onPress={() => validation()}
        />
      </View>
    </View>
  );
};
