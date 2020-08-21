import React from "react";
import {AsyncStorage, Platform} from 'react-native';

export let highScoreKey = 'highScoreKey';
export let currentScoreKey = 'currentScoreKey';
export let newAppKey = 'newAppKey';
export let missedCoinKey = 'missedCoinKey';
export let missedCoinMessage = 'You missed a gold coin!';
export let silverCoinMessage = 'You picked a silver coin!';


export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value.toString(), () => {});
    } catch (error) {
        console.log("Error saving data to AsyncStorage," + " error: " + error + " key : " + key + ", value : " + value)
    }
};

export const _retrieveData = async (key) => {
    try {
        return await AsyncStorage.getItem(key, () => {})
    } catch (error) {
        console.log("Error getting data from AsyncStorage, key : " + key)
    }
};

export const paths = {
    goldSound: require("./../assets/sounds/gold.mp3"),
    silverSound: require("./../assets/sounds/silver.mp3"),
    missedSound: require("./../assets/sounds/missed.mp3"),
    clickSound: require("./../assets/sounds/click.mp3")
}

export const clone = (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export const appSettings = {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
}