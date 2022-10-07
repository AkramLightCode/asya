import React, {useContext,useState,useEffect,useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, Text,ActivityIndicator} from 'react-native';
import {heightPercentageToDP} from '../Components/responsive-ratio';
import {MaterialIcons} from '../Components/IconManager';
import {Theme} from '../Constant/Theme';
import ProfileFieldComponent from '../Components/ProfileFieldComponent';
import {Context as AuthContext} from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default props => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext);
  const [fisrt,setFirst]=useState('');
  const [last,setLast]=useState('');
  const [email,setEmail]=useState('');
  const [isLoading,setIsLoading] = useState(true);


  const {navigation, route} = props;

  // const name =
  //   state && state.token && state.token.firstname + ' ' + state.token.lastname;
  // const email = state && state.token && state.token.email;

  const fetchProfile =async () => {
    try {
      
    const id = JSON.parse(await AsyncStorage.getItem('sign'));
       

    const response = await fetch(`http://13.233.230.232:8086/api/login/${id.id}`);
    const res = await response.json();

  setEmail(res.email);
  setFirst(res.first);
  setLast(res.last);
  setIsLoading(false);
  
}catch(error){
  console.log(error)
}
        };


        useFocusEffect(
          useCallback(()=>{
            fetchProfile();
          },[])
        );
        

  return (
    <>
    {isLoading?(<View style={{justifyContent:'center',flex:1}}><ActivityIndicator size="large"/></View>):
    <View style={{flex: 1}}>
      <ProfileFieldComponent
        label="Name"
        value={fisrt+" "+last}
        onPress={() => navigation.navigate('EditProfile', {title: 'Name',first:fisrt,last:last})}
      />
      <ProfileFieldComponent
        label="Email"
        value={email}
        onPress={() => navigation.navigate('EditProfile', {title: 'Email',email})}
      />
      <ProfileFieldComponent
        label="Password"
        value={'********'}
        onPress={() => navigation.navigate('EditProfile', {title: 'Password'})}
      />
    </View>
  }
    </>
  );
};
