import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text, SafeAreaView} from 'react-native';
import {Circle, randomizePosition} from './Circle'
import { useFonts } from 'expo-font';

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
    const [circleColor, setCircleColor] = useState(true);

    const [enableCoins, setEnableCoins] = useState(true);

    let [fontsLoaded] = useFonts({
        'Halo': require('../assets/fonts/Halo.ttf'),
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <View style={styles.scorecard}>
                <Text style={{fontFamily: 'Halo', fontSize: 30, color: 'blue'}}>Score  </Text>
                <Text style={{fontFamily: 'Halo', fontSize: 30}}>{score}</Text>
            </View>
            <View style={styles.game}>
                <View style={styles.left}>
                    <Circle
                        style={{size: 2 * circleRadius, color: circleColor, left: leftMargin, top: topMargin}}
                        vars={{
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
                        }}
                        funcs={{
                            setTopMargin: setTopMargin,
                            setLeftMargin: setLeftMargin,
                            setLeftOrRight: setLeftOrRight,
                            setCircleColor: setCircleColor,
                            setRedRatio: setRedRatio,
                            setCircleRadius: setCircleRadius,
                            setCircleTimeout: setCircleTimeout,
                            setScore: setScore,
                            setCount: setCount,
                            setScorePerClick: setScorePerClick,
                            setEnableCoins: setEnableCoins
                        }}/>
                </View>
                <View style={styles.right}>
                    <Circle
                        style={{size: 2 * circleRadius, color: circleColor, left: leftMargin, top: topMargin}}
                        vars={{
                            circleTimeout: circleTimeout,
                            circleRadius: circleRadius,
                            height: height,
                            width: width,
                            leftOrRight: !leftOrRight,
                            redRatio: redRatio,
                            score: score,
                            count: count,
                            scorePerClick,
                            navigation: navigation,
                            enableCoins: enableCoins
                        }}
                        funcs={{
                            setTopMargin: setTopMargin,
                            setLeftMargin: setLeftMargin,
                            setLeftOrRight: setLeftOrRight,
                            setCircleColor: setCircleColor,
                            setRedRatio: setRedRatio,
                            setCircleRadius: setCircleRadius,
                            setCircleTimeout: setCircleTimeout,
                            setScore: setScore,
                            setCount: setCount,
                            setScorePerClick: setScorePerClick,
                            setEnableCoins: setEnableCoins
                        }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
        flexDirection: 'column'
    },
    scorecard: {
        height: '5%',
        alignItems: 'center',
        flexDirection: 'row',
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
