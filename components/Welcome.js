import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics'
import {_storeData, appSettings, newAppKey, paths} from "./Utils";
import welcome from "../assets/icon/welcome.png";
import forward from "../assets/icon/forward.png";
import gold from "../assets/icon/gold.png";
import silver from "../assets/icon/silver.png";
import {Audio} from "expo-av";

export default function Welcome({navigation}) {

    _storeData(newAppKey, "true").then(s => {
    })

    const clickSound = new Audio.Sound();
    try {
        clickSound.loadAsync(paths.clickSound).catch(e => console.log('error: ' + e));
    } catch (error) {
        console.log(error);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <ImageBackground source={welcome} style={{width: 400, height: 260, flexDirection: 'column'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: 5}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#ffbf42'}}>WELCOME!</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: "row", top: 5}}>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#fff'}}>
                            Collect all </Text>
                        <ImageBackground source={gold} style={{width: 25, height: 25}}/>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#fff'}}> coins to score more.</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: "row", bottom: 5}}>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#fff'}}>
                            Avoid </Text>
                        <ImageBackground source={silver} style={{width: 25, height: 25}}/>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#fff'}}> coins to stay in the game.</Text>
                    </View>
                </View>
                <View
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', bottom: 7}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{left: 40, fontSize: 30, fontWeight: 'bold', fontFamily: appSettings.fontFamily, color: '#699f4c'}}>Let's Play</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            Haptics.selectionAsync().catch()
                            clickSound.playAsync().catch(e => console.log('error: ' + e));
                            navigation.replace('Home')
                        }}>
                            <ImageBackground source={forward} style={{width: 80, height: 80,}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#207b9a',
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})