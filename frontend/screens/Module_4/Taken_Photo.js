import { View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import { fonts, sh, sw } from '../../styles/GlobalStyles';
import { Url } from '../../url';

const Taken_Photo = ({ navigation, route }) => {
    const [isGoBackCamera, setIsGoBackCamera] = useState(false);
    const [processedData, setProcessedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { photoUri } = route.params;
    console.log('uri:', photoUri);

    const goBackCamera = () => {
        setIsGoBackCamera(true);
        navigation.navigate("Open_Camera");
    }

    const processReceipt = async () => {
        setIsLoading(true); 
        const formData = new FormData();
        formData.append('file', {
            uri: photoUri,
            type: 'image/jpeg',
            name: 'receipt.jpg',
        });

        try {
            const response = await fetch(`http://${Url}:8000/vhack_app/process_receipt`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to process receipt');
            }
            const data = await response.json();
            console.log('test:', data);
            setProcessedData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('processedData:', processedData);
        if (processedData) {
            const extracted = processedData.extracted_text;
            const isArray = Array.isArray(extracted);
            const extractedText = isArray ? extracted : [extracted];
            console.log('data:', extractedText);
            console.log('dateParts:', extractedText[0].date);
            let dateParts = extractedText[0].date.split('-');
            if (dateParts.length < 3) {
                dateParts = extractedText[0].date.split('/');
            }
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const year = parseInt(dateParts[2], 10);

            const date = new Date(year, month, day);

            const transactionDetails = {
                date: date,
                account: "Cash",
                category: "Food",
                description: extractedText[0].store_name,
                amount: extractedText[0].total,
            };
            console.log('transaction:', transactionDetails);
            setIsLoading(false);
            navigation.navigate("Expenses_Add_1", {
                transactionDetails: transactionDetails,
            });
        }
    }, [processedData]);

    const goToAddExpenses = async () => {
        console.log('function called');
        try {
            await processReceipt();
        } catch (error) {
            console.error('Error processing receipt:', error);
        }
    };

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
            {isLoading && (
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                   <ActivityIndicator size="large" color="#5F84A1"  style={{ transform: [{ scale: 3 }] }}  />
               </View>
            )}
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