import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import Game from "./Game";

export default function Home({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <Text onPress={() => navigation.navigate('Game')}>Start</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
        alignItems: 'center'
    }
})