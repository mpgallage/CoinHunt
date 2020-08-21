import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, ImageBackground, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics'
import Game from "./Game";
import Constants from '../constants/Constants'
import {_retrieveData} from "./Utils";
import scorecard from './../assets/icon/scorecard.png'
import newGame from './../assets/icon/new_game.png'
import play from './../assets/icon/play.png'
import replay from './../assets/icon/replay.png'
import frame from './../assets/icon/frame.png'
import {Audio} from "expo-av";

export default function Home({navigation}) {

    const [highScore, setHighScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [newApp, setNewApp] = useState('true');
    const [missedCoin, setMissedCoin] = useState('true');

    _retrieveData(Constants.HighScoreKey).then(r => {
        setHighScore(r);
    })

    _retrieveData(Constants.CurrentScoreKey).then(r => {
        setCurrentScore(r);
    })

    _retrieveData(Constants.NewAppKey).then(r => {
        setNewApp(r);
    })

    _retrieveData(Constants.MissedCoinKey).then(r => {
        setMissedCoin(r);
    })

    const clickSound = new Audio.Sound();
    try {
        clickSound.loadAsync(Constants.Paths.clickSound).catch(e => console.log('error: ' + e));
    } catch (error) {
        console.log(error);
    }

    let gameOverMessage = missedCoin === 'true' ? Constants.MissedCoinMessage : Constants.SilverCoinMessage

    if (newApp === 'true') {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true}/>
                <ImageBackground source={newGame} style={{
                    width: 420, height: 220, flexDirection: 'column'
                }}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{width: 220, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: 100, height: 100}} hidden/>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#ffbf42'
                            }}>{highScore ? highScore : 0}</Text>
                        </View>
                        <View style={{width: 180, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                Haptics.selectionAsync().catch()
                                clickSound.playAsync().catch(e => console.log('error: ' + e));
                                navigation.replace('Game')
                            }}>
                                <ImageBackground source={play} style={{width: 100, height: 100,}}/>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#699f4c'
                            }}>Play</Text>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <ImageBackground source={scorecard} style={{
                    width: 420, height: 300, flexDirection: 'column'
                }}>
                    <View style={{flex: 3}}/>
                    <View style={{flex: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            width: 210,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#ffbf42'
                            }}>Game Over</Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#fff'
                            }}>{gameOverMessage}</Text>
                        </View>
                        <View style={{width: 210, alignItems: 'center', justifyContent: 'center'}}>
                            <ImageBackground source={frame} style={{
                                width: 160,
                                height: 65,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 45,
                                    fontWeight: 'bold',
                                    fontFamily: Constants.AppSettings.fontFamily,
                                    color: '#fff',
                                    bottom: 3
                                }}>{currentScore}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{width: 220, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: 100, height: 100}} hidden/>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#ffbf42'
                            }}>{highScore ? highScore : 0}</Text>
                        </View>
                        <View style={{width: 180, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                Haptics.selectionAsync().catch()
                                clickSound.playAsync().catch(e => console.log('error: ' + e));
                                navigation.replace('Game')
                            }}>
                                <ImageBackground source={replay} style={{width: 100, height: 100}}/>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: Constants.AppSettings.fontFamily,
                                color: '#2899c0'
                            }}>Play Again</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#207b9a',
        alignItems: "center",
        justifyContent: "center"
    }
})