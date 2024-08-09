import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, BackHandler, StyleSheet } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';
import LottieView from 'lottie-react-native';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setSenha('');
        navigation.navigate('Auth', {
          screen: 'Populares',
          params: { email: email }
        });

      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const esqueceuSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email enviado!", "Um email para redefinir a sua senha foi enviado para o endereço de email fornecido")
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const registreAgora = () => {
    setEmail('');
    setSenha('');
    navigation.navigate('Cadastro')
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.viewAnimacao}>
          <LottieView autoPlay loop={true} source={require('../assets/Animation - 1701979573012.json')}></LottieView>
        </View>
        <Text style={styles.text}> LOGIN </Text>
      </View>
      <View>
        <TextInput style={styles.input} placeholder='  E-mail' onChangeText={(email) => setEmail(email)} value={email} />
        <TextInput style={styles.input2} placeholder='  Senha' onChangeText={(senha) => setSenha(senha)} value={senha} secureTextEntry={true} />
        <View style={styles.view2}>
          <Pressable onPress={esqueceuSenha}>
            <Text style={styles.text1}>Esqueceu a senha?</Text>
          </Pressable>
        </View>
        <View style={styles.view3}>
          <View style={styles.viewBotao}>
            <Button color='blueviolet' title='Login' onPress={handleLogin} />
          </View>
          <View style={styles.view4}>
            <Text style={styles.text2}>Não possui conta? </Text>
            <Pressable onPress={registreAgora}>
              <Text style={styles.text3}>Registre-se agora</Text>
            </Pressable>
          </View>
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
    alignItems: 'center'
  },
  viewAnimacao: {
    width: RFValue(150),
    height: RFValue(150)
  },
  text: {
    fontWeight: '700',
    fontSize: RFValue(50),
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
  input2: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'darkgrey',
    height: RFValue(40),
    width: RFValue(280),
    backgroundColor: 'white'
  },
  view2: {
    alignItems: 'flex-end'
  },
  text1: {
    color: 'blueviolet',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: 15
  },
  view3: {
    alignItems: 'center',
    marginTop: '2%'
  },
  viewBotao: {
    width: RFValue(75),
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  view4: {
    flexDirection: 'row'
  },
  text2: {
    color: 'white',
    fontSize: RFValue(14)
  },
  text3: {
    color: 'blueviolet',
    fontSize: RFValue(14),
    fontWeight: 'bold'
  }
})
