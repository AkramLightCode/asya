import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Components/responsive-ratio";
import { Theme } from "../Constant/Theme";
import ThemeButton from "../Components/ThemeButton";

const AddNewCard = ({ navigation, route }) => {
  const { Carttotal } = route.params;
  const { customer_address_id } = route.params;
  console.log("Carttotal", Carttotal, customer_address_id);
  const sumTotal = (Carttotal) =>
    Carttotal.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const [fName, setFname] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [monthyear, setMonthyear] = useState("");
  const validation = async (
    name,
    cardnumber,
    cvv,
    monthyear,
    Cartdata,
    customer_address_id
  ) => {
    if (name.length < 0) alert("add proper fullname");
    else if (cardnumber.length < 16)
      alert("add proper card number of 16 digit");
    else if (monthyear.length <= 3) alert("add month and year i.e 02/22");
    else if (cvv.length > 3) alert("add cvv");
    else {
      var val = parseInt((Math.random() * 9 + 1) * Math.pow(10, 9 - 2), 10);
      console.log(val);
      let order = [];
      let orderdetails = [];
      const paymentdata = {
        order_code: `OR-16${val}-${Cartdata[0].customer_id}`,
        amount_to_pay: sumTotal(Cartdata) + 5,
        amount_paid:
           sumTotal(Cartdata) + 5,
        payment_method: "creditcard",
        identifier: null,
        data: "[]",
      };

      let fdata = {
        code: `OR-16${val}-${Cartdata[0].customer_id}`,
        customer_id: Cartdata[0].customer_id,
        customer_address_id: customer_address_id,
        driver_id: 0,
        note: Cartdata[0].note,
        total_menu_price: sumTotal(Cartdata),
        total_delivery_charge: 0,
        total_vat_amount: 5,
        grand_total: sumTotal(Cartdata) + 5,
        order_status: "pending",
        order_placed_at: parseInt(Date.now() / 1000),
      };
      order.push(fdata);
      Cartdata.map(async (data) => {
        let ordert = {
          order_code: `OR-16${val}-${data.customer_id}`,
          menu_id: data.menu_id,
          servings: "menu",
          quantity: data.quantity,
          total: parseInt(data.price) * parseInt(data.quantity) + 5,
          restaurant_id: data.restaurant_id,
          note: data.note,
          variant_id: data.variant_id,
          addons: data.addons,
        };
        orderdetails.push(ordert);
      });

      console.log("final", paymentdata);
      if (paymentdata) {
        
        const orderres = await fetch(`http://13.233.230.232:8086/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentdata,
            name,
            cardnumber,
            cvv,
            monthyear,
          }),
        });
        const orderjson = await orderres.json();
        console.log("signup", orderjson);
        if (orderjson.status === true) {
          const response = await fetch(`http://13.233.230.232:8086/api/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order }),
          });
          const json = await response.json();
          console.log("signup", json);
          if (json.status === true) {
            const response1 = await fetch(
              `http://13.233.230.232:8086/api/orderdetails`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderdetails }),
              }
            );
            const json1 = await response1.json();
            console.log("order", json1);
            if (json1.status === true) {
              const response2 = await fetch(
                `http://13.233.230.232:8086/api/cart/remove/${order[0].customer_id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const json2 = await response2.json();
              console.log("cart", json2);
              if (json2.status === true) {
                navigation.navigate("Thankyou");
              }
            }
          }
        }
      }
    }
  };
  return (
    <>
      <View>
        <View style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "#818A93" }}>Card Number</Text>
            <Image
              source={require("../../assets/images/credit-card.png")}
              style={{ marginLeft: 215 }}
            />
          </View>
          <TextInput
            placeholder="xxxx-xxxx-xxxx-xxxx"
            label="Card"
            type="outlined"
            // placeholderTextColor="#969696"
            keyboardType="numeric"
            style={styles.input}
            // onFocus={getNumber}
            //   onChangeText={(text)=>value(text,'mobile')}
            value={cardnumber}
            onChangeText={(val) => setCardnumber(val)}
          />
        </View>

        <View style={{ marginLeft: 15, marginRight: 15, marginTop: 25 }}>
          <Text style={{ color: "#818A93" }}>Name on the Card</Text>

          <TextInput
            placeholder="enter your name"
            label="Card"
            type="outlined"
            // placeholderTextColor="#969696"
            style={styles.input}
            // onFocus={getNumber}
            //   onChangeText={(text)=>value(text,'mobile')}
            value={fName}
            onChangeText={(val) => setFname(val)}
          />
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{ marginLeft: 15, marginRight: 15, marginTop: 25, flex: 1 }}
          >
            <Text style={{ color: "#818A93" }}>Expiry</Text>

            <TextInput
              placeholder="DD/YY"
              label="Card"
              keyboardType="numeric"
              type="outlined"
              // placeholderTextColor="#969696"
              style={styles.input}
              // onFocus={getNumber}
              //   onChangeText={(text)=>value(text,'mobile')}
              value={monthyear}
              onChangeText={(val) => setMonthyear(val)}
            />
          </View>
          <View
            style={{ marginLeft: 15, marginRight: 15, marginTop: 25, flex: 1 }}
          >
            <Text style={{ color: "#818A93" }}>CVV</Text>

            <TextInput
              placeholder="***"
              label="Card"
              keyboardType="numeric"
              type="outlined"
              // placeholderTextColor="#969696"
              style={styles.input}
              // onFocus={getNumber}
              //   onChangeText={(text)=>value(text,'mobile')}
              value={cvv}
              onChangeText={(val) => setCvv(val)}
            />
          </View>
        </View>

        <ThemeButton
          title="Pay"
          buttonStyle={{
            height: heightPercentageToDP(6),
            backgroundColor: Theme.colors.brandColor,
            borderRadius: 10,
            marginTop: 100,
          }}
          titleStyle={{ fontFamily: Theme.font.Medium, fontSize: 14 }}
          containerStyle={{
            width: widthPercentageToDP(92),
          }}
          onPress={() =>
            validation(
              fName,
              cardnumber,
              cvv,
              monthyear,
              Carttotal,
              customer_address_id
            )
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    color: "green",
    marginTop: 250,
    fontSize: 25,
    fontWeight: "bold",
  },
  plus: {
    fontSize: 16,
    marginTop: 13,
    marginLeft: 100,
    color: "#14AE5B",
    borderBottomColor: "#14AE5B",
    borderBottomWidth: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#818A93",
  },
  button: {
    alignItems: "center",
    marginTop: 200,
    width: "50%",
    alignSelf: "center",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    color: "#14AE5B",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "500",
    color: "#14AE5B",
  },
});

export default AddNewCard;
