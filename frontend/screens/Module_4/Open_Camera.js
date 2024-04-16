import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path, Defs, ClipPath, Circle } from "react-native-svg";
import { sh, sw, colors } from "../../styles/GlobalStyles";

export default function App({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [showPreview, setShowPreview] = useState(false);
    const cameraRef = useRef(null);
    // const [permission, requestPermission] = Camera.useCameraPermissions();
    const backToTransactionPage = () => {
        navigation.navigate("Expenses_Add_1");
    };

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate("Taken_Photo", { photoUri: photo.uri });
        }
        // const transactionDetails = {
        //     date: new Date(),
        //     account: "Personal",
        //     category: "Student Loan",
        //     description: "student loan for 3rd semester",
        //     amount: 20000,
        // };

        // navigation.navigate("Expenses_Add_1", {
        //     transactionDetails: transactionDetails,
        // });
    };

    const retakePhoto = () => {
        setShowPreview(false);
    };

    const handleDone = () => {
        setShowPreview(false);
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
    };
    // if (!permission) {
    //     // Camera permissions are still loading
    //     return <View />;
    // }

    // if (!permission.granted) {
    //     // Camera permissions are not granted yet
    //     return (
    //         <View style={styles.container}>
    //             <Text style={{ textAlign: "center" }}>
    //                 We need your permission to show the camera
    //             </Text>
    //             <Button onPress={requestPermission} title="Grant Permission" />
    //         </View>
    //     );
    // }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    useEffect(() => {
        //when mount, hide the tab bar
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });

        //when unmount, show the tab bar
        return () => {
            navigation
                .getParent()
                ?.setOptions({ tabBarStyle: { display: "flex" } });
        };
    }, []);

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={backToTransactionPage}
                    >
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                        >
                            <Path
                                stroke="#5F84A1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m15 6-6 6 6 6"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={23}
                            fill="none"
                        >
                            <G clipPath="url(#a)">
                                <Path
                                    fill="#5F84A1"
                                    fillRule="evenodd"
                                    d="M12.679.009h7.696l1.754 3.122h3.611c.192 0 .35.162.35.35v8.545c1.283.471 2.242 1.016 2.87 1.596.685.635 1.033 1.347 1.04 2.1.007.755-.33 1.471-1.015 2.112-1.168 1.094-3.522 2.062-7.074 2.66-.408.068-.787-.253-.846-.716-.06-.464.222-.894.63-.962 3.272-.552 5.374-1.38 6.344-2.289.318-.297.474-.564.473-.791-.003-.229-.168-.5-.493-.8-.43-.399-1.074-.781-1.93-1.131v1.86a.356.356 0 0 1-.348.348H4.762a.353.353 0 0 1-.349-.348v-2.076c-1.361.467-2.211.99-2.651 1.529-.245.3-.308.59-.229.854.115.384.458.791.966 1.19 1.728 1.355 5.019 2.322 8.115 2.102l-.67-.524a.735.735 0 1 1 .906-1.16l2.168 1.696a.736.736 0 0 1 .02 1.143l-2.413 2.157a.735.735 0 0 1-.98-1.095l.556-.498c-3.268.105-6.682-.964-8.548-2.428-.768-.603-1.31-1.295-1.533-2.04-.258-.863-.113-1.731.55-2.545.635-.778 1.832-1.512 3.743-2.123V3.48a.35.35 0 0 1 .35-.349h1.623v-1.12h2.007v1.12h2.18l1.36-2.685c.276-.546.125-.437.746-.437Zm11.15 4.665a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Zm-7.66 1.213a3.154 3.154 0 1 1 0 6.308 3.154 3.154 0 0 1 0-6.308Zm0-2.055a5.21 5.21 0 1 1-.001 10.42 5.21 5.21 0 0 1 .001-10.42Z"
                                    clipRule="evenodd"
                                />
                            </G>
                            <Defs>
                                <ClipPath id="a">
                                    <Path fill="#fff" d="M0 0h30v22.764H0z" />
                                </ClipPath>
                            </Defs>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        // borderColor: "white",
                        // borderWidth: 1,
                        marginTop: sh(580),
                        marginHorizontal: sw(100),
                        height: sh(100),
                        width: sh(100),
                        alignSelf: "center",
                    }}
                >
                    <TouchableOpacity
                        style={styles.shuttleButton}
                        onPress={takePhoto}
                    >
                        {/* <Text style={styles.text}>Shuttle</Text> */}
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="none"
                        >
                            <Circle cx={40} cy={40} r={40} fill="#5F84A1" />
                            <Circle
                                cx={40}
                                cy={40}
                                r={31.5}
                                fill="#5F84A1"
                                stroke="#fff"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderColor: "white",
        // borderWidth: 1,
        width: "100%",
        marginTop: sh(60),
    },
    button: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
    },
    shuttleButton: {
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
});