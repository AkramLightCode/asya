import 'react-native-gesture-handler';
import React from 'react'
import { View } from 'react-native'
import Route from './src/NavigationModule' ;
import { Provider as AuthProvider } from './src/Context/AuthContext';

export default function App() { 

  return (
    <AuthProvider>
    <View style={{flex:1,backgroundColor:'#fff' }}>
      <Route />
    </View>
    </AuthProvider>

  )
}