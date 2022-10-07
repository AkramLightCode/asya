import React, {useState, useReducer, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '../Components/IconManager';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../Components/responsive-ratio';
import {Images} from '../Constant/Images';
import {Theme} from '../Constant/Theme';
// import CheckBox from '../Components/CheckBox'
import ThemeButton from '../Components/ThemeButton';
import {Context as AuthContext} from '../Context/AuthContext';
import {MaterialIcons} from '../Components/IconManager';

const checkbStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: widthPercentageToDP(92),
};

/**
   * @function CheckBox
   * @description it will create list with checkmark
   */

const CheckBox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 20,
  color = Theme.colors.brandColor,
  text = '',
  ...props
}) => (
  <TouchableOpacity style={[checkbStyle, style]} onPress={onPress} {...props}>
    <Text style={textStyle}> {text} </Text>
    {MaterialIcons(
      selected ? 'check-box' : 'check-box-outline-blank',
      size,
      color,
    )}
  </TouchableOpacity>
);

export default props => {
  const {navigation, route} = props;
  const {state, clearErrorMessage, addcart} = useContext(AuthContext);
  const [PastOrders, setPastOrders] = useState(true);
  const [LiveOrders, setLiveOrders] = useState(false);
  const [priceOrder, setPriceOrder] = useState(false);

  const initialState = 0;
  const reducer = (state, action) => {
    switch (action) {
      case 'add':
        return state + 1;
      case 'subtract':
        return state == 0 ? state : state - 1;
      case 'reset':
        return 0;
      default:
        throw new Error('Unexpected action');
    }
  };
  const [count, dispatch] = useReducer(reducer, initialState);
  

  const [Cuisine, setCuisine] = useState([
    {
      dishName: 'African(1)',
      selected: false,
    },
    {
      dishName: 'Indian(11)',
      selected: false,
    },
    {
      dishName: 'Chinese(31)',
      selected: false,
    },
    {
      dishName: 'Italian(3)',
      selected: false,
    },
    {
      dishName: 'French(13)',
      selected: false,
    },
    {
      dishName: 'Rajasthani(12)',
      selected: false,
    },
    {
      dishName: 'Himaliyan(1)',
      selected: false,
    },
    {
      dishName: 'South Indian(19)',
      selected: false,
    },
  ]);

  const [Attribute, setAttribute] = useState([
    {
      dishName: 'Pasta(1)',
      selected: false,
    },
    {
      dishName: 'Dosa(11)',
      selected: false,
    },
    {
      dishName: 'Burger(31)',
      selected: false,
    },
    {
      dishName: 'Pizza(3)',
      selected: false,
    },
    {
      dishName: 'Sandwich(13)',
      selected: false,
    },
    {
      dishName: 'Pasteries(12)',
      selected: false,
    },
    {
      dishName: 'Coffee(1)',
      selected: false,
    },
    {
      dishName: 'Chicken(19)',
      selected: false,
    },
  ]);

  const [price, setPrice] = useState([
    {
      dishName: 'low to high',
      selected: false,
    },
  ]);

  const [itemChecked, setItemChecked] = useState(false);
  const [extraChecked, setExtraChecked] = useState(false);

  /**
   * @function select
   * @param item
   * @description it will select the dishes 
   */

  const select = item => {
    // console.log('item', item);

    item.selected = !item.selected;

    const updated = Cuisine.map(it => {
      it.selected = false;
      if (it.dishName === item.dishName) {
        it.selected = !it.selected;
      }
      return it;
    });

    setCuisine(updated);
    setItemChecked(prevState => !prevState);

    // setPlan(pl)
  };

  /**
   * @function selectExtra
   * @param item
   * @description it will select extra ingridients
   */

  const selectExtra = item => {
    // console.log('item', item);

    item.selected = !item.selected;

    const updated = Attribute.map(it => {
      it.selected = false;
      if (it.dishName === item.dishName) {
        it.selected = !it.selected;
      }
      return it;
    });

    setAttribute(updated);
    setExtraChecked(prevState => !prevState);

    // setPlan(pl)
  };

  /**
   * @function renderItem
   * @param item
   * @description it will render the UI for dishes
   */

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: widthPercentageToDP(92),
          justifyContent: 'space-between',
          paddingVertical: 3,
          paddingBottom: 5,
          flexDirection: 'row',
        }}>
        <CheckBox
          text={item.dishName}
          onPress={() => select(item)}
          selected={item.selected}
          textStyle={{
            fontFamily: Theme.font.Medium,
            fontSize: 16,
            color: Theme.colors.textColor,
          }}
        />
      </View>
    );
  };

  /**
   * @function renderItemExtra
   * @param item
   * @description it will render the dishes for filter
   */

  const renderItemExtra = ({item}) => {
    return (
      <View
        style={{
          width: widthPercentageToDP(92),
          justifyContent: 'space-between',
          paddingVertical: 3,
          paddingBottom: 5,
          flexDirection: 'row',
        }}>
        <CheckBox
          text={item.dishName}
          onPress={() => selectExtra(item)}
          selected={item.selected}
          textStyle={{
            fontFamily: Theme.font.Medium,
            fontSize: 16,
            color: Theme.colors.textColor,
          }}
        />
      </View>
    );
  };

  /**
   * @function renderPrice
   * @param item
   * @description it will render the price filter
   */

  const renderPrice = ({item}) => {
    return (
      <View
        style={{
          width: widthPercentageToDP(92),
          justifyContent: 'space-between',
          paddingVertical: 3,
          paddingBottom: 5,
          flexDirection: 'row',
        }}>
        <CheckBox
          text={item.dishName}
          onPress={() => selectExtra(item)}
          selected={item.selected}
          textStyle={{
            fontFamily: Theme.font.Medium,
            fontSize: 16,
            color: Theme.colors.textColor,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          width: widthPercentageToDP(60),
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            setLiveOrders(true);
            setPastOrders(false);
            setPriceOrder(false);
          }}
          style={{
            borderBottomWidth: 3,
            paddingBottom: 5,
            borderBottomColor: LiveOrders ? Theme.colors.brandColor : '#fff',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Cuisines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLiveOrders(false);
            setPastOrders(true);
            setPriceOrder(false);
          }}
          style={{
            borderBottomWidth: 3,
            paddingBottom: 5,
            borderBottomColor: PastOrders ? Theme.colors.brandColor : '#fff',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Attributes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLiveOrders(false);
            setPastOrders(false);
            setPriceOrder(true);
          }}
          style={{
            borderBottomWidth: 3,
            paddingBottom: 5,
            borderBottomColor: priceOrder ? Theme.colors.brandColor : '#fff',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Price
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          marginTop: 0.5,
          width: widthPercentageToDP(100),
          backgroundColor: '#eee',
          left: widthPercentageToDP(-4),
        }}
      />

      <ScrollView
        style={{
          flexGrow: 1,
          marginVertical: heightPercentageToDP(3),
          alignSelf: 'stretch',
        }}>
        <Text
          style={{
            fontSize: 24,
            color: Theme.colors.textColor,
            fontFamily: Theme.font.SemiBold,
            marginVertical: heightPercentageToDP(2),
          }}>
          Cuisines
        </Text>

        <FlatList
          data={Cuisine}
          style={{flex: 1}}
          renderItem={renderItem}
          extraData={itemChecked}
        />
        <View
          style={{
            height: 1,
            marginVertical: heightPercentageToDP(1),
            width: widthPercentageToDP(100),
            backgroundColor: '#eee',
            left: widthPercentageToDP(-4),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: heightPercentageToDP(2),
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Attributes
          </Text>
        </View>

        <FlatList
          data={Attribute}
          style={{flex: 1}}
          renderItem={renderItemExtra}
          extraData={extraChecked}

          // ItemSeparatorComponent={ItemSeparatorComponent}
        />
        <View
          style={{
            height: 1,
            marginVertical: heightPercentageToDP(1),
            width: widthPercentageToDP(100),
            backgroundColor: '#eee',
            left: widthPercentageToDP(-4),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: heightPercentageToDP(2),
          }}>
          <Text
            style={{
              fontSize: 24,
              color: Theme.colors.textColor,
              fontFamily: Theme.font.SemiBold,
            }}>
            Price
          </Text>
        </View>
        <FlatList
          data={price}
          style={{flex: 1}}
          renderItem={renderPrice}

          // ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  postInput: {
    fontSize: 15,
    width: widthPercentageToDP(90),
    height: 100,
    fontFamily: Theme.font.Regular,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
});
