import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {_storeData, newAppKey} from "./Utils";

export default function Welcome({navigation}) {

    _storeData(newAppKey, "true").then(s => {})

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <Text onPress={() => navigation.replace('Home')} style={styles.text}>Start</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})