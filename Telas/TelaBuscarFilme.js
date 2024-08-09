import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';

export default function TelaBuscarFilme({ navigation }) {
  const [movies, setMovies] = useState('');
  const [image, setImage] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [animationVisible, setAnimationVisible] = useState(true);

  const searchMovies = async () => {
    try {
      if (movies !== '') {
        setAnimationVisible(true);

        const apiKey = '6762e2438cd42d02372f25e5701b7c4e';
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movies}&language=pt-BR`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setImage({ uri: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` });
          setMovieData(data.results[0]);
        } else {
          setImage(null);
          setMovieData(null);

          Alert.alert('Filme não encontrado', 'Nenhum resultado encontrado para o filme digitado.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setAnimationVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {animationVisible && (
        <View style={styles.viewAnimacao}>
          <LottieView autoPlay loop={true} source={require('../assets/Animation - 1702176472398.json')} />
        </View>
      )}

      <TextInput placeholder=" Digite o nome do filme " value={movies} onChangeText={(text) => setMovies(text)} style={styles.input} />
      <View style={styles.viewBotao}>
        <Button title="Buscar filmes" color="blueviolet" onPress={searchMovies} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Informações', { movieData: movieData })}>
        {image && movieData && (
          <View style={styles.viewFilmes}>
            <Image source={image} style={styles.image} />
            <Text style={styles.nomeFilme}>{movieData.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'black'
  },
  viewAnimacao: {
    width: 150,
    height: 150
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  viewBotao: {
    width: RFValue(113),
    borderRadius: 5,
    overflow: 'hidden'
  },
  viewFilmes: {
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    color: 'white'
  },
  image: {
    width: 150,
    height: 225,
    resizeMode: 'cover',
    borderRadius: 5
  },
  nomeFilme: {
    color: 'white',
    textAlign: 'center'
  }
})


