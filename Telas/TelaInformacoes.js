import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TelaInformacoes({ route }) {
    const { movieData } = route.params;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews(movieData.id);
    }, [movieData.id]);

    const fetchReviews = async (movieId) => {
        try {
            const apiKey = 'b360ae01810b3ce7947ff782c2dab277';
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=pt-BR`
            );
            const data = await response.json();

            if (data.results) {
                setReviews(data.results);
            } else {
                console.error('Erro ao buscar avaliações:', data.status_message);
            }
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error.message);
        }
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return data.toLocaleDateString('pt-BR', options);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,}}style={styles.poster}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.nome}>{movieData.title}</Text>
                    <Text style={styles.data}>{formatarData(movieData.release_date)}</Text>
                    <Text style={styles.text}>{movieData.overview}</Text>
                </View>
                <View style={styles.avaliacoes}>
                    <Text style={styles.logoText}>Avaliações:</Text>
                    <ScrollView>
                        {reviews.map((review, index) => (
                            <View key={review.id} style={[styles.reviewContainer, index !== 0 && styles.reviewSpacing]}>
                                <Text style={styles.reviewAuthor}><FontAwesome name="user-circle" size={24} color="white"/>  {review.author}</Text>
                                <Text style={styles.reviewContent}>{review.content}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'black',
    },
    imageContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    poster: {
        width: 150,
        height: 220,
    },
    info: {
        flex: 1,
    },
    nome: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    data: {
        fontSize: 15,
        color: '#cccccc',
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        color: '#ffffff',
        marginBottom: 10,
    },
    avaliacoes: {
        marginTop: 20,
        color: 'white',
    },
    logoText: {
        fontSize: 15,
        color: '#cccccc',
        marginBottom: 10,
    },
    reviewContainer: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    reviewSpacing: {
        marginTop: 10,
    },
    reviewAuthor: {
        fontSize: 15,
        color: '#cccccc',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reviewContent: {
        fontSize: 14,
        color: '#ffffff',
    },
});
