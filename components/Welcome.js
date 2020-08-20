import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {_storeData, newAppKey} from "./Utils";
import welcome from "../assets/icon/welcome.png";
import forward from "../assets/icon/forward.png";
import gold from "../assets/icon/gold.png";
import silver from "../assets/icon/silver.png";

export default function Welcome({navigation}) {

    _storeData(newAppKey, "true").then(s => {
    })

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <ImageBackground source={welcome} style={{width: 400, height: 260, flexDirection: 'column'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: 5}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Roboto', color: '#ffbf42'}}>WELCOME!</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: "row", top: 5}}>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto', color: '#fff'}}>
                            Collect all </Text>
                        <ImageBackground source={gold} style={{width: 25, height: 25}}/>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto', color: '#fff'}}> coins to score more.</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: "row", bottom: 5}}>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto', color: '#fff'}}>
                            Avoid occasional </Text>
                        <ImageBackground source={silver} style={{width: 25, height: 25}}/>
                        <Text
                            style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto', color: '#fff'}}> coins to stay in the game.</Text>
                    </View>
                </View>
                <View
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', bottom: 7}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{left: 40, fontSize: 30, fontWeight: 'bold', fontFamily: 'Roboto', color: '#84954c'}}>Let's Play</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.replace('Home')}>
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