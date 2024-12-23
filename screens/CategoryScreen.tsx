import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import FavoriteButton from '../components/ButtonFavorite';
import { LinearGradient } from 'expo-linear-gradient';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { joke, isLoading, isFavorite, error, loadJoke, saveFavorite, reset } = useCategory(category);

  useFocusEffect(
    useCallback(() => {
      loadJoke();
      return () => {
        reset();
      };
    }, [category])
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading joke...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={loadJoke} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FFF', '#C9ff6acc']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {joke?.icon_url && <Image source={{ uri: joke.icon_url }} style={styles.image} />}
        <Text style={styles.title}>{joke?.value}</Text>
        <Text style={styles.description}>{`#joke #${category} #loliverse`}</Text>
        <FavoriteButton saveFavorite={saveFavorite} isFavorite={isFavorite} />
        <View style={styles.buttonContainer}> 
          <Button
            title='Back to Home'
            onPress={() => navigation.jumpTo('Home')}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4d4d',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
