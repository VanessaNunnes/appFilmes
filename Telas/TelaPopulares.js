import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const apiKey = 'b360ae01810b3ce7947ff782c2dab277';
const baseUrl = 'https://api.themoviedb.org/3';

export default function TelaPopulares({ navigation }) {
  const route = useRoute();
  const { email } = route.params;
  const [nomeUsuario] = email.split('@');
  const [filmesPopulares, setFilmesPopulares] = useState([]);

  const getFilmesPopulares = async () => {
    try {
      const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`);
      const data = await response.json();
      setFilmesPopulares(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  useEffect(() => {
    getFilmesPopulares();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>Olá, <Text style={styles.text2}>{nomeUsuario} </Text></Text>
      </View>
      <View style={styles.view1}>
        <Text style={styles.text3}>Buscar filmes</Text>
      </View>
      <View style={styles.viewBotao}>
        <Button color='blueviolet' title="Buscar Filme" onPress={() => navigation.navigate('Filmes')} />
      </View>
      <View style={styles.view2}>
        <Text style={styles.text4}>Filmes populares</Text>
        <FlatList
          data={filmesPopulares}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Informações', { movieData: item })}>
              <View style={styles.view3}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.image} />
                <Text style={styles.text5}> {truncateText(item.title, 20)}</Text>
              </View>
            </TouchableOpacity>
          )} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text1: {
    color: 'white',
    fontSize: 25,
    marginTop: 210
  },
  text2: {
    fontWeight: 'bold',
    color: "blueviolet"
  },
  view1: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  text3: {
    fontWeight: '400',
    fontSize: RFValue(25),
    color: 'white',
    marginTop: 30
  },
  viewBotao: {
    width: RFValue(113),
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20
  },
  view2: {
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  text4: {
    fontWeight: '400',
    fontSize: RFValue(25),
    color: 'white',
    marginBottom: 20,
    marginTop: 20
  },
  view3: {
    marginHorizontal: 10,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 225,
    resizeMode: 'cover',
    borderRadius: 5
  },
  text5: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5
  }
})