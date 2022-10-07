import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons'
import { Theme } from '../../Constant/Theme';

export default props => {
  return <View style={styles.view}>
    <SearchBar
      lightTheme
      autoCapitalize='none'
      onChangeText={props.onChangeText}
      value={props.value}
      containerStyle={{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 15
      }}
      // onSubmitEditing={() => Actions.search_result({ "search_query": this.state.search_query })}
      searchIcon={{ type: 'font-awesome', name: 'search', size: 20, color: Theme.colors.brandColor }}
      inputContainerStyle={{ backgroundColor: "#fff", }}
      placeholderTextColor={'lightgray'}
      placeholder='Search food or restaurant ...' />
  </View>
}

const styles = StyleSheet.create({
  view: {
    // margin:10
    // backgroundColor:'#fff',
    // padding:5
  }
})