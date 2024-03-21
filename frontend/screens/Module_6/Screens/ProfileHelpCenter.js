import React, { useContext, Component, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AppBar from '../../Module_3/Utils/AppBar';
import { SearchBar } from 'react-native-elements';
import RenderHelpCenterScrollView from '../Utils/RenderHelpCenterScrollView';
import { carouselItems, topQuestions } from '../MockData/ProfileHelpCenterScrollViewMockData';
import CollapsibleView from '../Utils/RenderHelpCenterSpringTextBox';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    searchBarContainer:{
        flex: 1,
        marginHorizontal: sw(20),
    },
    totalQuestionsAndSeeAll: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: sw(10),
        marginVertical: sh(10),
    },
    seeAll: {
        borderColor: '#E1E3E8',
        borderRadius: sw(10),
        backgroundColor: 'transparent',
        padding: sw(10),
    },
});

function ProfileHelpCenter({navigation}) {
    const ProfileMainPage = () => {
        navigation.navigate('ProfileMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    const [searchQuery, setSearchQuery] = React.useState('');
    const [collapsedSettings, setCollapsedSettings] = useState(true);

    const handleSeeAll = () => {
        setCollapsedSettings(!collapsedSettings)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar title='Help Center' navigation={PreviousPage}/>
                <View style={styles.searchBarContainer}>
                    <SearchBar 
                        placeholder='Search' 
                        onChangeText={setSearchQuery}
                        value={searchQuery} 
                        containerStyle={{backgroundColor: '#FFF', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                        inputContainerStyle={{backgroundColor: '#F6F7FA', color: '#9D9FA0'}}
                        inputStyle={{color: 'black'}}
                    />
                </View>
                <View style={{flex:1}}>
                    <RenderHelpCenterScrollView carouselItems={carouselItems}/>
                </View>
                <View style={styles.totalQuestionsAndSeeAll}>
                    <Text style={{ fontSize: sw(16), fontFamily: fonts.interSemiBold, padding: sw(10) }}>Top Questions</Text>
                    <TouchableOpacity
                        style={styles.seeAll}
                        onPress={handleSeeAll}
                    >
                        <Text style={{ fontSize: sw(14), fontFamily: fonts.interRegular, color:'#334B5E' }}>See All</Text>
                    </TouchableOpacity>
                </View>
                {topQuestions.map(({ question, answer }) => (
                    <CollapsibleView
                        question={question}
                        answer={answer}
                        defaultValue={collapsedSettings}
                        key={question}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileHelpCenter;
