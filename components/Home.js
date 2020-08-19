import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Game from "./Game";
import {_retrieveData, currentScoreKey, highScoreKey, newAppKey} from "./Utils";
import {SafeAreaView} from "react-navigation";

export default function Home({navigation}) {

    const [highScore, setHighScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [newApp, setNewApp] = useState('true');

    _retrieveData(highScoreKey).then(r => {
        setHighScore(r);
    })

    _retrieveData(currentScoreKey).then(r => {
        setCurrentScore(r);
    })

    _retrieveData(newAppKey).then(r => {
        setNewApp(r);
    })

    if (newApp === 'true') {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true}/>
                <Text>HighScore : {highScore}</Text>
                <Text onPress={() => navigation.replace('Game')} style={styles.text}>Play</Text>
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Text hidden>Game Over</Text>
                <Text>HighScore : {highScore}</Text>
                <Text>Score : {currentScore}</Text>
                <Text onPress={() => navigation.replace('Game')} style={styles.text}>Play Again</Text>
            </View>
        )
    }
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