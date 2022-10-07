import React,{useEffect} from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
  } from 'react-native';


  import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from "../Components/responsive-ratio";
import { Theme } from "../Constant/Theme";
import ThemeButton from "../Components/ThemeButton";


const AddNewCard = ({navigation}) => {

    return (
        <>
            <View>
          
<View style={{marginLeft:15,marginRight:15,marginTop:25}}>
  <View style={{display:'flex',flexDirection:'row'}}>
      <Text style={{color:'#818A93'}}>Card Number</Text>
      <Image
          source={require('../../assets/images/credit-card.png')}
          style={{marginLeft:215}}
        />
      </View>
    <TextInput
          placeholder="xxxx-xxxx-xxxx-xxxx"
          label="Card"
          type='outlined'
          maxLength={16}
          // placeholderTextColor="#969696"
          keyboardType='numeric'
          style={styles.input}
          // onFocus={getNumber}
        //   onChangeText={(text)=>value(text,'mobile')}
        />
</View>


<View style={{marginLeft:15,marginRight:15,marginTop:25}}>
  
      <Text style={{color:'#818A93'}}>Name on the Card</Text>
     
      
    <TextInput
          placeholder="enter your name"
          label="Card"
          type='outlined'
          // placeholderTextColor="#969696"
          style={styles.input}
          // onFocus={getNumber}
        //   onChangeText={(text)=>value(text,'mobile')}
        />
</View>



<View style={{display:'flex',flexDirection:'row'}}>
<View style={{marginLeft:15,marginRight:15,marginTop:25,flex:1}}>
  
  <Text style={{color:'#818A93'}}>Expiry</Text>
 
  
<TextInput
      placeholder="DD/YY"
      label="Card"
      keyboardType='numeric'
      type='outlined'
      // placeholderTextColor="#969696"
      style={styles.input}
      // onFocus={getNumber}
    //   onChangeText={(text)=>value(text,'mobile')}
    />
</View>
<View style={{marginLeft:15,marginRight:15,marginTop:25,flex:1}}>
  
      <Text style={{color:'#818A93'}}>CVV</Text>
     
      
    <TextInput
          placeholder="***"
          label="Card"
          keyboardType='numeric'
          type='outlined'
          // placeholderTextColor="#969696"
          style={styles.input}
          // onFocus={getNumber}
        //   onChangeText={(text)=>value(text,'mobile')}
        />
</View>
</View>

<ThemeButton
title="Pay"
buttonStyle={{
  height: heightPercentageToDP(6),
  backgroundColor: Theme.colors.brandColor,
  borderRadius: 10,
  marginTop:100
}}
titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 , }}
containerStyle={{
  width: widthPercentageToDP(92),
}}

/>

            </View>
            
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      textAlign:'center',
      color:'green',
      marginTop:250,
      fontSize:25,
      fontWeight:'bold'
      
    },plus:{
      fontSize:16,
      marginTop:13,
      marginLeft:100,
      color:'#14AE5B',
      borderBottomColor:'#14AE5B',
    borderBottomWidth:1,
      
    },
    input:{
      
      borderBottomWidth:1,
      borderBottomColor:'#818A93'
    },
    button: {
      alignItems: 'center',
      marginTop: 200,
      width:'50%',
      alignSelf: 'center',
      
      
  },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      color:'#14AE5B',

      
  },
  textSign: {
      fontSize: 18,
      fontWeight: "500",
      color:'#14AE5B',

      
  },
  });

export default AddNewCard
