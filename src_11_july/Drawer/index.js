import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomSidebarMenu from './CustomSidebarMenu';
const Drawer = createDrawerNavigator();

function App() {
    return (
<Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
       
      </Drawer.Navigator>
    )
}

export default App;