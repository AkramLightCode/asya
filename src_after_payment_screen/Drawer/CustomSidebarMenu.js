import React, {useContext,useEffect,useState,useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Images} from '../Constant/Images';
import {Theme} from '../Constant/Theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {NavigationContainer} from '@react-navigation/native';
import {Context as AuthContext} from '../Context/AuthContext';
const Data = [
  {
    label: 'Favourites',
    Title: 'Favorite',
    Icon: Images.like,
  },
  {
    label: 'orders',
    Title: 'Order',
    Icon: Images.orders,
  },
  {
    label: 'Profile',
    Title: 'Profile',
    Icon: Images.profile,
  },
  {
    label: 'Addresses',
    Title: 'MyAdd',
    Icon: Images.map_marker,
  },
  {
    label: 'Reviews',
    Title: 'Review',
    Icon: Images.map_marker,
  },
];

const CustomSidebarMenu = props => {



  const {state, signout, clearErrorMessage} = useContext(AuthContext);
const [authvalue, setauthvalue] = useState();
  /**
   * @function NavigationButton
   * @param props
   * @description it will create the menu in drawer
   */
   
useEffect(() => {
  const authData=async()=>{
    setauthvalue(JSON.parse(await AsyncStorage.getItem('sign')))
    
  }
  
  authData();
  
 
}, [props])


// useFocusEffect(
//   useCallback(()=>{
//  const authData=async()=>{
//     setauthvalue(JSON.parse(await AsyncStorage.getItem('sign')))
//   }
  
//   authData();
//   },[])
// );


  const NavigationButton = props => {
    // console.log('props',props)
    return (
      <TouchableOpacity
        style={{marginVertical: heightPercentageToDP(1)}}
        onPress={() => props.props.navigation.navigate(props.label)}>
        <View
          style={{
            flexDirection: 'row',
            // paddingTop: '4%',
            marginTop: 10,
            marginLeft: 20,
            alignItems: 'center',
          }}>
          {props.children}
          <Text
            style={{
              fontFamily: Theme.font.Medium,
              fontSize: 18,
              color: Theme.colors.textColor,
              marginLeft: widthPercentageToDP(5),
            }}>
            {props.Title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: heightPercentageToDP(3),
          paddingRight: 10,
          backgroundColor: Theme.colors.brandColor,
          height: heightPercentageToDP(23),
        }}>
        <Image
          source={Images.drawer}
          style={styles.sideMenuProfileIcon}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: 20,
            fontFamily: Theme.font.Medium,
            fontSize: 15,
            color: '#fff',
          }}>
          {(authvalue?.id  &&
            authvalue?.first+" "+authvalue?.last) ||
            'Asya'}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {authvalue?.email &&
           
            Data.map((item,index )=> (
              <NavigationButton
                props={props}
                label={item.Title}
                Title={item.label}
                key={index}
                >
                <Image
                  source={item.Icon}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
              </NavigationButton>
            ))}
        </ScrollView>
        {authvalue?.email ? (
          <View style={styles.customItemLogout}>
            <TouchableOpacity  onPress={() => {signout();
              setauthvalue(" ")}}>
            <Text
             
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 16,
                color: Theme.colors.textColor,
              }}>
              Logout
            </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.customItem}>
            <Text
              onPress={() => props.navigation.navigate('SignIn')}
              style={{
                fontFamily: Theme.font.Medium,
                fontSize: 16,
                color: Theme.colors.textColor,
              }}>
              Login / SignUp
            </Text>
          </View>
        )}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: heightPercentageToDP(16),
    height: heightPercentageToDP(15),
    borderRadius: 100 / 2,

    alignSelf: 'flex-end',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customItemLogout: {
    paddingHorizontal: 20,
    marginTop: heightPercentageToDP(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
