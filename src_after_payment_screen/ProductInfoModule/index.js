
import React, { useState, useReducer } from 'react'
import { View, Text, FlatList, Dimensions, Image, TextInput, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '../Components/IconManager'
import { heightPercentageToDP, widthPercentageToDP } from '../Components/responsive-ratio'
import { Images } from '../Constant/Images'
import { Theme } from '../Constant/Theme'
import CheckBox from '../Components/CheckBox'
import ThemeButton from '../Components/ThemeButton'



export default props => {

    const initialState = 0;
    const reducer = (state, action) => {
        switch (action) {
            case "add":
                return state + 1;
            case "subtract":
                return state == 0 ? state : state - 1;
            case "reset":
                return 0;
            default:
                throw new Error("Unexpected action");
        }
    };
    const [count, dispatch] = useReducer(reducer, initialState)

    const [dishes, setDishes] = useState([{
        dishName: 'Large',
        dishDetail: 'Pilvinar quam sceleriscque tellus elit.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 45
    },
    {
        dishName: 'Small',
        dishDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 25


    }, {
        dishName: 'Medium',
        dishDetail: 'Pilvinar quam sceleriscque tellus elit.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 35


    },])
    const [extraIng, setExtra] = useState([{
        dishName: 'Red Sauce',
        dishDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 5
    },
    {
        dishName: 'White Sause',
        dishDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 5


    }, {
        dishName: 'Red Sause',
        dishDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 5


    }, {
        dishName: 'Red Sause',
        dishDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut.',
        dishPrice: 10,
        image: Images.image_4,
        selected: false,
        value: 5


    },])
    const [itemChecked, setItemChecked] = useState(false);
    const [extraChecked, setExtraChecked] = useState(false);


   

  /**
   * @function renderItem
   * @param item
   * @description it will render the UI for Product
   */

    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: widthPercentageToDP(92), paddingVertical: 3, paddingBottom: 5,
                flexDirection: 'row',alignItems:'center'
            }}>
                {Ionicons('ellipse', 12, Theme.colors.brandColor)}

                <Text style={{ fontFamily: Theme.font.Medium, fontSize: 16, color: Theme.colors.textColor,marginLeft:5, }}>{item.dishDetail}</Text>

            </View>
        )
    }

    /**
   * @function renderItemExtra
   * @param item
   * @description it will render the UI for Extra Product info
   */

    const renderItemExtra = ({ item }) => {
        return (
            <View style={{
                width: widthPercentageToDP(92),
                alignItems:'center', paddingVertical: 3, paddingBottom: 5,
                flexDirection: 'row',
            }}>
                {Ionicons('ellipse',12,Theme.colors.brandColor)}
                <Text style={{
                        fontFamily: Theme.font.Medium, fontSize: 16,
                        color: Theme.colors.textColor,marginLeft:5,
                    }}>
                        {item.dishDetail}</Text>

            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flexGrow: 1, marginVertical: heightPercentageToDP(2), alignSelf: 'stretch', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: heightPercentageToDP(1) }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 17, color: Theme.colors.textColor, fontFamily: Theme.font.Bold }}>Pasta</Text>
                        <Text style={{ fontSize: 15, color: 'gray', fontFamily: Theme.font.Medium, marginVertical: heightPercentageToDP(1) }}>
                            Urna et nonss...
                        </Text>
                    </View>
                    {/* {Ionicons('information-circle-outline', 25, 'gray')} */}
                </View>
                <Text style={{
                    fontSize: 17, color: Theme.colors.textColor, fontFamily: Theme.font.SemiBold,
                    marginVertical: heightPercentageToDP(2)
                }}>Allergies</Text>

                <FlatList data={dishes} style={{ flex: 1, }} renderItem={renderItem}
                    extraData={itemChecked}
                />
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    marginVertical: heightPercentageToDP(2)
                }}>
                    <Text style={{ fontSize: 17, color: Theme.colors.textColor, fontFamily: Theme.font.SemiBold }}>Warnings</Text>
                </View>

                <FlatList data={extraIng} style={{ flex: 1 }} renderItem={renderItemExtra}
                    extraData={extraChecked}

                // ItemSeparatorComponent={ItemSeparatorComponent}
                />
                
            </ScrollView>
           
        </View>
    )
}
