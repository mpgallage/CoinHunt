import React, {useState} from "react";
import {TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics'

let timer;

export const Circle = (props) => {
    const [visibility, setVisibility] = useState(true);
    if (!visibility || props.vars.leftOrRight) {
        return null
    }
    return (
        <TouchableOpacity style={circleStyle(props)} onPress={() => onPressHandler(props, setVisibility)}/>
    )
}

const circleStyle = (props) => {
    return {
        width: props.style.size,
        height: props.style.size,
        borderRadius: props.style.size / 2,
        backgroundColor: props.style.color ? 'green' : 'red',

        left: props.style.left,
        top: props.style.top
    }
}

const onPressHandler = (props, setVisibility) => {
    clearTimeout(timer)
    setVisibility(false)
    Haptics.selectionAsync().then(r => {
    }).catch()
    calculateScore(props)
    setTimeout(() => resetCircles(props, setVisibility), props.vars.circleTimeout)
}

const resetCircles = (props, setVisibility) => {
    const randoms = randomizePosition(props.vars.circleRadius, props.vars.redRatio, props.vars.height, props.vars.width)
    props.funcs.setTopMargin(randoms.topMargin)
    props.funcs.setLeftMargin(randoms.leftMargin)
    props.funcs.setLeftOrRight(randoms.leftOrRight)
    props.funcs.setCircleColor(randoms.circleColor)
    setVisibility(true)

    timer = setTimeout(() => resetCircles(props, setVisibility), props.vars.circleTimeout)
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
    console.log(props.vars.count)
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
        props.funcs.setScorePerClick(props.vars.scorePerClick * 1.1)
    }
    props.funcs.setScore(props.vars.score + props.vars.scorePerClick)
    props.funcs.setCount(props.vars.count + 1)
}

