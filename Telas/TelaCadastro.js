import { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import LottieView from 'lottie-react-native';


export default function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repeatSenha, setRepeatSenha] = useState('');

    const handleSignUp = () => {
        if (senha == repeatSenha) {
            createUserWithEmailAndPassword(auth, email, senha)
                .then(() => {
                    navigation.navigate('Login');
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
        else {
            alert('As senhas devem ser iguais!')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <View style={styles.viewAnimacao}>
                    <LottieView autoPlay loop={true} source={require('../assets/Animation - 1701978045995.json')}></LottieView>
                </View>
                <Text style={styles.text}>CRIAR CONTA</Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder='  Nome' onChangeText={(nome) => setNome(nome)} value={nome}></TextInput>
                <TextInput style={styles.input} placeholder='  E-mail' onChangeText={(email) => setEmail(email)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder='  Senha' onChangeText={(senha) => setSenha(senha)} value={senha} secureTextEntry={true}></TextInput>
                <TextInput style={styles.input} placeholder='  Confirmar Senha' onChangeText={(repeatSenha) => setRepeatSenha(repeatSenha)} value={repeatSenha} secureTextEntry={true}></TextInput>
            </View>
            <View style={styles.view2}>
                <View style={styles.viewBotao}>
                    <Button color='blueviolet' title='Confirmar' onPress={handleSignUp} />
                </View>
            </View>
            <View style={styles.view2}>
                <View style={styles.viewBotao}>
                    <Button color='blueviolet' title='Voltar' onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    view1: {
        flex: 0.6, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    viewAnimacao: {
        width: RFValue(200), 
        height: RFValue(200)
    },
    text: {
        fontWeight: '700', 
        fontSize: RFValue(35), 
        color: 'white', 
        marginBottom: 20
    },
    input: {
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: 'darkgrey', 
        height: RFValue(40), 
        width: RFValue(280), 
        marginBottom: 15, 
        backgroundColor: 'white'
    },
    view2: {
        alignItems: 'center', 
        marginTop: 10 
    },
    viewBotao: {
        width: RFValue(110), 
        borderRadius: 5, 
        overflow: 'hidden'
    }
})