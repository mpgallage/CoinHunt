import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text, SafeAreaView, ImageBackground, BackHandler} from 'react-native';
import {Circle, randomizePosition} from './Circle'
import frame from './../assets/icon/frame.png'
import {Audio} from "expo-av";
import {clone} from "./Utils";
import Constants from '../constants/Constants'

export default function Game({navigation}) {

    let height = Dimensions.get('window').height;
    let width = Dimensions.get('window').width / 2;

    const [score, setScore] = useState(0);
    const [count, setCount] = useState(1);
    const [scorePerClick, setScorePerClick] = useState(10);

    const [circleRadius, setCircleRadius] = useState(height / 8);
    const [circleTimeout, setCircleTimeout] = useState(1000);
    const [redRatio, setRedRatio] = useState(0.1);

    const randoms = randomizePosition(circleRadius, redRatio, height, width);
    const [topMargin, setTopMargin] = useState(randoms.topMargin);
    const [leftMargin, setLeftMargin] = useState(randoms.leftMargin);
    const [leftOrRight, setLeftOrRight] = useState(randoms.leftOrRight);
    const [isGreenCircle, setIsGreenCircle] = useState(true);

    const [enableCoins, setEnableCoins] = useState(true);

    const goldSound = new Audio.Sound();
    const silverSound = new Audio.Sound();
    const missedSound = new Audio.Sound();
    try {
        goldSound.loadAsync(Constants.Paths.goldSound).catch(e => console.log('error: ' + e));
        silverSound.loadAsync(Constants.Paths.silverSound).catch(e => console.log('error: ' + e));
        missedSound.loadAsync(Constants.Paths.missedSound).catch(e => console.log('error: ' + e));
    } catch (error) {
        console.log(error);
    }

    let vars = {
        circleTimeout: circleTimeout,
        circleRadius: circleRadius,
        height: height,
        width: width,
        leftOrRight: leftOrRight,
        redRatio: redRatio,
        score: score,
        count: count,
        scorePerClick,
        navigation: navigation,
        enableCoins: enableCoins
    }
    let funcs = {
        setTopMargin: setTopMargin,
        setLeftMargin: setLeftMargin,
        setLeftOrRight: setLeftOrRight,
        setIsGreenCircle: setIsGreenCircle,
        setRedRatio: setRedRatio,
        setCircleRadius: setCircleRadius,
        setCircleTimeout: setCircleTimeout,
        setScore: setScore,
        setCount: setCount,
        setScorePerClick: setScorePerClick,
        setEnableCoins: setEnableCoins
    }
    let sounds = {
        goldSound: goldSound,
        silverSound: silverSound,
        missedSound: missedSound
    }

    let oppositeVars = clone(vars);
    oppositeVars.leftOrRight = !vars.leftOrRight;

    // block back button during game
    useEffect(() => {
        const backAction = () => {
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <View style={styles.scorecard}>
                <ImageBackground source={frame} style={{width: 50, height: 20, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: Constants.AppSettings.fontFamily,
                            color: '#fff'
                        }}>{score}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.game}>
                <View style={styles.left}>
                    <Circle
                        style={{size: 2 * circleRadius, isGreenCircle: isGreenCircle, left: leftMargin, top: topMargin}}
                        vars={vars} funcs={funcs} sounds={sounds}/>
                </View>
                <View style={styles.right}>
                    <Circle
                        style={{size: 2 * circleRadius, isGreenCircle: isGreenCircle, left: leftMargin, top: topMargin}}
                        vars={oppositeVars} funcs={funcs} sounds={sounds}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#207b9a',
        flexDirection: 'column'
    },
    scorecard: {
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    game: {
        height: '95%',
        flexDirection: 'row'
    },
    left: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    right: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});
