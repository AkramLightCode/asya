import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import {
  Image,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../Components/responsive-ratio";
import Home from "../HomeModule";
import SignIn from "../AuthModule/SignInModule/SignIn";
import CafeModuleJs from "../CafeModule.js";
import SingleDish from "../SingleDish";
import MoreInfoModule from "../MoreInfoModule";
import EmptyFile from "../Cart/EmptyCartFile";
import OrderModule from "../Orders/OrderModule";
import ReviewOrder from "../Review/ReviewOrder";
import Favorite from "../Favorite";
import { Ionicons } from "../Components/IconManager";
import Ico from "react-native-vector-icons/Ionicons";
import { Theme } from "../Constant/Theme";
import { Images } from "../Constant/Images";
import ProductInfoModule from "../ProductInfoModule";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { navigationRef } from "../../RootNavigation";

// Import Custom Sidebar
import CustomSidebarMenu from "../Drawer/CustomSidebarMenu";
import SignUp from "../AuthModule/SignInModule/SignUp";
import OrderDetail from "../Orders/OrderDetail";
import Profile from "../ProfileModule/Profile";
import EditProfile from "../ProfileModule/EditProfile";
import MyAddres from "../Addresses/MyAddres";
import AddNewAddress from "../Addresses/AddNewAddress";
import AddNewAddress2 from "../Addresses/AddNewAddress1";
import AddNewAddress3 from "../Addresses/AddNewAddress2";
import AddReview from "../Review/AddReview";
import CartData from "../Cart/CartData";
import CheckEmail from "../AuthModule/CheckEmail";
import Checkout from "../Checkout/Checkout";
import PaymentMethod from "../Checkout/PaymentMethod";
import BillDesk from "../Checkout/BillDesk";
import Thankyou from "../Checkout/Thankyou";
import Filter from "../Filter";
import AddNewCard from "../Payment/AddNewCard";
import PaymentGateway from "../Payment/PaymentGateway";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
let restaurantdata;
function HomeModule({ navigation, route }) {
  const [cartLength, setCartLength] = useState(0);
  const [favLength, setFavLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchcart = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem("sign"));
      const response = await fetch(
        `http://13.233.230.232:8086/api/cart/${id.id}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();

      setCartLength(res.data.length);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
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

      setFavLength(res.length);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchcart();
      getFavmenu();
    }, [])
  );
  return (
    <>
      {isLoading ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: hp(12),
              paddingTop: hp(3),
              marginBottom: 1,
              paddingHorizontal: wp(4),
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              elevation: Platform.OS == "ios" ? 10 : 1,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <View style={{ alignItems: "flex-start", width: wp(65) }}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                {Ionicons("menu", hp(3.5), Theme.colors.brandColor)}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Paymentgateway")}
              style={{ marginTop: 3 }}
            >
              {Ionicons("heart-outline", hp(3.2), Theme.colors.brandColor)}
              <Badge
                value={favLength}
                status="error"
                containerStyle={{ position: "absolute", top: -10, right: -10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CartData")}>
              <Image
                source={Images.ShoppingBag}
                style={{ height: hp(3), width: hp(3) }}
                tintColor={Theme.colors.brandColor}
              />
              <Badge
                value={cartLength}
                status="error"
                containerStyle={{ position: "absolute", top: -10, right: -10 }}
              />
            </TouchableOpacity>

            {/* </View> */}
          </View>
          <View
            style={{
              paddingHorizontal: "4%",
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <Home navigation={navigation} route={route} />
          </View>
        </View>
      )}
    </>
  );
}

function CafeModule({ navigation, route }) {
  const [restro, setrestro] = useState([]);
  useEffect(() => {
    demo();
  }, []);
  const demo = async () => {
    const response = await fetch(
      `http://13.233.230.232:8086/api/restaurants/1`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
  setrestro(json)
    restaurantdata=json;
    console.log("console from navigation", json);
    console.log("restaurantdata", restaurantdata);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: hp(20),
          width: wp(100),
          borderBottomLeftRadius: hp(5),
          borderBottomRightRadius: hp(5),
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={{
            height: hp(20),
            width: wp(100),
            borderBottomLeftRadius: hp(10),
            borderBottomRightRadius: hp(10),
          }}
          source={{
            uri:`http://asyaindiankitchen.com/uploads/restaurant/thumbnail/${restro?.thumbnail}`,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: "#fff",
                marginTop: hp(6),
                marginLeft: wp(4),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Ionicons("arrow-back", hp(3.2), Theme.colors.brandColor)}
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <CafeModuleJs navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function MoreInfoModuleFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            height: hp(20),
            width: wp(100),
            borderBottomLeftRadius: hp(5),
            borderBottomRightRadius: hp(5),
            overflow: "hidden",
          }}
        >
          <ImageBackground
            style={{
              height: hp(20),
              width: wp(100),
              borderBottomLeftRadius: hp(10),
              borderBottomRightRadius: hp(10),
            }}
            source={Images.rest}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 25,
                  backgroundColor: "#fff",
                  marginTop: hp(6),
                  marginLeft: wp(4),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Ionicons("arrow-back", hp(3.2), Theme.colors.brandColor)}
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
        >
          <MoreInfoModule navigation={navigation} route={route} />
        </View>
      </ScrollView>
    </View>
  );
}

function SingleDishModule({ navigation, route }) {
  console.log('first',restaurantdata)
 
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: hp(20),
          width: wp(100),
          borderBottomLeftRadius: hp(5),
          borderBottomRightRadius: hp(5),
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={{
            height: hp(20),
            width: wp(100),
            borderBottomLeftRadius: hp(10),
            borderBottomRightRadius: hp(10),
          }}
          source={{
            uri:`http://asyaindiankitchen.com/uploads/restaurant/thumbnail/${restaurantdata?.thumbnail}`,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: "#fff",
                marginTop: hp(6),
                marginLeft: wp(4),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Ionicons("arrow-back", hp(3.2), Theme.colors.brandColor)}
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <SingleDish navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function ProductInfoModuleFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Product Information" navigation={navigation} />
      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <ProductInfoModule />
      </View>
    </View>
  );
}

function Header(props) {
  return (
    <View
      style={
        props.style
          ? props.style
          : {
              flexDirection: "row",
              paddingHorizontal: wp(4),
              elevation: Platform.OS == "ios" ? 10 : 1,
              paddingTop: hp(3),
              height: hp(12),
              alignItems: "center",
              // justifyContent: 'space-between',
              backgroundColor: "#fff",
              marginBottom: 1,
            }
      }
    >
      <Ico
        name={props.close ? "close-outline" : "arrow-back"}
        size={hp(3.2)}
        color={Theme.colors.brandColor}
        style={{ width: wp(10) }}
        onPress={() => props.navigation.goBack()}
      />
      <Text
        style={{
          // width: wp(72),
          // textAlign: 'center',
          marginTop: Platform.OS == "ios" ? 4 : 0,
          color: Theme.colors.textColor,
          fontSize: props.title.length > 15 ? hp(2.3) : hp(2.5),
          fontFamily: Theme.font.SemiBold,
        }}
      >
        {props.title}
      </Text>
      {/* <View style={{width: wp(10)}} /> */}
    </View>
  );
}

function FavroiteFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Favourites" close navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <Favorite navigation={navigation} />
      </View>
    </View>
  );
}

function EmptyCartFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Cart" close navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <EmptyFile navigation={navigation} />
      </View>
    </View>
  );
}

function CartDataFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Cart" navigation={navigation} route={route} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <CartData navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function CheckoutFunction({ navigation, route }) { 
  return (
    <View style={{ flex: 1 }}>
      <Header title="Checkout" navigation={navigation} route={route} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <Checkout navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function OrderFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Orders"
        close
        navigation={navigation}
        style={{
          flexDirection: "row",
          paddingHorizontal: wp(4),
          elevation: Platform.OS == "ios" ? 10 : 1,
          paddingTop: hp(3),
          height: hp(12),
          alignItems: "center",
          // justifyContent: 'space-between',
          backgroundColor: "#fff",
          // marginBottom: 1,
        }}
      />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <OrderModule navigation={navigation} />
      </View>
    </View>
  );
}

function ReviewOrderFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Reviews"
        close
        navigation={navigation}
        style={{
          flexDirection: "row",
          paddingHorizontal: wp(4),
          elevation: Platform.OS == "ios" ? 10 : 1,
          paddingTop: hp(3),
          height: hp(12),
          alignItems: "center",
          // justifyContent: 'space-between',
          backgroundColor: "#fff",
          // marginBottom: 1,
        }}
      />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <ReviewOrder navigation={navigation} />
      </View>
    </View>
  );
}

function AddReviewFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Add review" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <AddReview navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function OrderDetailFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="order detailed information" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <OrderDetail navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function ProfileFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="order detailed information"
        close
        navigation={navigation}
      />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <Profile navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function AddressesFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Addresses" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <MyAddres navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function NewAddressesFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Addresses" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <AddNewAddress navigation={navigation} route={route} />
      </View>
    </View>
  );
}

//

function NewAddressesFunction2({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Addresses" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <AddNewAddress2 navigation={navigation} route={route} />
      </View>
    </View>
  );
}
//

function NewAddressesFunction3({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Addresses" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <AddNewAddress3 navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function EditProfileFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title={route.params.title} navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <EditProfile navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function FilterFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Filter"
        close
        navigation={navigation}
        style={{
          flexDirection: "row",
          paddingHorizontal: wp(4),
          elevation: Platform.OS == "ios" ? 10 : 1,
          paddingTop: hp(3),
          height: hp(12),
          alignItems: "center",
          // justifyContent: 'space-between',
          backgroundColor: "#fff",
          // marginBottom: 1,
        }}
      />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <Filter navigation={navigation} route={route} />
      </View>
    </View>
  );
}

function SignInFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <SignIn navigation={navigation} />
      </View>
    </View>
  );
}

function CheckEmailFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <CheckEmail navigation={navigation} />
      </View>
    </View>
  );
}

function SignUpFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <SignUp navigation={navigation} />
      </View>
    </View>
  );
}

function PaymentmethodFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Select payment method" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <PaymentMethod navigation={navigation} />
      </View>
    </View>
  );
}

function PaymentGatewayFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Select Payment Method" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <PaymentGateway navigation={navigation} />
      </View>
    </View>
  );
}

function BillDeskFunction({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="BillDesk Payment" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <BillDesk navigation={navigation} />
      </View>
    </View>
  );
}

function AddNewCardFunction({navigation,route}) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Add New Card" navigation={navigation} />

      <View
        style={{ paddingHorizontal: "4%", flex: 1, backgroundColor: "#fff" }}
      >
        <AddNewCard navigation={navigation} />
      </View>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeModule} />

      <Stack.Screen name="Cafe" component={CafeModule} />
      <Stack.Screen name="SingleDish" component={SingleDishModule} />
      <Stack.Screen name="ProductInfo" component={ProductInfoModuleFunction} />
      <Stack.Screen name="MoreInfo" component={MoreInfoModuleFunction} />
      <Stack.Screen name="Favorite" component={FavroiteFunction} />
      <Stack.Screen name="EmptyCart" component={EmptyCartFunction} />
      <Stack.Screen name="CartData" component={CartDataFunction} />

      <Stack.Screen name="SignIn" component={SignInFunction} />
      <Stack.Screen name="SignUp" component={SignUpFunction} />
      <Stack.Screen name="CheckEmail" component={CheckEmailFunction} />

      <Stack.Screen name="Order" component={OrderFunction} />
      <Stack.Screen name="OrderDetail" component={OrderDetailFunction} />
      <Stack.Screen name="Profile" component={ProfileFunction} />
      <Stack.Screen name="EditProfile" component={EditProfileFunction} />
      <Stack.Screen name="MyAdd" component={AddressesFunction} />

      <Stack.Screen name="NewAdd" component={NewAddressesFunction} />
      <Stack.Screen name="NewAdd2" component={NewAddressesFunction2} />
      <Stack.Screen name="NewAdd3" component={NewAddressesFunction3} />
      <Stack.Screen name="Review" component={ReviewOrderFunction} />
      <Stack.Screen name="AddReview" component={AddReviewFunction} />

      <Stack.Screen name="Checkout" component={CheckoutFunction} />
      <Stack.Screen name="BillDesk" component={BillDeskFunction} />
      <Stack.Screen name="Thankyou" component={Thankyou} />
      <Stack.Screen name="Filter" component={FilterFunction} />
      <Stack.Screen name="addnewcard" component={AddNewCardFunction} />
      <Stack.Screen name="PaymentMethod" component={PaymentmethodFunction} />
      <Stack.Screen name="Paymentgateway" component={PaymentGatewayFunction} />


    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent={true}
      />
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{ drawerLabel: "First page Option" }}
          component={HomeStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
