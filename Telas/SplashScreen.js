import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }){
    return (
        <View style={styles.container}>
            <LottieView autoPlay loop={false} source={require('../assets/Animation - 1700588839635.json')}
            onAnimationFinish = { ()=> navigation.navigate('Login')}></LottieView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black'
    }
})