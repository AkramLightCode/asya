
import React, { useState,useEffect } from 'react'
import { View, Text, FlatList,ActivityIndicator, Dimensions,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '../Components/IconManager'
import EmptyCartFile from '../Cart/EmptyCartFile'
import { heightPercentageToDP, widthPercentageToDP } from '../Components/responsive-ratio'
import { Images } from '../Constant/Images'
import { Theme } from '../Constant/Theme'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default props => {
    const {navigation} = props
    const [selectedCold,setSelectCold] = useState(false)
    const [selectedpasta,setSelectpasta] = useState(true)
    const [favData,setfavData]=useState([]);
    const [isLoading,setIsLoading] = useState(true);


    const getFavmenu = async () => {
        try {

            const id = JSON.parse(await AsyncStorage.getItem("sign"));
            const response = await fetch(
                `http://13.233.230.232:8086/api/favourites/${id.id}`,
                {
                  method: "GET",
                }
              );
              const res = await response.json();
              
              setfavData(res);
            setIsLoading(false);
        
        } catch (error) {
            console.log(error)
         setIsLoading(false);

        }
        
      };
    
      useEffect(() => {
        getFavmenu();
      }, [])
      

/**
   * @function renderItem
   * @param item
   * @description it will render the UI for favorite dishes
   */

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SingleDish',{dishesItem:item.menu})}>
            <View style={{
                width: widthPercentageToDP(92),
                justifyContent: 'space-between',paddingVertical:3,borderBottomWidth:.5,borderBottomColor:'lightgray',paddingBottom:5,
                flexDirection:'row',
            }}><View style={{flexDirection:'column',width:widthPercentageToDP(65),}}>
                <Text style={{ color: Theme.colors.darkColor, justifyContent: 'center', fontFamily: Theme.font.Bold, fontSize: 14,marginVertical:5 }}>
                    {item.menu.name}
                </Text>
                <Text style={{ color: Theme.colors.darkColor, justifyContent: 'center', fontFamily: Theme.font.Regular, 
                fontSize: 15, }}>
                    {item.menu.details}
                </Text>
                <View style={{flexDirection:'row',marginTop:heightPercentageToDP(1), justifyContent:'space-between',alignItems:'center'}}>
                    <Text>{JSON.parse(item.menu.price).menu}$</Text>
                    {Ionicons('information-circle-outline',heightPercentageToDP(2),Theme.colors.textColor)}
                </View>
            </View>
                
                <Image  source={{
                    uri: `http://sample.adeeinfotech.com/diginn/uploads/menu/${item.menu.thumbnail}`,
                  }} style={{ height: heightPercentageToDP(11), width: widthPercentageToDP(92) /3  }} resizeMode='contain' />
            </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
        { isLoading?(<View style={{justifyContent:'center',flex:1}}><ActivityIndicator size="large"/></View>):favData.length!==0?
        <View style={{flex:1,paddingTop:heightPercentageToDP(2)}}>
            
            <FlatList data={favData} renderItem={renderItem} 
            />
        </View>:
       <EmptyCartFile />
        }
        </>
    )
}