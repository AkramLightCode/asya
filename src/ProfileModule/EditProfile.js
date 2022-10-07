import React, {useState, useContext,useEffect} from 'react';
import {View, Text, TouchableOpacity,ToastAndroid} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Theme} from '../Constant/Theme';
import InputBox, {Fumi} from '../Components/InpuBox';
import ThemeButton from '../Components/ThemeButton';
import {Context as AuthContext} from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default props => {
  const {state, signup,signin, update, clearErrorMessage} = useContext(AuthContext);

  console.log('state', state.token);

  const {navigation, route} = props;
  const {params} = route;
  const {title} = params;

  const [email, setEmail] = useState(state && state.token && state.token.email);
  const [pass, setPass] = useState(
    state && state.token && state.token.password,
  );
  const [newpass, setNewPass] = useState('');

  const [first_name, setFirstName] = useState(
    state && state.token && state.token.firstname,
  );
  const [last_name, setLastName] = useState(
    state && state.token && state.token.lastname,
  );

  useEffect(() => {

    if(title == 'Name')
    {
      setFirstName(route.params.first)
      setLastName(route.params.last)
    }else if(title == 'Email')
    {
      setEmail(route.params.email)
    
    }
  }, [])
  

  /**
   * @function updateprofile
   * @description it will get update profile
   */

  const updateprofile = async() => {
    const id = JSON.parse(await AsyncStorage.getItem('sign'));
    console.log("heredata"+id.id);
    try {
     
      if(title == 'Email')
      {
      if (email ==="") {
         ToastAndroid.show(
           'email is empty!',
           ToastAndroid.BOTTOM,
         );
       } 
       else{

    const response = await fetch(`http://13.233.230.232:8086/api/users/updateemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:id.id,email:email}),
    });
    const res = await response.json();
    
    
   
    if(res.status){
      ToastAndroid.show(
        "Email Update Successfully",
        ToastAndroid.BOTTOM,
      );
      await AsyncStorage.removeItem("sign");
      signin(res)
    }else{
      ToastAndroid.show(
        res.message,
        ToastAndroid.BOTTOM,
      )
    }
   
  
  
  }
}else  if(title == 'Name')
{
if (first_name ==="") {
   ToastAndroid.show(
     'First Name is empty!',
     ToastAndroid.BOTTOM,
   );
 } 
 else{

const response = await fetch(`http://13.233.230.232:8086/api/users/updatename`, {
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify({ id:id.id,first:first_name,last:last_name}),
});
const res = await response.json();
ToastAndroid.show(
  "Name Update Successfully",
  ToastAndroid.BOTTOM,
  );

  await AsyncStorage.removeItem("sign");
  signin(res)


}
}
}catch(error){
  ToastAndroid.show(
    "Something Went Wrong"+error,
    ToastAndroid.BOTTOM,
    );
}

    update(email, first_name, last_name, newpass ? newpass : pass);
  };

  return (
    <View style={{flex: 1, paddingTop: heightPercentageToDP(4)}}>
      {/* <Text style={{ fontFamily: Theme.font.SemiBold, fontSize: 20, color: Theme.colors.textColor,
                 marginBottom: heightPercentageToDP(2) }}>Let's create your account</Text> */}

      {title == 'Email' && (
        <View
          style={{borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5}}>
          <Fumi
            label={'Email'}
            value={email}
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
      )}

      {title == 'Name' && (
        <>
          <View style={{borderWidth: 0.7, borderRadius: 10}}>
            <Fumi
              label={'First name'}
              value={first_name}
              inputStyle={{
                color: Theme.colors.textColor,
                fontFamily: Theme.font.Regular,
                fontSize: 16,
                width: widthPercentageToDP(90),
              }}
              labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
              onChangeText={val => setFirstName(val)}
              // inputHeight={40}
            />
          </View>
          <View
            style={{
              borderWidth: 0.7,
              borderRadius: 10,
              marginTop: heightPercentageToDP(2),
            }}>
            <Fumi
              label={'Last name'}
              value={last_name}
              inputStyle={{
                color: Theme.colors.textColor,
                fontFamily: Theme.font.Regular,
                fontSize: 16,
                width: widthPercentageToDP(90),
              }}
              labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
              onChangeText={val => setLastName(val)}
              // inputHeight={40}
            />
          </View>
        </>
      )}
      {title == 'Password' && (
        <>
          <View
            style={{
              borderWidth: 0.7,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginTop: heightPercentageToDP(2),
            }}>
            <Fumi
              label={'Current Password'}
              value={pass}
              inputStyle={{
                color: Theme.colors.textColor,
                fontFamily: Theme.font.Regular,
                fontSize: 16,
              }}
              labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
              secureTextEntry
              onChangeText={val => setPass(val)}
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
              label={'New Password'}
              value={newpass}
              inputStyle={{
                color: Theme.colors.textColor,
                fontFamily: Theme.font.Regular,
                fontSize: 16,
              }}
              labelStyle={{color: 'gray', fontFamily: Theme.font.Regular}}
              secureTextEntry
              onChangeText={val => setNewPass(val)}
              // inputHeight={40}
            />
          </View>
        </>
      )}

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
          }}
          onPress={() => updateprofile()}
        />
      </View>
    </View>
  );
};
