import {Platform} from "react-native";

export default {
    AppSettings: {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
    },
    Paths: {
        goldSound: require("./../assets/sounds/gold.mp3"),
        silverSound: require("./../assets/sounds/silver.mp3"),
        missedSound: require("./../assets/sounds/missed.mp3"),
        clickSound: require("./../assets/sounds/click.mp3")
    },
    FirebaseConfig: {
        apiKey: "AIzaSyD3wYYtYyEwMLZXIixUVn6DJUWJhCOrwgs",
        authDomain: "malaka-coinhunt.firebaseapp.com",
        databaseURL: "https://malaka-coinhunt.firebaseio.com",
        projectId: "malaka-coinhunt",
        storageBucket: "malaka-coinhunt.appspot.com",
        messagingSenderId: "1006570618192",
        appId: "1:1006570618192:web:ad9b3a5f83afda288e8055",
        measurementId: "G-3X7DZF4411"
    },
    HighScoreKey: 'highScoreKey',
    CurrentScoreKey: 'currentScoreKey',
    NewAppKey: 'newAppKey',
    MissedCoinKey: 'missedCoinKey',
    MissedCoinMessage: 'You missed a gold coin!',
    SilverCoinMessage: 'You picked a silver coin!'
}

