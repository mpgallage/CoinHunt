import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions, Text} from 'react-native';
import {Circle, randomizePosition} from './Circle'
import {Alert, BackHandler} from "react-native-web";

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

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {text: "YES", onPress: () => BackHandler.exitApp()}
            ]);
            return true;
        };

        BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => BackHandler.removeEventListener(
            "hardwareBackPress",
            backAction
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true}/>
            <View style={styles.scorecard}>
                <Text>Score : {Number(score.toFixed(0))}</Text>
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
                            navigation: navigation
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
                            setScorePerClick: setScorePerClick
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
                            navigation: navigation
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
                            setScorePerClick: setScorePerClick
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
