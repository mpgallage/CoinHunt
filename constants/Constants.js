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
    AdMobAdUnits: {
        BannerAd: Platform.OS === 'android' ? 'ca-app-pub-2646007847466111/1038789979' : 'ca-app-pub-2646007847466111/5852132951',
        InterstitialAd: Platform.OS === 'android' ? 'ca-app-pub-2646007847466111/2064931188' : 'ca-app-pub-2646007847466111/3549403244',
        RewardAd: Platform.OS === 'android' ? 'ca-app-pub-2646007847466111/9831740566' : 'ca-app-pub-2646007847466111/5237889437'

        //Tests
/*        BannerAd: 'ca-app-pub-3940256099942544/6300978111',
        InterstitialAd: 'ca-app-pub-3940256099942544/8691691433',
        RewardAd: 'ca-app-pub-3940256099942544/5224354917'*/

    },
    HighScoreKey: 'highScoreKey',
    CurrentScoreKey: 'currentScoreKey',
    NewAppKey: 'newAppKey',
    MissedCoinKey: 'missedCoinKey',
    MissedCoinMessage: 'You missed a gold coin!',
    SilverCoinMessage: 'You picked a silver coin!'
}

