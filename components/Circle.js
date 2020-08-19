import React, {useState} from "react";
import {TouchableOpacity, ImageBackground} from 'react-native';
import * as Haptics from 'expo-haptics'
import {_retrieveData, _storeData, currentScoreKey, highScoreKey, newAppKey} from "./Utils";
import goldCoin from '../assets/icon/gold.png'
import silverCoin from '../assets/icon/silver.png'

let timer;

export const Circle = (props) => {
    const [visibility, setVisibility] = useState(true);
    if (!visibility || props.vars.leftOrRight) {
        return null
    }
    return (
        <TouchableOpacity style={circleStyle(props)} onPress={() => onPressHandler(props, setVisibility)}>
            <ImageBackground
                source={coinSource(props)}
                style={coinStyle(props)}
            />
        </TouchableOpacity>
    )
}

const circleStyle = (props) => {
    return {
        width: props.style.size,
        height: props.style.size,
        borderRadius: props.style.size / 2,
        left: props.style.left,
        top: props.style.top
    }
}

const coinStyle = (props) => {
    return {
        width: props.style.size,
        height: props.style.size
    }
}

const coinSource = (props) => {
    return props.style.color ? goldCoin : silverCoin
}

const onPressHandler = (props, setVisibility) => {
    if (!props.vars.enableCoins) {
        return true
    }
    clearTimeout(timer)
    Haptics.selectionAsync().then(r => {
    }).catch()
    if (!props.style.color) {
        gameOver(props, false)
        return true
    }
    setVisibility(false)
    calculateScore(props)
    resetCircles(props, setVisibility)
}

const resetCircles = (props, setVisibility) => {
    const randoms = randomizePosition(props.vars.circleRadius, props.vars.redRatio, props.vars.height, props.vars.width)
    props.funcs.setTopMargin(randoms.topMargin)
    props.funcs.setLeftMargin(randoms.leftMargin)
    props.funcs.setLeftOrRight(randoms.leftOrRight)
    props.funcs.setCircleColor(randoms.circleColor)
    setVisibility(true)

    timer = setTimeout(() => {
            if (randoms.circleColor) {
                gameOver(props, true)
            } else {
                resetCircles(props, setVisibility)
            }
            return true
        },
        props.vars.circleTimeout)
}

export const randomizePosition = (circleRadius, redRatio, height, width) => {
    return {
        topMargin: Math.random() * (height * 0.95 - 2 * circleRadius),
        leftMargin: Math.random() * (width - 2 * circleRadius),
        leftOrRight: Math.random() >= 0.5,
        circleColor: Math.random() >= redRatio
    }
}

const calculateScore = (props) => {
    if (props.vars.count % 10 === 0) {
        // reset count
        props.funcs.setCount(0)

        // adjust timeout, circle size and red ratio
        props.funcs.setCircleTimeout(props.vars.circleTimeout * 0.9)
        props.funcs.setCircleRadius(props.vars.circleRadius * 0.9)

        // max red ratio is 0.3
        if (props.vars.redRatio < 0.3) {
            props.funcs.setRedRatio(props.vars.redRatio * 1.1)
        }

        // increase score per click
        props.funcs.setScorePerClick(props.vars.scorePerClick * 1.1 | 0)
    }
    props.funcs.setScore(props.vars.score + props.vars.scorePerClick)
    props.funcs.setCount(props.vars.count + 1)
}

const gameOver = (props, update) => {
    props.funcs.setEnableCoins(false)
    let currentScore = props.vars.score
    if (update) {
        currentScore += props.vars.scorePerClick
    }
    _retrieveData(highScoreKey).then(r => {
        if (currentScore > r) {
            _storeData(highScoreKey, currentScore).then(s => {})
        }
        _storeData(currentScoreKey, currentScore).then(s => {
            _storeData(newAppKey, "false").then(s => {})
            props.vars.navigation.replace('Home')
        })
    })
}
