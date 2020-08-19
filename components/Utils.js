import React from "react";
import {AsyncStorage} from 'react-native';

export let highScoreKey = 'highScoreKey';
export let currentScoreKey = 'currentScoreKey';
export let newAppKey = 'newAppKey';


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