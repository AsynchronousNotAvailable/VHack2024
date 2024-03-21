import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { fonts, sh, sw } from '../../styles/GlobalStyles';

const Taken_Photo = ({ navigation, route }) => {
    const [isGoBackCamera, setIsGoBackCamera] = useState(false);
    console.log(route.params);
    const { photoUri } = route.params;
    console.log('uri:', photoUri);
    const goBackCamera = () => {
        setIsGoBackCamera(true);
        navigation.navigate("Open_Camera");
    }

    const goToAddExpenses = () => {
        const transactionDetails = {
            date: new Date(),
            account: "Personal",
            category: "Student Loan",
            description: "student loan for 3rd semester",
            amount: 20000,
            // Add photo details here if needed
        };

        navigation.navigate("Expenses_Add_1", {
            transactionDetails: transactionDetails,
        });
    }

    useEffect(() => {
        //when mount, hide the tab bar
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });

        //when unmount, show the tab bar
        return () => {

            if (isGoBackCamera == false) {
                navigation
                    .getParent()
                    ?.setOptions({ tabBarStyle: { display: "flex" } });
            }
            
        };
    }, []);
  return (
      <View
          style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
          }}
      >
          <Image source={{ uri: photoUri }} style={{ width: "100%", height: "100%" }} />

          <View
              style={{
                  position: 'absolute',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 100,
                  bottom: "15%",
                  
              }}
          >
              <TouchableOpacity onPress={goBackCamera}>
                  <View
                      style={{
                          paddingHorizontal: sw(30),
                          paddingVertical: sh(25),
                          backgroundColor: "#5F84A1",
                          borderRadius: 30,
                          alignItems: "center",
                          justifyContent: "center",
                      }}
                  >
                      <Text
                          style={{
                              fontFamily: fonts.interMedium,
                              fontSize: 16,
                              color: "white",
                          }}
                      >
                          Cancel
                      </Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToAddExpenses}>
                  <View
                      style={{
                          paddingHorizontal: sw(30),
                          paddingVertical: sh(25),
                          backgroundColor: "#5F84A1",
                          borderRadius: 30,
                          alignItems: "center",
                          justifyContent: "center",
                      }}
                  >
                      <Text
                          style={{
                              fontFamily: fonts.interMedium,
                              fontSize: 16,
                              color: "white",
                          }}
                      >
                          Confirm
                      </Text>
                  </View>
              </TouchableOpacity>
          </View>
      </View>
  );
}

export default Taken_Photo